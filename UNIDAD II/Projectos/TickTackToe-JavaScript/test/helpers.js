import { WINNING_LINES } from '../src/game/constants.js';

/** Copia profunda que conserva la clase (tableros y controladores para ramificar partidas). */
export function clone(value) {
  if (Array.isArray(value)) return value.map(clone);
  if (value === null || typeof value !== 'object') return value;
  const copy = Object.create(Object.getPrototypeOf(value));
  for (const [key, field] of Object.entries(value)) copy[key] = clone(field);
  return copy;
}

/** Ganador de un tablero de 9 casillas ("X", "O" o ""), independiente del código bajo prueba. */
export function winnerOf(cells) {
  for (const [a, b, c] of WINNING_LINES) {
    if (cells[a] && cells[a] !== ' ' && cells[a] === cells[b] && cells[b] === cells[c]) return cells[a];
  }
  return '';
}

/** Recorre todas las respuestas humanas posibles y cuenta finales y derrotas de la IA. */
export function exploreAllHumanMoves(form) {
  const result = { games: 0, losses: 0 };
  const visit = (f) => {
    if (!f.board.enabled) {
      result.games++;
      if (winnerOf(f.board.buttons) === 'X') result.losses++;
      return;
    }
    for (let i = 0; i < 9; i++) {
      if (f.board.buttons[i] !== '') continue;
      const branch = clone(f);
      branch.board.events = [];
      branch.click(i);
      visit(branch);
    }
  };
  visit(form);
  return result;
}
