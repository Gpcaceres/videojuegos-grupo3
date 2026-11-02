package game

import "errors"

var (
	ErrDisabled       = errors.New("el tablero está deshabilitado (la partida terminó)")
	ErrBadIndex       = errors.New("casillero fuera de rango (0..8)")
	ErrUnknownLevel   = errors.New("nivel de juego desconocido")
	ErrNotImplemented = errors.New("este modo todavía no está implementado")
)

// GlobalClassGame — en el original es una clase estática; en un servidor web
// cada partida tiene la suya.
type GlobalClassGame struct {
	GameLevel     int
	ControlPlayer bool
}

// Form es el equivalente a frmTicTacToe: tiene un objeto de cada controlador,
// el tablero (los 9 botones + el GroupBox) y reparte los clics según el nivel.
type Form struct {
	Global   GlobalClassGame
	Board    *Board
	TwoUsers *ControlTwoUsers
	Random   *ControlRandomMoves
	Weak     *ControlWeakIntelligentMoves
	Strong   *ControlStrongIntelligentMoves
	MinMax   *ControlMinMaxMoves
}

func NewForm(level int) (*Form, error) {
	f := &Form{
		Board:    NewBoard(),
		TwoUsers: NewControlTwoUsers(),
		Random:   NewControlRandomMoves(),
		Weak:     NewControlWeakIntelligentMoves(),
		Strong:   NewControlStrongIntelligentMoves(),
		MinMax:   NewControlMinMaxMoves(),
	}
	if err := f.SetLevel(level); err != nil {
		return nil, err
	}
	return f, nil
}

func (f *Form) controller() Controller {
	switch f.Global.GameLevel {
	case LevelRandom:
		return f.Random
	case LevelMediumAI:
		return f.Weak
	case LevelUnbeatableAI:
		return f.Strong
	case LevelUnbeatableMinMax:
		return f.MinMax
	}
	return nil
}

// SetLevel = rdbXxx_CheckedChanged: cambia GameLevel e inicializa el juego.
func (f *Form) SetLevel(level int) error {
	mode, ok := FindMode(level)
	if !ok {
		return ErrUnknownLevel
	}
	if !mode.Implemented {
		return ErrNotImplemented
	}
	f.Global.GameLevel = level
	f.InitializeGame()
	return nil
}

// InitializeGame = frmTicTacToe.InitializeGame (también btnNew / mnuFileNew).
func (f *Form) InitializeGame() {
	if f.Global.GameLevel == LevelTwoUsers {
		f.TwoUsers.InitializeData()
		f.TwoUsers.InitializeControls(f.Board)
	} else if c := f.controller(); c != nil {
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
	if f.Global.GameLevel == LevelTwoUsers {
		f.TwoUsers.MarkButton(f.Board, index)
		f.TwoUsers.CheckWinner(f.Board)
		return nil
	}
	c := f.controller()
	if c == nil {
		return ErrUnknownLevel
	}
	f.Global.ControlPlayer = c.PlayUser(f.Board, index)
	if f.Global.ControlPlayer {
		c.PlayNPC(f.Board)
	}
	return nil
}
