package game

import "math/rand"

// MediumAIController ports MediumAIController.cs from the professor's weak-AI version.
type MediumAIController struct {
	currentPlayerFlag Player
	MoveCount         int
	CurrentGameState  GameState
	BoardState        [9]Player
	ArrayMoves        [9]int
}

func NewMediumAIController() *MediumAIController {
	c := &MediumAIController{}
	c.InitializeData()
	return c
}

// InitializeData is the project's Controller-interface equivalent of InitializeGameData.
func (c *MediumAIController) InitializeData() {
	c.ArrayMoves = [9]int{}
	c.BoardState = [9]Player{}
	c.currentPlayerFlag = PlayerUser
	c.MoveCount = 0
	c.CurrentGameState = Active
}

// InitializeControls clears the visible board and enables it for a new game.
func (c *MediumAIController) InitializeControls(b *Board) {
	b.ClearTexts()
	c.EnableControls(b)
}

func (c *MediumAIController) DisableControls(b *Board) { b.Enabled = false }
func (c *MediumAIController) EnableControls(b *Board)  { b.Enabled = true }

// CheckWinner checks rows, columns, diagonals, and then a full-board draw.
func (c *MediumAIController) CheckWinner(b *Board) GameState {
	for _, line := range WinningLines {
		cell1 := c.BoardState[line[0]]
		cell2 := c.BoardState[line[1]]
		cell3 := c.BoardState[line[2]]
		if cell1 != PlayerNone && cell1 == cell2 && cell2 == cell3 {
			b.ShowMessage("\u00a1Gan\u00f3 "+FlagForPlayer(cell1)+"!", "Resultado")
			c.DisableControls(b)
			return GameOver
		}
	}

	if c.MoveCount == 9 {
		b.ShowMessage("\u00a1Empate!", "Resultado")
		c.DisableControls(b)
		return GameOver
	}
	return Active
}

func (c *MediumAIController) Flag() string    { return FlagForPlayer(c.currentPlayerFlag) }
func (c *MediumAIController) Weights() [9]int { return c.ArrayMoves }

func (c *MediumAIController) ShowUserMove(b *Board, index int) {
	b.SetText(index, FlagForPlayer(PlayerUser), "user")
	c.BoardState[index] = PlayerUser
	c.MoveCount++
	c.currentPlayerFlag = PlayerNPC
	c.ArrayMoves[index] = 1
}

func (c *MediumAIController) PlayUser(b *Board, index int) bool {
	if b.Buttons[index] == "" && c.CurrentGameState == Active {
		if c.currentPlayerFlag == PlayerUser {
			c.ShowUserMove(b, index)
			c.CurrentGameState = c.CheckWinner(b)
			return true
		}
	}
	return false
}

func (c *MediumAIController) GenerateRandomNPCMove() int {
	for {
		index := rand.Intn(9)
		if c.ArrayMoves[index] == 0 && index < len(c.ArrayMoves) {
			return index
		}
	}
}

func (c *MediumAIController) ShowNPCMove(b *Board, index int) {
	b.SetText(index, FlagForPlayer(PlayerNPC), "npc")
	c.BoardState[index] = PlayerNPC
	c.MoveCount++
	c.currentPlayerFlag = PlayerUser
	c.ArrayMoves[index] = 3
}

// HeuristicNumericalMethod keeps the original line order: sum 6 wins for the
// NPC; otherwise sum 2 blocks the user; otherwise choose a random empty cell.
func (c *MediumAIController) HeuristicNumericalMethod() int {
	for _, target := range []int{6, 2} {
		for _, line := range WinningLines {
			if c.ArrayMoves[line[0]]+c.ArrayMoves[line[1]]+c.ArrayMoves[line[2]] == target {
				if c.ArrayMoves[line[0]] == 0 {
					return line[0]
				} else if c.ArrayMoves[line[1]] == 0 {
					return line[1]
				} else if c.ArrayMoves[line[2]] == 0 {
					return line[2]
				}
			}
		}
	}
	return c.GenerateRandomNPCMove()
}

func (c *MediumAIController) PlayNPC(b *Board) {
	if c.CurrentGameState == Active {
		index := CenterIndex
		if c.ArrayMoves[CenterIndex] != 0 {
			index = c.HeuristicNumericalMethod()
		}
		c.ShowNPCMove(b, index)
		c.CurrentGameState = c.CheckWinner(b)
	}
}
