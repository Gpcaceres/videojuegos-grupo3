package game

// ControlTwoUsers — APARTADO PENDIENTE (compañero).
//
// Portar 1:1 TicTacToeGameLibrary/ControlTwoUsers.cs (o la versión Java en
// TicTacToeGameWindows1/src/Game/ControlTwoUsers.java). No cambiar la lógica.
//
// Pistas:
//   - MarkButton(b, index): si b.Buttons[index]=="" pone c.Flag y alterna "X" <-> "0".
//     Usa b.SetText(index, c.Flag, "user").
//   - CheckWinner(b): usa CheckWinnerBoard(b) (ya está portado en board.go).
//   - Al terminar, en controller.go pon Implemented=true para LevelTwoUsers.
type ControlTwoUsers struct {
	Flag string
}

func NewControlTwoUsers() *ControlTwoUsers {
	c := &ControlTwoUsers{}
	c.InitializeData()
	return c
}

func (c *ControlTwoUsers) InitializeData() {
	c.Flag = "X"
}

func (c *ControlTwoUsers) InitializeControls(b *Board) {
	b.ClearTexts()
	b.Enabled = true
}

// MarkButton — TODO(compañero): portar desde ControlTwoUsers.cs.
func (c *ControlTwoUsers) MarkButton(b *Board, index int) {
	// TODO
}

// CheckWinner — TODO(compañero): verificar que coincide con el original.
func (c *ControlTwoUsers) CheckWinner(b *Board) {
	CheckWinnerBoard(b)
}
