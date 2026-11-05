package game

import "testing"

func TestMediumAIInitializationAndReset(t *testing.T) {
	c := NewMediumAIController()
	if c.Flag() != "X" || c.MoveCount != 0 || c.CurrentGameState != Active || c.ArrayMoves != [9]int{} || c.BoardState != [9]Player{} {
		t.Fatalf("unexpected initial state: %+v", c)
	}
	b := NewBoard()
	b.Buttons = [9]string{"X", "O", "", "", "", "", "", "", ""}
	b.Enabled = false
	c.ArrayMoves[0], c.BoardState[0], c.MoveCount = 1, PlayerUser, 1
	c.InitializeData()
	c.InitializeControls(b)
	if c.Flag() != "X" || c.MoveCount != 0 || c.CurrentGameState != Active || c.ArrayMoves != [9]int{} || c.BoardState != [9]Player{} || b.Buttons != [9]string{} || !b.Enabled {
		t.Fatalf("reset failed: controller=%+v board=%+v", c, b)
	}
}

func TestMediumAICenterPriority(t *testing.T) {
	f, err := NewForm(LevelMediumAI)
	if err != nil {
		t.Fatal(err)
	}
	if err := f.Click(0); err != nil {
		t.Fatal(err)
	}
	if f.Medium.ArrayMoves[4] != 3 || f.Board.Buttons[4] != "O" || f.Medium.Flag() != "X" {
		t.Fatalf("expected NPC to take center: weights=%v board=%v flag=%s", f.Medium.ArrayMoves, f.Board.Buttons, f.Medium.Flag())
	}
}

func TestMediumAIUserTurnAndOccupiedCell(t *testing.T) {
	f, err := NewForm(LevelMediumAI)
	if err != nil {
		t.Fatal(err)
	}
	if err := f.Click(0); err != nil {
		t.Fatal(err)
	}
	beforeWeights, beforeBoard, beforeEvents := f.Medium.ArrayMoves, f.Board.Buttons, len(f.Board.Events)
	if err := f.Click(4); err != nil {
		t.Fatal(err)
	}
	if f.Medium.ArrayMoves != beforeWeights || f.Board.Buttons != beforeBoard || len(f.Board.Events) != beforeEvents {
		t.Fatal("occupied move changed the game")
	}
	if f.Medium.MoveCount != 2 || f.Medium.Flag() != "X" {
		t.Fatalf("unexpected turn state: moves=%d flag=%s", f.Medium.MoveCount, f.Medium.Flag())
	}
}

func TestMediumAIHeuristicExplicitWinningAndBlockingLines(t *testing.T) {
	lines := [8][3]int{{0, 1, 2}, {3, 4, 5}, {6, 7, 8}, {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, {0, 4, 8}, {2, 4, 6}}
	for _, target := range []int{6, 2} {
		value := target / 2
		for lineIndex, line := range lines {
			for missing := 0; missing < 3; missing++ {
				name := "win"
				if target == 2 {
					name = "block"
				}
				t.Run(name+"/line"+string(rune('0'+lineIndex))+"/empty"+string(rune('0'+missing)), func(t *testing.T) {
					c := NewMediumAIController()
					for cell := 0; cell < 3; cell++ {
						if cell != missing {
							c.ArrayMoves[line[cell]] = value
						}
					}
					if got := c.HeuristicNumericalMethod(); got != line[missing] {
						t.Fatalf("move=%d want=%d for target=%d line=%v empty=%d", got, line[missing], target, line, missing)
					}
				})
			}
		}
	}
}

func TestMediumAIHeuristicPrioritizesWinningOverBlocking(t *testing.T) {
	c := NewMediumAIController()
	c.ArrayMoves = [9]int{3, 1, 0, 0, 3, 0, 1, 0, 0}
	if got := c.HeuristicNumericalMethod(); got != 8 {
		t.Fatalf("expected winning move 8 before a block, got %d", got)
	}
}

func TestMediumAIHeuristicRandomFallback(t *testing.T) {
	c := NewMediumAIController()
	c.ArrayMoves = [9]int{1, 3, 1, 3, 0, 1, 3, 1, 3}
	if got := c.HeuristicNumericalMethod(); got != 4 {
		t.Fatalf("expected the only free cell 4, got %d", got)
	}
}

func TestMediumAIGameEndAndDraw(t *testing.T) {
	cases := []struct {
		name    string
		board   [9]Player
		moves   int
		message string
	}{
		{"user win", [9]Player{PlayerUser, PlayerUser, PlayerUser, PlayerNPC, PlayerNPC}, 5, "\u00a1Gan\u00f3 X!"},
		{"draw", [9]Player{PlayerUser, PlayerNPC, PlayerUser, PlayerNPC, PlayerNPC, PlayerUser, PlayerUser, PlayerUser, PlayerNPC}, 9, "\u00a1Empate!"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			c := NewMediumAIController()
			c.BoardState = tc.board
			c.MoveCount = tc.moves
			b := NewBoard()
			if got := c.CheckWinner(b); got != GameOver || b.Enabled || len(b.Events) != 1 || b.Events[0].Text != tc.message || b.Events[0].Caption != "Resultado" {
				t.Fatalf("unexpected terminal result: state=%v board=%+v", got, b)
			}
		})
	}
}

// Explores thirty random-response trees to measure terminal results of the original weak strategy.
func TestMediumAIExploresRandomGames(t *testing.T) {
	var losses, games int
	winner := func(buttons [9]string) string {
		for _, line := range WinningLines {
			if buttons[line[0]] != "" && buttons[line[0]] == buttons[line[1]] && buttons[line[1]] == buttons[line[2]] {
				return buttons[line[0]]
			}
		}
		return ""
	}
	var explore func(*Form)
	explore = func(f *Form) {
		if !f.Board.Enabled {
			games++
			if winner(f.Board.Buttons) == "X" {
				losses++
			}
			return
		}
		for i := 0; i < 9; i++ {
			if f.Board.Buttons[i] != "" {
				continue
			}
			medium := *f.Medium
			board := *f.Board
			board.Events = nil
			branch := *f
			branch.Medium = &medium
			branch.Board = &board
			if err := branch.Click(i); err != nil {
				t.Fatalf("click %d: %v", i, err)
			}
			explore(&branch)
		}
	}
	for n := 0; n < 30; n++ {
		f, err := NewForm(LevelMediumAI)
		if err != nil {
			t.Fatal(err)
		}
		explore(f)
	}
	rate := float64(losses) / float64(games) * 100
	t.Logf("random-response trees: %d terminal games, %d AI losses (%.2f%%)", games, losses, rate)
	if games == 0 {
		t.Fatal("expected terminal games to be explored")
	}
}
