package game

import (
	"crypto/sha256"
	"fmt"
	"reflect"
	"sort"
	"strings"
	"testing"
)

func minimaxTestBoard(s string) [3][3]byte {
	if len(s) != 9 {
		panic("test board must contain nine characters")
	}
	var board [3][3]byte
	for i := 0; i < 9; i++ {
		board[i/3][i%3] = s[i]
	}
	return board
}

func minimaxTestSetup(s string, humanTurn bool) (*MinimaxAIController, *Board) {
	c := NewMinimaxAIController()
	c.board = minimaxTestBoard(s)
	c.isHumanTurn = humanTurn
	b := NewBoard()
	for i := 0; i < 9; i++ {
		if s[i] != ' ' {
			b.Buttons[i] = string(s[i])
		}
	}
	return c, b
}

// Independent test oracle, also used to stop exhaustive legal game traversal.
func minimaxTestWinner(board [3][3]byte) byte {
	lines := [8][3]int{{0, 1, 2}, {3, 4, 5}, {6, 7, 8}, {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, {0, 4, 8}, {2, 4, 6}}
	for _, line := range lines {
		p := board[line[0]/3][line[0]%3]
		if p != ' ' && p == board[line[1]/3][line[1]%3] && p == board[line[2]/3][line[2]%3] {
			return p
		}
	}
	return ' '
}

func TestMinimaxInitializationAndReset(t *testing.T) {
	c, b := minimaxTestSetup("OO XX X  ", false)
	c.PlayNPC(b)
	if !c.isGameOver {
		t.Fatal("expected AI victory before reset")
	}
	c.InitializeData()
	c.InitializeControls(b)
	if c.board != minimaxTestBoard("         ") || c.Weights() != [9]int{} || c.Flag() != "X" || c.isGameOver || !b.Enabled || b.Buttons != [9]string{} {
		t.Fatalf("reset failed: controller=%+v board=%+v", c, b)
	}
	fresh := NewMinimaxAIController()
	if *fresh != *c {
		t.Fatal("constructor and reset disagree")
	}
}

func TestMinimaxUserAndNPCTurns(t *testing.T) {
	c, b := minimaxTestSetup("         ", true)
	c.PlayNPC(b)
	for _, index := range []int{-1, 9} {
		if c.PlayUser(b, index) {
			t.Fatal("accepted invalid index")
		}
	}
	if len(b.Events) != 0 {
		t.Fatal("unexpected move before human")
	}
	if !c.PlayUser(b, 0) || c.board[0][0] != 'X' || c.Flag() != "O" {
		t.Fatal("human move failed")
	}
	before := c.board
	if c.PlayUser(b, 1) || c.board != before {
		t.Fatal("accepted second human turn")
	}
	c.PlayNPC(b)
	if c.board[1][1] != 'O' || c.Flag() != "X" || c.Weights() != [9]int{1, 0, 0, 0, 3, 0, 0, 0, 0} {
		t.Fatal("AI response/weights failed")
	}
	before = c.board
	for _, index := range []int{0, 4} {
		if c.PlayUser(b, index) {
			t.Fatal("accepted occupied cell")
		}
	}
	c.PlayNPC(b)
	if c.board != before || len(b.Events) != 2 {
		t.Fatal("rejected move changed state")
	}
	for i, want := range []struct {
		who, mark string
		index     int
	}{{"user", "X", 0}, {"npc", "O", 4}} {
		e := b.Events[i]
		if e.Type != want.who || e.Mark != want.mark || e.Index == nil || *e.Index != want.index {
			t.Fatalf("event %d: %+v", i, e)
		}
	}
}

func TestMinimaxBestMoveAndRestoration(t *testing.T) {
	cases := []struct {
		name, board string
		want        int
	}{
		{"empty first tie", "         ", 0},
		{"center response", "X        ", 4},
		{"corner first tie", "    X    ", 0},
		{"immediate win", "OO XX X  ", 2},
		{"block human", "XX  O    ", 2},
		{"full board", "XOXOOXXXO", -1},
	}
	c := NewMinimaxAIController()
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			board := minimaxTestBoard(tc.board)
			before := board
			if got := c.getBestMove(&board); got != tc.want {
				t.Fatalf("move=%d want=%d", got, tc.want)
			}
			if board != before {
				t.Fatal("search did not restore board")
			}
		})
	}
}

