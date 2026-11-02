package game

import "testing"

// play aplica los clics del usuario y devuelve el controlador.
func play(t *testing.T, clicks ...int) (*Form, *UnbeatableAIController) {
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
	return f, f.Unbeatable
}

// setup carga un estado intermedio (pesos 0/1/3) en el tablero y el controlador,
// como en las figuras de los PDF de los casos.
func setup(t *testing.T, weights [9]int) (*Form, *UnbeatableAIController) {
	t.Helper()
	f, _ := NewForm(LevelUnbeatableAI)
	c := f.Unbeatable
	c.ArrayMoves = weights
	for i, w := range weights {
		switch w {
		case 1:
			c.BoardState[i], f.Board.Buttons[i] = PlayerUser, "X"
			c.MoveCount++
		case 3:
			c.BoardState[i], f.Board.Buttons[i] = PlayerNPC, "O"
			c.MoveCount++
		}
	}
	return f, c
}

// Primera jugada: si el usuario no toma el centro, la JCC lo toma.
func TestFirstMoveTakesCenter(t *testing.T) {
	f, c := play(t, 0)
	if c.ArrayMoves[4] != 3 || f.Board.Buttons[4] != "O" {
		t.Fatalf("esperaba O en el centro, arreglo=%v", c.ArrayMoves)
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

// Caso 1 (PDF): X en 4, O en 0; el usuario juega 2 -> la JCC bloquea en 6.
func TestCase1Blocks(t *testing.T) {
	f, c := setup(t, [9]int{3, 0, 0, 0, 1, 0, 0, 0, 0})
	if err := f.Click(2); err != nil {
		t.Fatal(err)
	}
	if c.ArrayMoves[6] != 3 {
		t.Fatalf("esperaba bloqueo en 6, arreglo=%v", c.ArrayMoves)
	}
}

// Caso 2 (PDF): la JCC tiene 2 y 8 -> completa 5 y gana.
func TestCase2Wins(t *testing.T) {
	f, c := setup(t, [9]int{1, 0, 3, 0, 1, 0, 0, 0, 3})
	if err := f.Click(6); err != nil {
		t.Fatal(err)
	}
	if c.ArrayMoves[5] != 3 || f.Board.Enabled || c.CurrentGameState != GameOver {
		t.Fatalf("esperaba que la JCC gane en 5, arreglo=%v enabled=%v", c.ArrayMoves, f.Board.Enabled)
	}
	last := f.Board.Events[len(f.Board.Events)-1]
	if last.Text != "¡Ganó O!" {
		t.Fatalf("mensaje inesperado: %q", last.Text)
	}
}

// Prioriza ganar (suma 6) antes que bloquear (suma 2).
func TestTakesImmediateWin(t *testing.T) {
	f, c := setup(t, [9]int{3, 1, 0, 0, 3, 0, 1, 0, 0})
	if err := f.Click(5); err != nil {
		t.Fatal(err)
	}
	if c.ArrayMoves[8] != 3 {
		t.Fatalf("esperaba victoria en 8 (diagonal 0-4-8), arreglo=%v", c.ArrayMoves)
	}
}

// Esquinas por lados adyacentes en el orden oficial: 1+3 -> 0 va antes que 1+5 -> 2.
func TestAdjacentSidesCornerOrder(t *testing.T) {
	// Usuario en 1 y 3, JCC en 4; usuario juega 5: aplican 1+3 y 1+5, gana la regla 1+3.
	f, c := setup(t, [9]int{0, 1, 0, 1, 3, 0, 0, 0, 0})
	if err := f.Click(5); err != nil {
		t.Fatal(err)
	}
	// Ninguna línea suma 2 ni 6 (0-1-2 = 1, 3-4-5 = 5, 1-4-7 = 4) -> regla de esquinas.
	if c.ArrayMoves[0] != 3 {
		t.Fatalf("esperaba esquina 0 (regla 1+3 primero), arreglo=%v", c.ArrayMoves)
	}
}

// Caso 3 con la JCC en el centro: el lado aleatorio nunca es 3, porque el
// original compara SIDE_INDICES[0] dos veces.
func TestSideRuleNeverPicksThree(t *testing.T) {
	for n := 0; n < 200; n++ {
		// X en 0, O en 4; el usuario juega 8 -> diagonal 0-4-8 suma 5.
		f, c := setup(t, [9]int{1, 0, 0, 0, 3, 0, 0, 0, 0})
		if err := f.Click(8); err != nil {
			t.Fatal(err)
		}
		if c.ArrayMoves[3] == 3 {
			t.Fatalf("la JCC eligió el lado 3, arreglo=%v", c.ArrayMoves)
		}
		if c.ArrayMoves[1] != 3 && c.ArrayMoves[5] != 3 && c.ArrayMoves[7] != 3 {
			t.Fatalf("esperaba un lado 1, 5 o 7, arreglo=%v", c.ArrayMoves)
		}
	}
}

// Recorre todas las secuencias posibles del usuario (muchas veces, porque hay
// jugadas aleatorias). Toda partida debe terminar.
//
// Nota: la lógica original NO es 100% imbatible. Cuando ninguna regla del
// método numérico aplica, la JCC juega al azar (GenerateRandomNPCMove) y a
// veces deja un "tenedor" al usuario. Ej.: X0, O4, X7, O2 (azar), X6 deja
// dos amenazas (0-3-6 y 6-7-8). Como la especificación exige no cambiar la
// lógica, aquí solo se mide (dato para el informe) y se acota el porcentaje.
func TestOriginalLogicExhaustive(t *testing.T) {
	var losses, games int
	frozenCases = 0
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
	t.Logf("partidas exploradas: %d, derrotas de la JCC: %d (%.2f%%), casos en que el original se congelaría: %d",
		games, losses, rate, frozenCases)
	if games == 0 || rate > 3 {
		t.Errorf("comportamiento inesperado: %d derrotas de %d partidas", losses, games)
	}
}

func cloneForm(f *Form) *Form {
	u := *f.Unbeatable
	board := *f.Board
	board.Events = nil
	g := *f
	g.Unbeatable = &u
	g.Board = &board
	return &g
}

func winnerOf(t [9]string) string {
	for _, l := range WinningLines {
		if t[l[0]] != "" && t[l[0]] == t[l[1]] && t[l[1]] == t[l[2]] {
			return t[l[0]]
		}
	}
	return ""
}
