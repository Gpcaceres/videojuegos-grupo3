package game

import "math/rand"

// UnbeatableAIController — UnbeatableAI (Grupo 3, ítem 1: Go). Responsable: Germán Cáceres.
//
// Port 1:1 de la versión oficial del profesor:
//
//	Material/Tic-Tac-Toe-Game-Windows-Professor/Tic-Tac-Toe-Versión-IA-Fuerte/
//	WinAppTicTacToe/WinAppTicTacToe/UnbeatableAIController.cs
//
// NO cambiar la lógica: mismos pesos en mArrayMoves (usuario=1, JCC=3,
// vacío=0), mismo orden de reglas del método numérico heurístico y mismos
// movimientos aleatorios. Ver "UNIDAD I/Material/Caso 1..3 TTT.pdf".
type UnbeatableAIController struct {
	currentPlayerFlag Player    // mCurrentPlayerFlag
	MoveCount         int       // mMoveCount
	CurrentGameState  GameState // mCurrentGameState
	BoardState        [9]Player // mBoardState
	heuristicSum      int       // mHeuristicSum: se conserva entre turnos, igual que en el original
	ArrayMoves        [9]int    // mArrayMoves (máquina de estados finitos: 0/1/3)
}

// NewUnbeatableAIController = constructor sin parámetros.
func NewUnbeatableAIController() *UnbeatableAIController {
	c := &UnbeatableAIController{}
	c.InitializeGameData()
	return c
}

// Flag devuelve "X" u "O" según a quién le toca (propiedad Flag del original).
func (c *UnbeatableAIController) Flag() string { return FlagForPlayer(c.currentPlayerFlag) }

// Weights cumple la interfaz Controller (expone mArrayMoves al frontend).
func (c *UnbeatableAIController) Weights() [9]int { return c.ArrayMoves }

// InitializeGameData reinicia todos los datos del juego.
func (c *UnbeatableAIController) InitializeGameData() {
	c.ArrayMoves = [9]int{}
	c.BoardState = [9]Player{}
	c.currentPlayerFlag = PlayerUser // el usuario (X) empieza
	c.MoveCount = 0
	c.CurrentGameState = Active
	c.heuristicSum = 0
}

// InitializeData cumple la interfaz Controller.
func (c *UnbeatableAIController) InitializeData() { c.InitializeGameData() }

// InitializeControls borra el texto de los botones y habilita el tablero.
func (c *UnbeatableAIController) InitializeControls(b *Board) {
	b.ClearTexts()
	c.EnableControls(b)
}

func (c *UnbeatableAIController) DisableControls(b *Board) { b.Enabled = false }
func (c *UnbeatableAIController) EnableControls(b *Board)  { b.Enabled = true }

// CheckWinner revisa las 8 líneas en orden y luego el empate (9 jugadas).
func (c *UnbeatableAIController) CheckWinner(b *Board) GameState {
	for _, line := range WinningLines {
		cell1 := c.BoardState[line[0]]
		cell2 := c.BoardState[line[1]]
		cell3 := c.BoardState[line[2]]
		if cell1 != PlayerNone && cell1 == cell2 && cell2 == cell3 {
			b.ShowMessage("¡Ganó "+FlagForPlayer(cell1)+"!", "Resultado")
			c.DisableControls(b)
			return GameOver
		}
	}
	if c.MoveCount == 9 {
		b.ShowMessage("¡Empate!", "Resultado")
		c.DisableControls(b)
		return GameOver
	}
	return Active
}

func (c *UnbeatableAIController) showUserMove(b *Board, index int) {
	b.SetText(index, FlagForPlayer(PlayerUser), "user")
	c.BoardState[index] = PlayerUser
	c.MoveCount++
	c.currentPlayerFlag = PlayerNPC
	c.ArrayMoves[index] = 1
}

// PlayUser: solo si la casilla está vacía y el juego activo; true si se jugó.
func (c *UnbeatableAIController) PlayUser(b *Board, index int) bool {
	if b.Buttons[index] == "" && c.CurrentGameState == Active {
		if c.currentPlayerFlag == PlayerUser {
			c.showUserMove(b, index)
			c.CurrentGameState = c.CheckWinner(b)
			return true
		}
	}
	return false
}

