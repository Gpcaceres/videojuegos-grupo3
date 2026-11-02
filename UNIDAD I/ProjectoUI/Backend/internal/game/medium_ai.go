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

func (c *MediumAIController) HeuristicNumericalMethod() int {
	index := 0
	if c.ArrayMoves[0]+c.ArrayMoves[1]+c.ArrayMoves[2] == 6 {
		if c.ArrayMoves[0] == 0 {
			index = 0
		} else if c.ArrayMoves[1] == 0 {
			index = 1
		} else if c.ArrayMoves[2] == 0 {
			index = 2
		}
		return index
	} else if c.ArrayMoves[3]+c.ArrayMoves[4]+c.ArrayMoves[5] == 6 {
		if c.ArrayMoves[3] == 0 {
			index = 3
		} else if c.ArrayMoves[4] == 0 {
			index = 4
		} else if c.ArrayMoves[5] == 0 {
			index = 5
		}
		return index
	} else if c.ArrayMoves[6]+c.ArrayMoves[7]+c.ArrayMoves[8] == 6 {
		if c.ArrayMoves[6] == 0 {
			index = 6
		} else if c.ArrayMoves[7] == 0 {
			index = 7
		} else if c.ArrayMoves[8] == 0 {
			index = 8
		}
		return index
	} else if c.ArrayMoves[0]+c.ArrayMoves[3]+c.ArrayMoves[6] == 6 {
		if c.ArrayMoves[0] == 0 {
			index = 0
		} else if c.ArrayMoves[3] == 0 {
			index = 3
		} else if c.ArrayMoves[6] == 0 {
			index = 6
		}
		return index
	} else if c.ArrayMoves[1]+c.ArrayMoves[4]+c.ArrayMoves[7] == 6 {
		if c.ArrayMoves[1] == 0 {
			index = 1
		} else if c.ArrayMoves[4] == 0 {
			index = 4
		} else if c.ArrayMoves[7] == 0 {
			index = 7
		}
		return index
	} else if c.ArrayMoves[2]+c.ArrayMoves[5]+c.ArrayMoves[8] == 6 {
		if c.ArrayMoves[2] == 0 {
			index = 2
		} else if c.ArrayMoves[5] == 0 {
			index = 5
		} else if c.ArrayMoves[8] == 0 {
			index = 8
		}
		return index
	} else if c.ArrayMoves[0]+c.ArrayMoves[4]+c.ArrayMoves[8] == 6 {
		if c.ArrayMoves[0] == 0 {
			index = 0
		} else if c.ArrayMoves[4] == 0 {
			index = 4
		} else if c.ArrayMoves[8] == 0 {
			index = 8
		}
		return index
	} else if c.ArrayMoves[2]+c.ArrayMoves[4]+c.ArrayMoves[6] == 6 {
		if c.ArrayMoves[2] == 0 {
			index = 2
		} else if c.ArrayMoves[4] == 0 {
			index = 4
		} else if c.ArrayMoves[6] == 0 {
			index = 6
		}
		return index
	} else if c.ArrayMoves[0]+c.ArrayMoves[1]+c.ArrayMoves[2] == 2 {
		if c.ArrayMoves[0] == 0 {
			index = 0
		} else if c.ArrayMoves[1] == 0 {
			index = 1
		} else if c.ArrayMoves[2] == 0 {
			index = 2
		}
		return index
	} else if c.ArrayMoves[3]+c.ArrayMoves[4]+c.ArrayMoves[5] == 2 {
		if c.ArrayMoves[3] == 0 {
			index = 3
		} else if c.ArrayMoves[4] == 0 {
			index = 4
		} else if c.ArrayMoves[5] == 0 {
			index = 5
		}
		return index
	} else if c.ArrayMoves[6]+c.ArrayMoves[7]+c.ArrayMoves[8] == 2 {
		if c.ArrayMoves[6] == 0 {
			index = 6
		} else if c.ArrayMoves[7] == 0 {
			index = 7
		} else if c.ArrayMoves[8] == 0 {
			index = 8
		}
		return index
	} else if c.ArrayMoves[0]+c.ArrayMoves[3]+c.ArrayMoves[6] == 2 {
		if c.ArrayMoves[0] == 0 {
			index = 0
		} else if c.ArrayMoves[3] == 0 {
			index = 3
		} else if c.ArrayMoves[6] == 0 {
			index = 6
		}
		return index
	} else if c.ArrayMoves[1]+c.ArrayMoves[4]+c.ArrayMoves[7] == 2 {
		if c.ArrayMoves[1] == 0 {
			index = 1
		} else if c.ArrayMoves[4] == 0 {
			index = 4
		} else if c.ArrayMoves[7] == 0 {
			index = 7
		}
		return index
	} else if c.ArrayMoves[2]+c.ArrayMoves[5]+c.ArrayMoves[8] == 2 {
		if c.ArrayMoves[2] == 0 {
			index = 2
		} else if c.ArrayMoves[5] == 0 {
			index = 5
		} else if c.ArrayMoves[8] == 0 {
			index = 8
		}
		return index
	} else if c.ArrayMoves[0]+c.ArrayMoves[4]+c.ArrayMoves[8] == 2 {
		if c.ArrayMoves[0] == 0 {
			index = 0
		} else if c.ArrayMoves[4] == 0 {
			index = 4
		} else if c.ArrayMoves[8] == 0 {
			index = 8
		}
		return index
	} else if c.ArrayMoves[2]+c.ArrayMoves[4]+c.ArrayMoves[6] == 2 {
		if c.ArrayMoves[2] == 0 {
			index = 2
		} else if c.ArrayMoves[4] == 0 {
			index = 4
		} else if c.ArrayMoves[6] == 0 {
			index = 6
		}
		return index
	} else {
		index = c.GenerateRandomNPCMove()
		return index
	}
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
