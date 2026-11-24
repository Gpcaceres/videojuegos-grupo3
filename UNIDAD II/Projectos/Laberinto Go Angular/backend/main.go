package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
)

type game struct {
	Mode    string
	NPC     NonPlayerCharacter
	Walker  Walker
	Running bool
}
type request struct {
	Session string
	Action  string
	Mode    string
	Key     string
}

var games = map[string]*game{}
var mutex sync.Mutex

func main() {
	http.HandleFunc("/api/game", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Method != "POST" {
			http.Error(w, "Usa POST", 405)
			return
		}
		var q request
		if json.NewDecoder(http.MaxBytesReader(w, r.Body, 4096)).Decode(&q) != nil {
			http.Error(w, "JSON invalido", 400)
			return
		}
		if q.Session == "" || len(q.Session) > 100 {
			http.Error(w, "Sesion invalida", 400)
			return
		}
		switch q.Action {
		case "load", "solve", "tick", "key", "speech", "exit":
		default:
			http.Error(w, "Accion invalida", 400)
			return
		}
		if q.Action == "load" && q.Mode != "manual" && q.Mode != "left" && q.Mode != "right" {
			http.Error(w, "Modo invalido", 400)
			return
		}
		mutex.Lock()
		defer mutex.Unlock()
		g := games[q.Session]
		if q.Action == "exit" {
			delete(games, q.Session)
			json.NewEncoder(w).Encode(map[string]bool{"closed": true})
			return
		}
		if q.Action == "load" {
			g = &game{Mode: q.Mode}
			games[q.Session] = g
			if q.Mode == "manual" {
				g.Walker.CreateMatrix(19, 19)
				g.Walker.InitializeMatrix(matrix)
				g.Walker.InitializeRoad()
				g.Walker.LocalizeStart()
				g.Walker.InitializeGrammar()
				g.Walker.X = 50
				g.Walker.Y = 25
			} else {
				g.NPC.CreateMatrix(19, 19)
				g.NPC.InitializeMatrix(matrix)
				g.NPC.InitializeRoad()
				g.NPC.Miliseconds = 100
				g.NPC.Direction = Up
				g.NPC.X = 50
				g.NPC.Y = 25
			}
		}
		if g == nil {
			http.Error(w, "Carga un modo primero", 409)
			return
		}
		if g.Mode == "manual" {
			if q.Action == "key" {
				g.Walker.ControlMovesInLaberynth(q.Key)
			}
			if q.Action == "speech" {
				g.Walker.ControlSpeechMoves(q.Key)
			}
			data, _ := json.Marshal(g.Walker)
			var out map[string]interface{}
			json.Unmarshal(data, &out)
			out["mode"] = g.Mode
			out["running"] = false
			json.NewEncoder(w).Encode(out)
			return
		}
		p := &g.NPC
		if q.Action == "solve" {
			g.Running = false
			p.InitializeRoad()
			p.LocalizeStart()
			p.X = 50
			p.Y = 25
			p.Message = ""
			p.DetermineStartDirection()
			if g.Mode == "left" {
				p.RapidMovementWithLeftHandAI()
			} else {
				p.RapidMovementWithRightHandAI()
			}
			p.DirectionText = ""
			g.Running = true
		}
		if q.Action == "tick" && g.Running {
			if g.Mode == "left" {
				p.RapidMovementWithLeftHandAI()
			} else {
				p.RapidMovementWithRightHandAI()
			}
			if p.DetermineFinishDirection() {
				g.Running = false
				p.Message = "Has llegado al final"
			}
		}
		data, _ := json.Marshal(p)
		var out map[string]interface{}
		json.Unmarshal(data, &out)
		out["mode"] = g.Mode
		out["running"] = g.Running
		json.NewEncoder(w).Encode(out)
	})
	log.Println("Laberinto Go: http://localhost:8080")
	log.Fatal(http.ListenAndServe("127.0.0.1:8080", nil))
}
