package game

// Controller es lo que comparten los controladores del profesor
// (MediumAIController, UnbeatableAIController y la versión MiniMax).
// Cada modo debe implementarla.
type Controller interface {
	// InitializeData = InitializeGameData() del original.
	InitializeData()
	InitializeControls(b *Board)
	// PlayUser marca la jugada del usuario; devuelve true si se jugó.
	PlayUser(b *Board, index int) bool
	// PlayNPC hace la jugada del jugador controlado por la computadora (JCC).
	PlayNPC(b *Board)
	// Flag devuelve a quién le toca: "X" u "O".
	Flag() string
	// Weights devuelve mArrayMoves (pesos 0/1/3) para el inspector del frontend.
	// Si el modo no usa pesos (MiniMax), devolver el tablero como 0/1/3.
	Weights() [9]int
}

// Player = enum Player de los controladores del profesor.
type Player int

const (
	PlayerNone Player = 0 // casilla vacía
	PlayerUser Player = 1 // usuario (X)
	PlayerNPC  Player = 2 // JCC (O)
)

// GameState = enum GameState de los controladores del profesor.
type GameState int

const (
	GameOver GameState = 0
	Active   GameState = 1
)

// Constantes de los controladores del profesor (CENTER_INDEX, CORNER_INDICES, SIDE_INDICES).
const CenterIndex = 4

var (
	CornerIndices = [4]int{0, 2, 6, 8}
	SideIndices   = [4]int{1, 3, 5, 7}

	// WinningLines: filas, columnas y diagonales, en el orden del original.
	WinningLines = [8][3]int{
		{0, 1, 2}, {3, 4, 5}, {6, 7, 8},
		{0, 3, 6}, {1, 4, 7}, {2, 5, 8},
		{0, 4, 8}, {2, 4, 6},
	}
)

// FlagForPlayer convierte Player en "X" u "O" (FlagForPlayer del original).
func FlagForPlayer(p Player) string {
	if p == PlayerUser {
		return "X"
	}
	return "O"
}

// Niveles del Proyecto 3 (un modo por variante del enunciado).
const (
	LevelMediumAI     = 1 // MediumAIController            (Tic-Tac-Toe-Versión-IA-Debil)
	LevelUnbeatableAI = 2 // UnbeatableAIController        (Tic-Tac-Toe-Versión-IA-Fuerte)
	LevelMinimax      = 3 // UnbeatableAIController MiniMax (Tic-Tac-Toe-Version-MiniMax)
)

// Mode describe un modo para el selector del frontend.
type Mode struct {
	Level       int    `json:"level"`
	Key         string `json:"key"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Original    string `json:"original"`    // clase del profesor que se porta
	Implemented bool   `json:"implemented"` // false = apartado pendiente para un compañero
	Owner       string `json:"owner"`       // responsable
}

// Modes es el catálogo. Cuando un compañero termine su modo, cambia
// Implemented a true.
var Modes = []Mode{
	{LevelMediumAI, "medium-ai", "MediumAI", "IA intermedia: gana y bloquea con el método numérico, si no, juega al azar.", "MediumAIController", true, "Paul Moreno"},
	{LevelUnbeatableAI, "unbeatable-ai", "UnbeatableAI", "Método numérico heurístico (pesos 1/3/0). Casos 1, 2 y 3.", "UnbeatableAIController", true, "Grupo 3"},
	{LevelMinimax, "unbeatable-minmax", "UnbeatableAI · MinMax", "IA imbatible con el algoritmo Minimax.", "UnbeatableAIController (MiniMax)", true, "Diana Guerra"},
}

// FindMode busca un modo por nivel.
func FindMode(level int) (Mode, bool) {
	for _, m := range Modes {
		if m.Level == level {
			return m, true
		}
	}
	return Mode{}, false
}
