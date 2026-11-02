package game

import "errors"

var (
	ErrDisabled       = errors.New("el tablero está deshabilitado (la partida terminó)")
	ErrBadIndex       = errors.New("casillero fuera de rango (0..8)")
	ErrUnknownLevel   = errors.New("nivel de juego desconocido")
	ErrNotImplemented = errors.New("este modo todavía no está implementado")
)

// Form es el equivalente a frmTicTacToe del profesor: tiene el tablero
// (los 9 botones + el GroupBox), el controlador del modo elegido y reparte
// los clics. En el original hay una app por modo; aquí se elige con GameLevel.
type Form struct {
	GameLevel     int
	ControlPlayer bool // static bool ControlPlayer del frmTicTacToe
	Board         *Board
	Medium        *MediumAIController
	Unbeatable    *UnbeatableAIController
	Minimax       *MinimaxAIController
}

func NewForm(level int) (*Form, error) {
	f := &Form{
		Board:      NewBoard(),
		Medium:     NewMediumAIController(),
		Unbeatable: NewUnbeatableAIController(),
		Minimax:    NewMinimaxAIController(),
	}
	if err := f.SetLevel(level); err != nil {
		return nil, err
	}
	return f, nil
}

// Controller devuelve el controlador del modo actual.
func (f *Form) Controller() Controller {
	switch f.GameLevel {
	case LevelMediumAI:
		return f.Medium
	case LevelUnbeatableAI:
		return f.Unbeatable
	case LevelMinimax:
		return f.Minimax
	}
	return nil
}

// SetLevel cambia de modo e inicializa el juego.
func (f *Form) SetLevel(level int) error {
	mode, ok := FindMode(level)
	if !ok {
		return ErrUnknownLevel
	}
	if !mode.Implemented {
		return ErrNotImplemented
	}
	f.GameLevel = level
	f.InitializeGame()
	return nil
}

// InitializeGame = frmTicTacToe.InitializeGame (también btnNew).
func (f *Form) InitializeGame() {
	if c := f.Controller(); c != nil {
		c.InitializeData()
		c.InitializeControls(f.Board)
	}
	f.Board.Events = nil
}

// Click = btnTicTacToeN_Click (N = index + 1).
func (f *Form) Click(index int) error {
	if index < 0 || index > 8 {
		return ErrBadIndex
	}
	if !f.Board.Enabled {
		return ErrDisabled
	}
	c := f.Controller()
	if c == nil {
		return ErrUnknownLevel
	}
	f.ControlPlayer = c.PlayUser(f.Board, index)
	if f.ControlPlayer {
		c.PlayNPC(f.Board)
	}
	return nil
}
