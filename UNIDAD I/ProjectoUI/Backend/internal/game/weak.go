package game

// ControlWeakIntelligentMoves — APARTADO PENDIENTE (Paul Moreno). MediumAI.
//
// Portar 1:1 TicTacToeGameLibrary/ControlWeakIntelligentMoves.cs. No cambiar
// la lógica. Usa como guía strong.go (mismo estilo: helper pick(a,b,d) para
// los if/else de "primer casillero vacío de la línea").
// Al terminar, en controller.go pon Implemented=true para LevelMediumAI.
type ControlWeakIntelligentMoves struct {
	Flag        string
	MoveNumber  int
	GameControl int
	ArrayMoves  [9]int
}

func NewControlWeakIntelligentMoves() *ControlWeakIntelligentMoves {
	c := &ControlWeakIntelligentMoves{}
	c.InitializeData()
	return c
}

func (c *ControlWeakIntelligentMoves) InitializeData() {
	c.ArrayMoves = [9]int{}
	c.Flag = "X"
	c.MoveNumber = 0
	c.GameControl = 0
}

func (c *ControlWeakIntelligentMoves) InitializeControls(b *Board) {
	b.ClearTexts()
	b.Enabled = true
}

// PlayUser — TODO(compañero).
func (c *ControlWeakIntelligentMoves) PlayUser(b *Board, index int) bool {
	return false
}

// PlayNPC — TODO(compañero).
func (c *ControlWeakIntelligentMoves) PlayNPC(b *Board) {}
