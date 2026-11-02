package game

import "testing"

// play aplica los clics del usuario y devuelve el controlador.
func play(t *testing.T, clicks ...int) (*Form, *ControlStrongIntelligentMoves) {
	t.Helper()
	f, err := NewForm(LevelUnbeatableAI)
	if err != nil {
		t.Fatal(err)
	}
	for _, i := range clicks {
		if err := f.Click(i); err != nil {
			t.Fatalf("click %d: %v", i, err)
		}
	}
	return f, f.Strong
}

// Primera jugada: si el usuario no toma el centro, la JCC lo toma.
func TestFirstMoveTakesCenter(t *testing.T) {
	_, c := play(t, 0)
	if c.ArrayMoves[4] != 3 {
		t.Fatalf("esperaba JCC en el centro, arreglo=%v", c.ArrayMoves)
	}
}

// Primera jugada: si el usuario toma el centro, la JCC va a una esquina.
func TestFirstMoveCornerWhenCenterTaken(t *testing.T) {
	for n := 0; n < 50; n++ {
		_, c := play(t, 4)
		corner := c.ArrayMoves[0] == 3 || c.ArrayMoves[2] == 3 || c.ArrayMoves[6] == 3 || c.ArrayMoves[8] == 3
		if !corner {
			t.Fatalf("esperaba esquina, arreglo=%v", c.ArrayMoves)
		}
	}
}

// Caso 1 (PDF): usuario 4, JCC esquina; usuario 2 -> JCC bloquea en 6.
func TestCase1Blocks(t *testing.T) {
	f, _ := NewForm(LevelUnbeatableAI)
	c := f.Strong
	// Reproducimos el estado del PDF: X en 4, 0 en 0.
	c.ArrayMoves = [9]int{3, 0, 0, 0, 1, 0, 0, 0, 0}
	f.Board.Buttons = [9]string{"0", "", "", "", "X", "", "", "", ""}
	c.MoveNumber = 2
	if err := f.Click(2); err != nil {
		t.Fatal(err)
	}
	if c.ArrayMoves[6] != 3 {
		t.Fatalf("esperaba bloqueo en 6, arreglo=%v", c.ArrayMoves)
	}
}

// Caso 2 (PDF): la JCC tiene 2 y 8 -> completa 5 y gana.
func TestCase2Wins(t *testing.T) {
	f, _ := NewForm(LevelUnbeatableAI)
	c := f.Strong
	c.ArrayMoves = [9]int{1, 0, 3, 0, 1, 0, 0, 0, 3}
	f.Board.Buttons = [9]string{"X", "", "0", "", "X", "", "", "", "0"}
	c.MoveNumber = 4
	if err := f.Click(6); err != nil {
		t.Fatal(err)
	}
	if c.ArrayMoves[5] != 3 || f.Board.Enabled {
		t.Fatalf("esperaba que la JCC gane en 5, arreglo=%v enabled=%v", c.ArrayMoves, f.Board.Enabled)
	}
}

// Recorre todas las secuencias posibles del usuario (muchas veces, porque hay
// jugadas aleatorias). Toda partida debe terminar.
//
// Nota: la lógica original NO es 100% imbatible. Cuando ninguna regla del
// método numérico aplica, la JCC juega al azar (GenerateRandomNPCMove) y a
// veces deja un "tenedor" al usuario. Ej.: X0, 0→4, X7, 0→2 (azar), X6 deja
// dos amenazas (0-3-6 y 6-7-8). Como la especificación exige no cambiar la
// lógica, aquí solo se mide (dato para el informe) y se acota el porcentaje.
func TestOriginalLogicExhaustive(t *testing.T) {
	var losses, games int
	var explore func(f *Form)
	explore = func(f *Form) {
		if !f.Board.Enabled {
			games++
			if winnerOf(f.Board.Buttons) == "X" {
				losses++
			}
			return
		}
		for i := 0; i < 9; i++ {
			if f.Board.Buttons[i] != "" {
				continue
			}
			clone := cloneForm(f)
			if err := clone.Click(i); err != nil {
				t.Fatal(err)
			}
			explore(clone)
		}
	}
	for n := 0; n < 30; n++ {
		f, _ := NewForm(LevelUnbeatableAI)
		explore(f)
	}
	rate := float64(losses) / float64(games) * 100
	t.Logf("partidas exploradas: %d, derrotas de la JCC: %d (%.2f%%)", games, losses, rate)
	if games == 0 || rate > 3 {
		t.Errorf("comportamiento inesperado: %d derrotas de %d partidas", losses, games)
	}
}

// La JCC nunca deja pasar una victoria inmediata ni un bloqueo obligatorio
// cuando la regla de suma 6 / suma 2 aplica (Casos 1 y 2 del PDF).
func TestTakesImmediateWin(t *testing.T) {
	f, _ := NewForm(LevelUnbeatableAI)
	c := f.Strong
	c.ArrayMoves = [9]int{3, 1, 0, 0, 3, 0, 1, 0, 0}
	f.Board.Buttons = [9]string{"0", "X", "", "", "0", "", "X", "", ""}
	c.MoveNumber = 4
	if err := f.Click(5); err != nil { // usuario juega 5
		t.Fatal(err)
	}
	if c.ArrayMoves[8] != 3 {
		t.Fatalf("esperaba victoria en 8 (diagonal 0-4-8), arreglo=%v", c.ArrayMoves)
	}
}

func cloneForm(f *Form) *Form {
	strong := *f.Strong
	board := *f.Board
	board.Events = nil
	g := *f
	g.Strong = &strong
	g.Board = &board
	return &g
}

func winnerOf(t [9]string) string {
	lines := [8][3]int{{0, 1, 2}, {3, 4, 5}, {6, 7, 8}, {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, {0, 4, 8}, {2, 4, 6}}
	for _, l := range lines {
		if t[l[0]] != "" && t[l[0]] == t[l[1]] && t[l[1]] == t[l[2]] {
			return t[l[0]]
		}
	}
	return ""
}
