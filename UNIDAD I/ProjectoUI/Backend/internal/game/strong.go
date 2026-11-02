package game

import "math/rand"

// ControlStrongIntelligentMoves — UnbeatableAI (Grupo 3, ítem 1: Go).
//
// Port 1:1 de TicTacToeGameLibrary/ControlStrongIntelligentMoves.cs.
// NO cambiar la lógica: mismos pesos (usuario=1, JCC=3, vacío=0), mismo
// orden de reglas del método numérico heurístico y mismos movimientos
// aleatorios. Ver "UNIDAD I/Material/Caso 1..3 TTT.pdf".
type ControlStrongIntelligentMoves struct {
	Flag        string
	MoveNumber  int
	GameControl int
	ArrayMoves  [9]int
	sum         int // mSum: se conserva entre turnos, igual que en el original
}

// NewControlStrongIntelligentMoves = constructor por defecto.
func NewControlStrongIntelligentMoves() *ControlStrongIntelligentMoves {
	c := &ControlStrongIntelligentMoves{}
	c.InitializeData()
	return c
}

func (c *ControlStrongIntelligentMoves) InitializeData() {
	for i := range c.ArrayMoves {
		c.ArrayMoves[i] = 0
	}
	c.Flag = "X"
	c.MoveNumber = 0
	c.GameControl = 0
	c.sum = 0
}

func (c *ControlStrongIntelligentMoves) InitializeControls(b *Board) {
	b.ClearTexts()
	c.EnabledControls(b)
}

func (c *ControlStrongIntelligentMoves) DisabledControls(b *Board) { b.Enabled = false }
func (c *ControlStrongIntelligentMoves) EnabledControls(b *Board)  { b.Enabled = true }

func (c *ControlStrongIntelligentMoves) CheckWinner(b *Board) int {
	return CheckWinnerBoard(b)
}

func (c *ControlStrongIntelligentMoves) showUserMove(b *Board, index int) {
	b.SetText(index, c.Flag, "user")
	c.ArrayMoves[index] = 1
	c.MoveNumber++
	c.Flag = "0"
}

func (c *ControlStrongIntelligentMoves) showNPCMove(b *Board, index int) {
	b.SetText(index, c.Flag, "npc")
	c.ArrayMoves[index] = 3
	c.MoveNumber++
	c.Flag = "X"
}

func (c *ControlStrongIntelligentMoves) generateRandomNPCMove() int {
	for {
		index := rand.Intn(9) // Random.Next(0, 9)
		if c.ArrayMoves[index] == 0 && index < len(c.ArrayMoves) {
			return index
		}
	}
}

// PlayUser: devuelve true si el casillero estaba libre (igual que el original).
func (c *ControlStrongIntelligentMoves) PlayUser(b *Board, index int) bool {
	if b.Buttons[index] == "" {
		if c.Flag == "X" {
			c.showUserMove(b, index)
			c.GameControl = c.CheckWinner(b)
		}
		return true
	}
	return false
}

// pick devuelve el primer casillero vacío de la línea (a, b, d) en ese orden.
// Equivale a: if (m[a]==0) index=a; else if (m[b]==0) index=b; else if (m[d]==0) index=d;
func (c *ControlStrongIntelligentMoves) pick(a, b, d int) int {
	index := 0
	if c.ArrayMoves[a] == 0 {
		index = a
	} else if c.ArrayMoves[b] == 0 {
		index = b
	} else if c.ArrayMoves[d] == 0 {
		index = d
	}
	c.sum = c.ArrayMoves[a] + c.ArrayMoves[b] + c.ArrayMoves[d]
	return index
}

