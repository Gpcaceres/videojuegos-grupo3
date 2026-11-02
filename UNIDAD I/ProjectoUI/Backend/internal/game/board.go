package game

// Board reemplaza a los controles de Windows Forms del proyecto original:
//
//   - Buttons[i]  <-> ListButtons[i].Text   (btnTicTacToe1..9, TabIndex 0..8)
//   - Enabled     <-> grbTicTacToe.Enabled  (GroupBox que contiene los botones)
//   - Events      <-> lo que el usuario "ve": jugadas y MessageBox.Show(...)
//
// La lógica de los controladores trabaja sobre este tablero exactamente igual
// que el original trabajaba sobre los botones; el frontend solo lo dibuja.
type Board struct {
	Buttons [9]string
	Enabled bool
	Events  []Event
}

// Event describe algo que ocurrió en la interfaz, en orden, para que el
// frontend lo pueda animar paso a paso.
type Event struct {
	Type    string `json:"type"`              // "user" | "npc" | "message"
	Index   *int   `json:"index,omitempty"`   // casillero (TabIndex) para user/npc
	Mark    string `json:"mark,omitempty"`    // "X" u "O"
	Text    string `json:"text,omitempty"`    // texto del MessageBox
	Caption string `json:"caption,omitempty"` // título del MessageBox
}

// NewBoard crea el tablero vacío y habilitado.
func NewBoard() *Board {
	return &Board{Enabled: true}
}

// SetText equivale a ListButtons[index].Text = mark.
// who indica quién hizo la jugada ("user" o "npc") para el log de eventos.
func (b *Board) SetText(index int, mark, who string) {
	b.Buttons[index] = mark
	i := index
	b.Events = append(b.Events, Event{Type: who, Index: &i, Mark: mark})
}

// ClearTexts equivale a recorrer ListButtons poniendo Text = "".
func (b *Board) ClearTexts() {
	for i := range b.Buttons {
		b.Buttons[i] = ""
	}
}

// ShowMessage equivale a MessageBox.Show(text, caption).
func (b *Board) ShowMessage(text, caption string) {
	b.Events = append(b.Events, Event{Type: "message", Text: text, Caption: caption})
}

// TakeEvents devuelve y limpia los eventos pendientes.
func (b *Board) TakeEvents() []Event {
	ev := b.Events
	b.Events = nil
	if ev == nil {
		ev = []Event{}
	}
	return ev
}