func (c *UnbeatableAIController) generateRandomNPCMove() int {
	for {
		index := rand.Intn(9) // Random.Next(0, 9)
		if c.ArrayMoves[index] == 0 && index < len(c.ArrayMoves) {
			return index
		}
	}
}

func (c *UnbeatableAIController) showNPCMove(b *Board, index int) {
	b.SetText(index, FlagForPlayer(PlayerNPC), "npc")
	c.BoardState[index] = PlayerNPC
	c.MoveCount++
	c.currentPlayerFlag = PlayerUser
	c.ArrayMoves[index] = 3
}

// pick devuelve el primer casillero vacío de la línea (a, b, d) en ese orden.
// Equivale a: if (m[a]==0) index=a; else if (m[b]==0) index=b; else if (m[d]==0) index=d;
func (c *UnbeatableAIController) pick(a, b, d int) int {
	index := 0
	if c.ArrayMoves[a] == 0 {
		index = a
	} else if c.ArrayMoves[b] == 0 {
		index = b
	} else if c.ArrayMoves[d] == 0 {
		index = d
	}
	c.heuristicSum = c.ArrayMoves[a] + c.ArrayMoves[b] + c.ArrayMoves[d]
	return index
}

func (c *UnbeatableAIController) heuristicNumericalMethod() int {
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
		c.heuristicSum = 5
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
		c.heuristicSum = 5
		return index

	// Usuario en dos lados adyacentes -> ocupar la esquina entre ellos
	case m[1]+m[3] == 2 && m[0] == 0:
		c.heuristicSum = 2
		return CornerIndices[0]
	case m[1]+m[5] == 2 && m[2] == 0:
		c.heuristicSum = 2
		return CornerIndices[1]
	case m[3]+m[7] == 2 && m[6] == 0:
		c.heuristicSum = 2
		return CornerIndices[2]
	case m[5]+m[7] == 2 && m[8] == 0:
		c.heuristicSum = 2
		return CornerIndices[3]

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
// frozenCases cuenta cuántas veces el original se habría congelado (lo usan las pruebas).
var frozenCases int

func (c *UnbeatableAIController) randomFreeAmong(allowed ...int) (int, bool) {
	anyFree := false
	for _, a := range allowed {
		if c.ArrayMoves[a] == 0 {
			anyFree = true
			break
		}
	}
	if !anyFree {
		frozenCases++
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

// PlayNPC orquesta el turno de la JCC.
func (c *UnbeatableAIController) PlayNPC(b *Board) {
	if c.CurrentGameState != Active {
		return
	}

	if c.MoveCount == 1 {
		// Primera jugada de la JCC: centro si está libre...
		if c.ArrayMoves[4] == 0 {
			c.showNPCMove(b, CenterIndex)
			c.CurrentGameState = c.CheckWinner(b)
			return
		}
		// ...si no, una esquina aleatoria.
		index, _ := c.randomFreeAmong(CornerIndices[0], CornerIndices[1], CornerIndices[2], CornerIndices[3])
		c.showNPCMove(b, index)
		c.CurrentGameState = c.CheckWinner(b)
		return
	}

	if c.ArrayMoves[4] == 0 {
		c.showNPCMove(b, CenterIndex)
		c.CurrentGameState = c.CheckWinner(b)
		return
	}

	index := c.heuristicNumericalMethod()
	if c.ArrayMoves[4] == 3 && c.heuristicSum == 5 {
		// JCC en el centro y el usuario en esquinas opuestas -> un lado aleatorio.
		// Tal como en el original, la condición compara SIDE_INDICES[0] dos veces
		// (index == SIDE_INDICES[0] || index == SIDE_INDICES[0] || ...[2] || ...[3]),
		// así que el lado 3 (SIDE_INDICES[1]) nunca se elige aquí.
		if side, ok := c.randomFreeAmong(SideIndices[0], SideIndices[0], SideIndices[2], SideIndices[3]); ok {
			c.showNPCMove(b, side)
			c.CurrentGameState = c.CheckWinner(b)
			return
		}
	}
	c.showNPCMove(b, index)
	c.CurrentGameState = c.CheckWinner(b)
}
