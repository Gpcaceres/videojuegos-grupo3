package game

// Port of the professor's UnbeatableAIController.cs and frmTicTacToe.cs.
const (
	minimaxAIPlayer    byte = 'O'
	minimaxHumanPlayer byte = 'X'
	minimaxEmpty       byte = ' '
	// C# int.MinValue and int.MaxValue are signed 32-bit limits.
	minimaxMinValue = -1 << 31
	minimaxMaxValue = 1<<31 - 1
)

type MinimaxAIController struct {
	board       [3][3]byte
	isHumanTurn bool
	isGameOver  bool
}

func NewMinimaxAIController() *MinimaxAIController {
	c := &MinimaxAIController{}
	c.InitializeData()
	return c
}

// InitializeData = ResetBoard (data).
func (c *MinimaxAIController) InitializeData() {
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			c.board[i][j] = minimaxEmpty
		}
	}
	c.isHumanTurn = true
	c.isGameOver = false
}

// InitializeControls = ResetBoard (buttons).
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

// Weights converts characters for the inspector only; Minimax never uses weights.
func (c *MinimaxAIController) Weights() [9]int {
	var weights [9]int
	for i := 0; i < 9; i++ {
		switch c.board[i/3][i%3] {
		case minimaxHumanPlayer:
			weights[i] = 1
		case minimaxAIPlayer:
			weights[i] = 3
		}
	}
	return weights
}

// PlayUser = OnButtonClick up to AIMove, dispatched separately by Form.Click.
// The result reports an accepted move, including one that ends the game.
func (c *MinimaxAIController) PlayUser(b *Board, index int) bool {
	if c.isGameOver || !c.isHumanTurn || index < 0 || index >= 9 {
		return false
	}
	row, col := index/3, index%3
	if c.board[row][col] != minimaxEmpty {
		return false
	}
	c.makeMove(b, index, minimaxHumanPlayer)
	if c.checkGameEnd(b) {
		return true
	}
	c.isHumanTurn = false
	return true
}

// PlayNPC = AIMove. The turn guard adapts it to the public Controller API.
func (c *MinimaxAIController) PlayNPC(b *Board) {
	if c.isGameOver || c.isHumanTurn {
		return
	}
	bestMove := c.getBestMove(&c.board)
	if bestMove != -1 {
		c.makeMove(b, bestMove, minimaxAIPlayer)
		c.checkGameEnd(b)
	}
	c.isHumanTurn = true
}

// getBestMove = GetBestMove. Strict > retains the first equally scoring move.
func (c *MinimaxAIController) getBestMove(board *[3][3]byte) int {
	bestScore := minimaxMinValue
	bestMove := -1
	for i := 0; i < 9; i++ {
		row, col := i/3, i%3
		if board[row][col] == minimaxEmpty {
			board[row][col] = minimaxAIPlayer
			score := c.minimax(board, 0, false)
			board[row][col] = minimaxEmpty
			if score > bestScore {
				bestScore = score
				bestMove = i
			}
		}
	}
	return bestMove
}

// minimax = Minimax, preserving depth scores and row-major traversal.
func (c *MinimaxAIController) minimax(board *[3][3]byte, depth int, isMaximizing bool) int {
	score := c.evaluateBoard(board)
	if score == 10 {
		return score - depth
	}
	if score == -10 {
		return score + depth
	}
	if !c.isMovesLeft(board) {
		return 0
	}
	if isMaximizing {
		best := minimaxMinValue
		for i := 0; i < 3; i++ {
			for j := 0; j < 3; j++ {
				if board[i][j] == minimaxEmpty {
					board[i][j] = minimaxAIPlayer
					best = max(best, c.minimax(board, depth+1, false))
					board[i][j] = minimaxEmpty
				}
			}
		}
		return best
	}
	best := minimaxMaxValue
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if board[i][j] == minimaxEmpty {
				board[i][j] = minimaxHumanPlayer
				best = min(best, c.minimax(board, depth+1, true))
				board[i][j] = minimaxEmpty
			}
		}
	}
	return best
}

// evaluateBoard = EvaluateBoard: rows, columns, then the two diagonals.
func (c *MinimaxAIController) evaluateBoard(board *[3][3]byte) int {
	for row := 0; row < 3; row++ {
		if board[row][0] == board[row][1] && board[row][1] == board[row][2] {
			if board[row][0] == minimaxAIPlayer {
				return 10
			}
			if board[row][0] == minimaxHumanPlayer {
				return -10
			}
		}
	}
	for col := 0; col < 3; col++ {
		if board[0][col] == board[1][col] && board[1][col] == board[2][col] {
			if board[0][col] == minimaxAIPlayer {
				return 10
			}
			if board[0][col] == minimaxHumanPlayer {
				return -10
			}
		}
	}
	if board[0][0] == board[1][1] && board[1][1] == board[2][2] {
		if board[0][0] == minimaxAIPlayer {
			return 10
		}
		if board[0][0] == minimaxHumanPlayer {
			return -10
		}
	}
	if board[0][2] == board[1][1] && board[1][1] == board[2][0] {
		if board[0][2] == minimaxAIPlayer {
			return 10
		}
		if board[0][2] == minimaxHumanPlayer {
			return -10
		}
	}
	return 0
}

// isMovesLeft = IsMovesLeft.
func (c *MinimaxAIController) isMovesLeft(board *[3][3]byte) bool {
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if board[i][j] == minimaxEmpty {
				return true
			}
		}
	}
	return false
}

// makeMove = MakeMove. Occupancy checks replace disabling individual buttons.
func (c *MinimaxAIController) makeMove(b *Board, index int, player byte) {
	c.board[index/3][index%3] = player
	who := "user"
	if player == minimaxAIPlayer {
		who = "npc"
	}
	b.SetText(index, string(player), who)
}

// checkGameEnd = CheckGameEnd, preserving human/AI/draw priority and messages.
func (c *MinimaxAIController) checkGameEnd(b *Board) bool {
	message := ""
	if c.checkWin(minimaxHumanPlayer) {
		message = "You Win!"
	} else if c.checkWin(minimaxAIPlayer) {
		message = "AI Wins!"
	} else if c.isBoardFull() {
		message = "It's a Draw!"
	} else {
		return false
	}
	b.ShowMessage(message, "Tic Tac Toe")
	c.isGameOver = true
	// The web Board represents availability for the whole game.
	b.Enabled = false
	return true
}

// checkWin = CheckWin: interleaved row/column checks, then diagonals.
func (c *MinimaxAIController) checkWin(player byte) bool {
	for i := 0; i < 3; i++ {
		if c.board[i][0] == player && c.board[i][1] == player && c.board[i][2] == player {
			return true
		}
		if c.board[0][i] == player && c.board[1][i] == player && c.board[2][i] == player {
			return true
		}
	}
	if c.board[0][0] == player && c.board[1][1] == player && c.board[2][2] == player {
		return true
	}
	if c.board[0][2] == player && c.board[1][1] == player && c.board[2][0] == player {
		return true
	}
	return false
}

// isBoardFull = IsBoardFull.
func (c *MinimaxAIController) isBoardFull() bool {
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			if c.board[i][j] == minimaxEmpty {
				return false
			}
		}
	}
	return true
}