func (c *ControlStrongIntelligentMoves) heuristicNumericalMethod() int {
	m := &c.ArrayMoves
	switch {
	// Suma 6 -> la JCC tiene dos fichas en línea: GANA (Caso 2)
	case m[0]+m[1]+m[2] == 6:
		return c.pick(0, 1, 2)
	case m[3]+m[4]+m[5] == 6:
		return c.pick(3, 4, 5)
	case m[6]+m[7]+m[8] == 6:
		return c.pick(6, 7, 8)
	case m[0]+m[3]+m[6] == 6:
		return c.pick(0, 3, 6)
	case m[1]+m[4]+m[7] == 6:
		return c.pick(1, 4, 7)
	case m[2]+m[5]+m[8] == 6:
		return c.pick(2, 5, 8)
	case m[0]+m[4]+m[8] == 6:
		return c.pick(0, 4, 8)
	case m[2]+m[4]+m[6] == 6:
		return c.pick(2, 4, 6)

	// Suma 2 -> el usuario tiene dos fichas en línea: BLOQUEA (Caso 1)
	case m[0]+m[1]+m[2] == 2:
		return c.pick(0, 1, 2)
	case m[3]+m[4]+m[5] == 2:
		return c.pick(3, 4, 5)
	case m[6]+m[7]+m[8] == 2:
		return c.pick(6, 7, 8)
	case m[0]+m[3]+m[6] == 2:
		return c.pick(0, 3, 6)
	case m[1]+m[4]+m[7] == 2:
		return c.pick(1, 4, 7)
	case m[2]+m[5]+m[8] == 2:
		return c.pick(2, 5, 8)
	case m[0]+m[4]+m[8] == 2:
		return c.pick(0, 4, 8)
	case m[2]+m[4]+m[6] == 2:
		return c.pick(2, 4, 6)

	// Suma 5 en diagonal -> caso trivial: bloqueo en las diagonales (Caso 3)
	case m[0]+m[4]+m[8] == 5:
		var index int
		if m[2] == 0 {
			index = 2
		} else if m[6] == 0 {
			index = 6
		} else {
			index = c.generateRandomNPCMove()
		}
		c.sum = 5
		return index
	case m[2]+m[4]+m[6] == 5:
		var index int
		if m[0] == 0 {
			index = 0
		} else if m[8] == 0 {
			index = 8
		} else {
			index = c.generateRandomNPCMove()
		}
		c.sum = 5
		return index

	// Usuario en dos lados adyacentes -> ocupar la esquina entre ellos
	case m[1]+m[5] == 2 && m[2] == 0:
		c.sum = 2
		return 2
	case m[1]+m[3] == 2 && m[0] == 0:
		c.sum = 2
		return 0
	case m[5]+m[7] == 2 && m[8] == 0:
		c.sum = 2
		return 8
	case m[3]+m[7] == 2 && m[6] == 0:
		c.sum = 2
		return 6

	default:
		return c.generateRandomNPCMove()
	}
}

// randomFreeAmong repite Random.Next(0, 9) hasta caer en un casillero libre
// que pertenezca a allowed, igual que los do/while del original.
//
// Única diferencia con el original: si no queda NINGÚN casillero libre de ese
// grupo, el original se queda en un bucle infinito (la ventana se congela).
// En un servidor eso bloquearía la petición para siempre, así que en ese caso
// devolvemos ok=false y el llamador sigue con la jugada heurística.
func (c *ControlStrongIntelligentMoves) randomFreeAmong(allowed ...int) (int, bool) {
	anyFree := false
	for _, a := range allowed {
		if c.ArrayMoves[a] == 0 {
			anyFree = true
			break
		}
	}
	if !anyFree {
		return 0, false
	}
	for {
		index := rand.Intn(9)
		if c.ArrayMoves[index] != 0 {
			continue
		}
		for _, a := range allowed {
			if index == a {
				return index, true
			}
		}
	}
}

func (c *ControlStrongIntelligentMoves) PlayNPC(b *Board) {
	if c.GameControl != 0 {
		return
	}

	if c.MoveNumber == 1 {
		// Primera jugada de la JCC: centro si está libre...
		if c.ArrayMoves[4] == 0 {
			c.showNPCMove(b, 4)
			c.GameControl = c.CheckWinner(b)
			return
		}
		// ...si no, una esquina aleatoria.
		index, _ := c.randomFreeAmong(0, 2, 6, 8)
		c.showNPCMove(b, index)
		c.GameControl = c.CheckWinner(b)
		return
	}

	index := c.heuristicNumericalMethod()

	if c.ArrayMoves[4] == 3 && c.sum == 5 {
		// JCC en el centro y el usuario en esquinas opuestas -> un lado aleatorio.
		if side, ok := c.randomFreeAmong(1, 3, 5, 7); ok {
			c.showNPCMove(b, side)
			c.GameControl = c.CheckWinner(b)
			return
		}
	}

	c.showNPCMove(b, index)
	c.GameControl = c.CheckWinner(b)
}
