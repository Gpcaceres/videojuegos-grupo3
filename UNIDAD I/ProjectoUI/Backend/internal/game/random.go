package game

// ControlRandomMoves — APARTADO PENDIENTE (compañero). Nivel "Principiante".
//
// Portar 1:1 TicTacToeGameLibrary/ControlRandomMoves.cs. No cambiar la lógica.
// Usa como guía strong.go (misma estructura: Flag, MoveNumber, GameControl,
// ArrayMoves, showUserMove/showNPCMove con b.SetText(..., "user"|"npc")).
// Al terminar, en controller.go pon Implemented=true para LevelRandom.
type ControlRandomMoves struct {
	Flag        string
	MoveNumber  int
	GameControl int
	ArrayMoves  [9]int
}

func NewControlRandomMoves() *ControlRandomMoves {
	c := &ControlRandomMoves{}
	c.InitializeData()
	return c
}

func (c *ControlRandomMoves) InitializeData() {
	c.ArrayMoves = [9]int{}
	c.Flag = "X"
	c.MoveNumber = 0
	c.GameControl = 0
}

func (c *ControlRandomMoves) InitializeControls(b *Board) {
	b.ClearTexts()
	b.Enabled = true
}

// PlayUser — TODO(compañero).
func (c *ControlRandomMoves) PlayUser(b *Board, index int) bool {
	return false
}

// PlayNPC — TODO(compañero).
func (c *ControlRandomMoves) PlayNPC(b *Board) {}
