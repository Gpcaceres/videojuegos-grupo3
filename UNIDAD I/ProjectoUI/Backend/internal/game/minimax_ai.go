package game

// MinimaxAIController — APARTADO PENDIENTE (Diana Guerra). UnbeatableAI -> MinMax (ítem 5: Go).
//
// Portar 1:1 la versión oficial del profesor:
//
//	Material/Tic-Tac-Toe-Game-Windows-Professor/Tic-Tac-Toe-Version-MiniMax/
//	WinAppTicTacToe/WinAppTicTacToe/UnbeatableAIController.cs   (algoritmo)
//	WinAppTicTacToe/WinAppTicTacToe/frmTicTacToe.cs             (flujo del juego)
//	WinAppTicTacToe/minmax-ia-explicacion.docx                  (explicación del profesor)
//
// Ojo: esta versión NO usa pesos 1/3/0. Usa una matriz char[3,3] con 'X',
// 'O' y ' '. Hay que portar:
//   - GetBestMove(board) int, Minimax(board, depth, isMaximizing) int,
//     EvaluateBoard(board) int (+10 gana O, -10 gana X) e IsMovesLeft(board) bool.
//   - Del frmTicTacToe: OnButtonClick -> MakeMove('X') -> CheckGameEnd ->
//     AIMove -> MakeMove('O') -> CheckGameEnd. Mensajes originales:
//     "You Win!", "AI Wins!", "It's a Draw!".
//   - Weights(): devuelve el tablero como 0/1/3 (X=1, O=3) para el inspector.
//
// Al terminar, en controller.go pon Implemented=true para LevelMinimax y
// agrega pruebas en minimax_ai_test.go (la JCC nunca debe perder).
type MinimaxAIController struct {
	board       [3][3]byte // char[,] board ('X', 'O', ' ')
	isHumanTurn bool
	isGameOver  bool
}

func NewMinimaxAIController() *MinimaxAIController {
	c := &MinimaxAIController{}
	c.InitializeData()
	return c
}

// InitializeData = ResetBoard() (parte de datos).
func (c *MinimaxAIController) InitializeData() {
	for i := range c.board {
		for j := range c.board[i] {
			c.board[i][j] = ' '
		}
	}
	c.isHumanTurn = true
	c.isGameOver = false
}

func (c *MinimaxAIController) InitializeControls(b *Board) {
	b.ClearTexts()
	b.Enabled = true
}

func (c *MinimaxAIController) Flag() string {
	if c.isHumanTurn {
		return "X"
	}
	return "O"
}

// Weights — TODO(Diana): convertir c.board a 0/1/3.
func (c *MinimaxAIController) Weights() [9]int { return [9]int{} }

// PlayUser — TODO(Diana): OnButtonClick + MakeMove('X') + CheckGameEnd.
func (c *MinimaxAIController) PlayUser(b *Board, index int) bool {
	return false
}

// PlayNPC — TODO(Diana): AIMove con GetBestMove (Minimax).
func (c *MinimaxAIController) PlayNPC(b *Board) {}
