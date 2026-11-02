package game

// MediumAIController — APARTADO PENDIENTE (Paul Moreno). MediumAI (ítem 2: Go).
//
// Portar 1:1 la versión oficial del profesor:
//
//	Material/Tic-Tac-Toe-Game-Windows-Professor/Tic-Tac-Toe-Versión-IA-Debil/
//	WinAppTicTacToe/WinAppTicTacToe/MediumAIController.cs
//
// No cambiar la lógica. Es casi igual a UnbeatableAIController
// (unbeatable_ai.go): mismos campos, CheckWinner, PlayUser, showUserMove,
// showNPCMove y generateRandomNPCMove. Lo que cambia:
//   - HeuristicNumericalMethod solo tiene las reglas de suma 6 (gana) y
//     suma 2 (bloquea); si ninguna aplica, juega al azar.
//   - PlayNPC: si el centro está libre lo toma; si no, usa la heurística.
//     (No tiene el caso de la primera jugada ni el de suma 5.)
//
// Al terminar, en controller.go pon Implemented=true para LevelMediumAI y
// agrega pruebas en medium_ai_test.go.
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

// InitializeData = InitializeGameData().
func (c *MediumAIController) InitializeData() {
	c.ArrayMoves = [9]int{}
	c.BoardState = [9]Player{}
	c.currentPlayerFlag = PlayerUser
	c.MoveCount = 0
	c.CurrentGameState = Active
}

func (c *MediumAIController) InitializeControls(b *Board) {
	b.ClearTexts()
	b.Enabled = true
}

func (c *MediumAIController) Flag() string    { return FlagForPlayer(c.currentPlayerFlag) }
func (c *MediumAIController) Weights() [9]int { return c.ArrayMoves }

// PlayUser — TODO(Paul): portar desde MediumAIController.cs.
func (c *MediumAIController) PlayUser(b *Board, index int) bool {
	return false
}

// PlayNPC — TODO(Paul): portar desde MediumAIController.cs.
func (c *MediumAIController) PlayNPC(b *Board) {}
