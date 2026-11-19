// Board reemplaza a los controles de Windows Forms del proyecto original:
//
//   - buttons[i] <-> ListButtons[i].Text  (btnTicTacToe1..9, TabIndex 0..8)
//   - enabled    <-> grbTicTacToe.Enabled (GroupBox que contiene los botones)
//   - events     <-> lo que el usuario ve: jugadas y MessageBox.Show(...)
//
// Los controladores trabajan sobre este tablero como el original trabajaba sobre
// los botones; la interfaz solo lo dibuja y anima los eventos en orden.
export class Board {
  constructor() {
    this.buttons = Array(9).fill('');
    this.enabled = true;
    this.events = [];
  }

  /** ListButtons[index].Text = mark. who es "user" o "npc". */
  setText(index, mark, who) {
    this.buttons[index] = mark;
    this.events.push({ type: who, index, mark });
  }

  /** Recorre ListButtons poniendo Text = "". */
  clearTexts() {
    this.buttons.fill('');
  }

  /** MessageBox.Show(text, caption). */
  showMessage(text, caption) {
    this.events.push({ type: 'message', text, caption });
  }

  /** Devuelve y limpia los eventos pendientes. */
  takeEvents() {
    const events = this.events;
    this.events = [];
    return events;
  }
}
