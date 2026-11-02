package game

// Controller es lo que comparten los controladores con IA del proyecto
// original (ControlRandomMoves, ControlWeakIntelligentMoves,
// ControlStrongIntelligentMoves). Cada modo nuevo debe implementarla.
type Controller interface {
	InitializeData()
	InitializeControls(b *Board)
	// PlayUser marca la jugada del usuario; devuelve true si el casillero estaba libre.
	PlayUser(b *Board, index int) bool
	// PlayNPC hace la jugada del jugador controlado por la computadora (JCC).
	PlayNPC(b *Board)
}

// Niveles = GlobalClassGame.GameLevel del original (+ el nivel MinMax del Proyecto 3).
const (
	LevelTwoUsers         = 0 // rdbTwoGamers  -> ControlTwoUsers
	LevelRandom           = 1 // rdbBeginner   -> ControlRandomMoves
	LevelMediumAI         = 2 // rdbHard       -> ControlWeakIntelligentMoves  (MediumAI)
	LevelUnbeatableAI     = 3 // rdbExpert     -> ControlStrongIntelligentMoves (UnbeatableAI)
	LevelUnbeatableMinMax = 4 // nuevo         -> ControlMinMaxMoves (UnbeatableAI -> MinMax)
)

// Mode describe un modo para el selector del frontend.
type Mode struct {
	Level       int    `json:"level"`
	Key         string `json:"key"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Original    string `json:"original"`    // clase del proyecto C#/Java de referencia
	Implemented bool   `json:"implemented"` // false = apartado pendiente para un compañero
	Owner       string `json:"owner"`       // responsable (editar)
}

// Modes es el catálogo. Cuando un compañero termine su modo, cambia
// Implemented a true (y su nombre en Owner).
var Modes = []Mode{
	{LevelTwoUsers, "two-users", "Dos jugadores", "Humano contra humano en el mismo equipo.", "ControlTwoUsers", false, "Pendiente"},
	{LevelRandom, "random", "Principiante", "La computadora juega al azar.", "ControlRandomMoves", false, "Pendiente"},
	{LevelMediumAI, "medium-ai", "MediumAI", "IA intermedia: bloquea, pero se le puede ganar.", "ControlWeakIntelligentMoves", false, "Paul Moreno"},
	{LevelUnbeatableAI, "unbeatable-ai", "UnbeatableAI", "Método numérico heurístico (pesos 1/3/0). Caso 1, 2 y 3.", "ControlStrongIntelligentMoves", true, "Germán Cáceres"},
	{LevelUnbeatableMinMax, "unbeatable-minmax", "UnbeatableAI · MinMax", "IA imbatible con el algoritmo Minimax.", "— (nuevo)", false, "Diana Guerra"},
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