func TestMinimaxWinningLinesAndDepth(t *testing.T) {
	lines := [8][3]int{{0, 1, 2}, {3, 4, 5}, {6, 7, 8}, {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, {0, 4, 8}, {2, 4, 6}}
	for _, p := range []byte{'X', 'O'} {
		for n, line := range lines {
			t.Run(fmt.Sprintf("%c/line%d", p, n), func(t *testing.T) {
				c := NewMinimaxAIController()
				for _, i := range line {
					c.board[i/3][i%3] = p
				}
				score := 10
				if p == 'X' {
					score = -10
				}
				if !c.checkWin(p) || c.evaluateBoard(&c.board) != score {
					t.Fatal("winning line not detected")
				}
				for _, depth := range []int{0, 1, 4} {
					want := score - depth
					if p == 'X' {
						want = score + depth
					}
					for _, maximizing := range []bool{false, true} {
						if got := c.minimax(&c.board, depth, maximizing); got != want {
							t.Fatalf("depth=%d score=%d want=%d", depth, got, want)
						}
					}
				}
			})
		}
	}
	// Synthetic simultaneous wins verify the distinct original evaluation orders.
	c, _ := minimaxTestSetup("XXXOOO   ", true)
	if c.evaluateBoard(&c.board) != -10 {
		t.Fatal("row order changed")
	}
	c, _ = minimaxTestSetup("XOOX OX  ", true)
	if c.evaluateBoard(&c.board) != -10 {
		t.Fatal("column order changed")
	}
}

func TestMinimaxGameEndAndNoFurtherMoves(t *testing.T) {
	cases := []struct {
		name, board string
		human       bool
		index       int
		message     string
		flag        string
	}{
		{"human win", "XX OO    ", true, 2, "You Win!", "X"},
		{"AI win", "OO XX X  ", false, -1, "AI Wins!", "X"},
		{"human draw", "XOXOOXX O", true, 7, "It's a Draw!", "X"},
		{"AI draw", "XOXOOXXX ", false, -1, "It's a Draw!", "X"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			c, b := minimaxTestSetup(tc.board, tc.human)
			if tc.human {
				if !c.PlayUser(b, tc.index) {
					t.Fatal("human move rejected")
				}
			} else {
				c.PlayNPC(b)
			}
			if !c.isGameOver || b.Enabled || c.Flag() != tc.flag || len(b.Events) != 2 {
				t.Fatalf("bad terminal state: %+v %+v", c, b)
			}
			event := b.Events[1]
			if event.Type != "message" || event.Text != tc.message || event.Caption != "Tic Tac Toe" {
				t.Fatalf("bad message: %+v", event)
			}
			before, buttons, events := c.board, b.Buttons, append([]Event(nil), b.Events...)
			for i := 0; i < 9; i++ {
				if c.PlayUser(b, i) {
					t.Fatal("move after game over")
				}
				c.PlayNPC(b)
			}
			if c.board != before || b.Buttons != buttons || !reflect.DeepEqual(b.Events, events) {
				t.Fatal("state changed after game over")
			}
		})
	}
	c, b := minimaxTestSetup("XOXOOXXXO", false)
	if c.isMovesLeft(&c.board) || !c.isBoardFull() || c.evaluateBoard(&c.board) != 0 || c.minimax(&c.board, 0, true) != 0 {
		t.Fatal("draw evaluation failed")
	}
	c.PlayNPC(b) // AIMove's bestMove == -1 branch still returns the human turn.
	if c.Flag() != "X" || len(b.Events) != 0 {
		t.Fatal("full board NPC changed board")
	}
}

func TestMinimaxNeverLosesExhaustive(t *testing.T) {
	terminals, wins, draws := 0, 0, 0
	var visit func(MinimaxAIController, Board)
	visit = func(c MinimaxAIController, b Board) {
		if minimaxTestWinner(c.board) == 'X' {
			t.Fatalf("AI lost: %v", c.board)
		}
		if c.isGameOver {
			terminals++
			if minimaxTestWinner(c.board) == 'O' {
				wins++
			} else {
				draws++
				if !c.isBoardFull() {
					t.Fatal("premature draw")
				}
			}
			if b.Enabled {
				t.Fatal("terminal board enabled")
			}
			return
		}
		for i := 0; i < 9; i++ {
			if c.board[i/3][i%3] != ' ' {
				continue
			}
			next, view := c, b
			view.Events = nil
			if !next.PlayUser(&view, i) {
				t.Fatal("legal human move rejected")
			}
			next.PlayNPC(&view)
			if minimaxTestWinner(next.board) == 'X' {
				t.Fatal("AI lost")
			}
			visit(next, view)
		}
	}
	visit(*NewMinimaxAIController(), *NewBoard())
	if terminals == 0 || wins == 0 || draws == 0 {
		t.Fatal("incomplete exploration")
	}
	t.Logf("all legal human sequences: %d endings, %d AI wins, %d draws, zero human wins", terminals, wins, draws)
}

