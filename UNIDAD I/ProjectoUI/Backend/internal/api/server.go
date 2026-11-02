package api

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/Gpcaceres/videojuegos-grupo3/backend/internal/game"
)

// Las partidas viven en memoria; se borran tras SessionTTL sin actividad.
const SessionTTL = 2 * time.Hour

type session struct {
	mu       sync.Mutex
	form     *game.Form
	lastSeen time.Time
}

type Server struct {
	mu       sync.Mutex
	sessions map[string]*session
	allowed  map[string]bool // orígenes CORS permitidos
}

func NewServer(allowedOrigins []string) *Server {
	s := &Server{sessions: map[string]*session{}, allowed: map[string]bool{}}
	for _, o := range allowedOrigins {
		s.allowed[o] = true
	}
	go s.janitor()
	return s
}

func (s *Server) Routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/health", s.health)
	mux.HandleFunc("GET /api/modes", s.modes)
	mux.HandleFunc("POST /api/games", s.createGame)
	mux.HandleFunc("GET /api/games/{id}", s.getGame)
	mux.HandleFunc("POST /api/games/{id}/moves", s.move)
	mux.HandleFunc("POST /api/games/{id}/new", s.newGame)
	mux.HandleFunc("PUT /api/games/{id}/level", s.setLevel)
	return s.cors(logRequests(mux))
}

// ---------- DTOs ----------

type GameState struct {
	ID         string       `json:"id"`
	Level      int          `json:"level"`
	Mode       game.Mode    `json:"mode"`
	Board      [9]string    `json:"board"`      // textos de los 9 botones
	Enabled    bool         `json:"enabled"`    // grbTicTacToe.Enabled
	ArrayMoves [9]int       `json:"arrayMoves"` // mArrayMoves (pesos 0/1/3), útil para explicar la IA
	MoveNumber int          `json:"moveNumber"`
	Flag       string       `json:"flag"`   // a quién le toca: "X" o "0"
	Events     []game.Event `json:"events"` // lo que pasó en esta petición, en orden
}

func stateOf(id string, f *game.Form) GameState {
	mode, _ := game.FindMode(f.Global.GameLevel)
	st := GameState{
		ID:      id,
		Level:   f.Global.GameLevel,
		Mode:    mode,
		Board:   f.Board.Buttons,
		Enabled: f.Board.Enabled,
		Events:  f.Board.TakeEvents(),
	}
	if f.Global.GameLevel == game.LevelUnbeatableAI {
		st.ArrayMoves = f.Strong.ArrayMoves
		st.MoveNumber = f.Strong.MoveNumber
		st.Flag = f.Strong.Flag
	}
	// TODO(compañeros): exponer ArrayMoves/MoveNumber/Flag de su controlador.
	return st
}

type levelReq struct {
	Level int `json:"level"`
}

type moveReq struct {
	Index int `json:"index"`
}

// ---------- handlers ----------

func (s *Server) health(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) modes(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, game.Modes)
}

func (s *Server) createGame(w http.ResponseWriter, r *http.Request) {
	var req levelReq
	req.Level = game.LevelUnbeatableAI
	if r.ContentLength > 0 {
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeErr(w, http.StatusBadRequest, "JSON inválido")
			return
		}
	}
	f, err := game.NewForm(req.Level)
	if err != nil {
		writeGameErr(w, err)
		return
	}
	id := newID()
	s.mu.Lock()
	s.sessions[id] = &session{form: f, lastSeen: time.Now()}
	s.mu.Unlock()
	writeJSON(w, http.StatusCreated, stateOf(id, f))
}

func (s *Server) getGame(w http.ResponseWriter, r *http.Request) {
	s.withSession(w, r, func(id string, f *game.Form) (int, error) {
		return http.StatusOK, nil
	})
}

func (s *Server) move(w http.ResponseWriter, r *http.Request) {
	var req moveReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "JSON inválido")
		return
	}
	s.withSession(w, r, func(id string, f *game.Form) (int, error) {
		return http.StatusOK, f.Click(req.Index)
	})
}

func (s *Server) newGame(w http.ResponseWriter, r *http.Request) {
	s.withSession(w, r, func(id string, f *game.Form) (int, error) {
		f.InitializeGame()
		return http.StatusOK, nil
	})
}

func (s *Server) setLevel(w http.ResponseWriter, r *http.Request) {
	var req levelReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeErr(w, http.StatusBadRequest, "JSON inválido")
		return
	}
	s.withSession(w, r, func(id string, f *game.Form) (int, error) {
		return http.StatusOK, f.SetLevel(req.Level)
	})
}

func (s *Server) withSession(w http.ResponseWriter, r *http.Request, fn func(string, *game.Form) (int, error)) {
	id := r.PathValue("id")
	s.mu.Lock()
	sess, ok := s.sessions[id]
	s.mu.Unlock()
	if !ok {
		writeErr(w, http.StatusNotFound, "partida no encontrada")
		return
	}
	sess.mu.Lock()
	defer sess.mu.Unlock()
	sess.lastSeen = time.Now()
	code, err := fn(id, sess.form)
	if err != nil {
		writeGameErr(w, err)
		return
	}
	writeJSON(w, code, stateOf(id, sess.form))
}

// ---------- utilidades ----------

func (s *Server) janitor() {
	for range time.Tick(10 * time.Minute) {
		cutoff := time.Now().Add(-SessionTTL)
		s.mu.Lock()
		for id, sess := range s.sessions {
			if sess.lastSeen.Before(cutoff) {
				delete(s.sessions, id)
			}
		}
		s.mu.Unlock()
	}
}

func (s *Server) cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if o := r.Header.Get("Origin"); o != "" && (s.allowed["*"] || s.allowed[o]) {
			w.Header().Set("Access-Control-Allow-Origin", o)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		}
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s (%s)", r.Method, r.URL.Path, time.Since(start))
	})
}

func writeGameErr(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, game.ErrNotImplemented):
		writeErr(w, http.StatusNotImplemented, err.Error())
	case errors.Is(err, game.ErrDisabled):
		writeErr(w, http.StatusConflict, err.Error())
	default:
		writeErr(w, http.StatusBadRequest, err.Error())
	}
}

func writeErr(w http.ResponseWriter, code int, msg string) {
	writeJSON(w, code, map[string]string{"error": msg})
}

func writeJSON(w http.ResponseWriter, code int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(v)
}

func newID() string {
	b := make([]byte, 12)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}
