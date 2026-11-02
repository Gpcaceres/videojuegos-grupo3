package game

// ControlMinMaxMoves — APARTADO PENDIENTE (compañero). UnbeatableAI -> MinMax.
//
// Mismo flujo que los demás controladores (usuario = "X" con peso 1,
// JCC = "0" con peso 3), pero la jugada de la JCC se elige con Minimax:
//
//	minimax(tablero, esTurnoJCC):
//	    si gana JCC -> +10 ; si gana usuario -> -10 ; si empate -> 0
//	    JCC maximiza, usuario minimiza, probando cada casillero libre.
//
// Reutiliza showUserMove/showNPCMove/CheckWinnerBoard igual que strong.go.
// Al terminar, en controller.go pon Implemented=true para LevelUnbeatableMinMax.
type ControlMinMaxMoves struct {
	Flag        string
	MoveNumber  int
	GameControl int
	ArrayMoves  [9]int
}

func NewControlMinMaxMoves() *ControlMinMaxMoves {
	c := &ControlMinMaxMoves{}
	c.InitializeData()
	return c
}

func (c *ControlMinMaxMoves) InitializeData() {
	c.ArrayMoves = [9]int{}
	c.Flag = "X"
	c.MoveNumber = 0
	c.GameControl = 0
}

func (c *ControlMinMaxMoves) InitializeControls(b *Board) {
	b.ClearTexts()
	b.Enabled = true
}

// PlayUser — TODO(compañero).
func (c *ControlMinMaxMoves) PlayUser(b *Board, index int) bool {
	return false
}

// PlayNPC — TODO(compañero): elegir la jugada con minimax.
func (c *ControlMinMaxMoves) PlayNPC(b *Board) {}