func TestMinimaxMatchesOriginalCSharpExhaustive(t *testing.T) {
	// Reference generated by compiling and executing the professor's unchanged
	// UnbeatableAIController.cs with .NET Framework csc. Enumerate all legal games
	// starting with X, stop at wins/full boards, deduplicate and sort ordinally.
	// Hash UTF-8 records: nine board characters + "|" + GetBestMove + LF.
	const originalSHA256 = "fb6a9200c81c724a24f04ddad024e88659df8a3837e3c2c4c5fb9d6c84d7b31f"
	seen := map[string]bool{}
	decisions := map[string]int{}
	c := NewMinimaxAIController()
	var visit func([3][3]byte, byte)
	visit = func(board [3][3]byte, turn byte) {
		var flat [9]byte
		for i := 0; i < 9; i++ {
			flat[i] = board[i/3][i%3]
		}
		key := string(flat[:])
		if seen[key] {
			return
		}
		seen[key] = true
		if minimaxTestWinner(board) != ' ' || !strings.Contains(key, " ") {
			return
		}
		if turn == 'O' {
			before := board
			decisions[key] = c.getBestMove(&board)
			if board != before {
				t.Fatal("search changed input board")
			}
		}
		next := byte('O')
		if turn == 'O' {
			next = 'X'
		}
		for i := 0; i < 9; i++ {
			if board[i/3][i%3] == ' ' {
				board[i/3][i%3] = turn
				visit(board, next)
				board[i/3][i%3] = ' '
			}
		}
	}
	visit(c.board, 'X')
	keys := make([]string, 0, len(decisions))
	for key := range decisions {
		keys = append(keys, key)
	}
	sort.Strings(keys)
	var data strings.Builder
	for _, key := range keys {
		fmt.Fprintf(&data, "%s|%d\n", key, decisions[key])
	}
	got := fmt.Sprintf("%x", sha256.Sum256([]byte(data.String())))
	if len(seen) != 5478 || len(decisions) != 2097 || got != originalSHA256 {
		t.Fatalf("C# mismatch: boards=%d decisions=%d SHA256=%s", len(seen), len(decisions), got)
	}
	t.Logf("matched original C#: %d AI decisions across %d reachable boards; SHA256=%s", len(decisions), len(seen), got)
}

func TestMinimaxFormIntegration(t *testing.T) {
	mode, ok := FindMode(LevelMinimax)
	if !ok || !mode.Implemented {
		t.Fatal("Minimax mode unavailable")
	}
	f, err := NewForm(LevelMinimax)
	if err != nil {
		t.Fatal(err)
	}
	if f.Controller() != f.Minimax {
		t.Fatal("wrong controller")
	}
	if err := f.Click(-1); err != ErrBadIndex {
		t.Fatalf("invalid click: %v", err)
	}
	if err := f.Click(0); err != nil {
		t.Fatal(err)
	}
	events := f.Board.TakeEvents()
	if len(events) != 2 || events[0].Type != "user" || events[1].Type != "npc" || f.Board.Buttons[0] != "X" || f.Board.Buttons[4] != "O" {
		t.Fatalf("wrong click dispatch: %+v", events)
	}
	before := f.Minimax.board
	if err := f.Click(0); err != nil {
		t.Fatal(err)
	}
	if f.Minimax.board != before || len(f.Board.Events) != 0 {
		t.Fatal("occupied click triggered AI")
	}
	// A human terminal move must also suppress Form.Click's subsequent PlayNPC.
	c, b := minimaxTestSetup("XX OO    ", true)
	*f.Minimax, *f.Board = *c, *b
	if err := f.Click(2); err != nil {
		t.Fatal(err)
	}
	if len(f.Board.Events) != 2 || f.Board.Events[1].Text != "You Win!" {
		t.Fatal("unexpected extra AI move after human win")
	}
	if err := f.Click(6); err != ErrDisabled {
		t.Fatalf("terminal click: %v", err)
	}
	f.InitializeGame()
	if f.Minimax.board != minimaxTestBoard("         ") || f.Board.Buttons != [9]string{} || !f.Board.Enabled || len(f.Board.Events) != 0 || f.Minimax.Flag() != "X" {
		t.Fatal("new game did not reset state")
	}
	if err := f.Click(4); err != nil {
		t.Fatal(err)
	}
	if err := f.SetLevel(LevelMinimax); err != nil {
		t.Fatal(err)
	}
	if f.Minimax.Weights() != [9]int{} || len(f.Board.Events) != 0 || !f.Board.Enabled {
		t.Fatal("level selection did not reset game")
	}
}
