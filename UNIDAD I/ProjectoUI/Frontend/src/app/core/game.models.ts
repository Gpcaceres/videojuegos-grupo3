/** Contrato con el backend Go (internal/api/server.go). */

export type Mark = '' | 'X' | '0';

export interface GameMode {
  level: number;
  key: string;
  name: string;
  description: string;
  original: string;
  implemented: boolean;
  owner: string;
}

export interface GameEvent {
  type: 'user' | 'npc' | 'message';
  index?: number;
  mark?: Mark;
  text?: string;
  caption?: string;
}

export interface GameState {
  id: string;
  level: number;
  mode: GameMode;
  board: Mark[];
  enabled: boolean;
  arrayMoves: number[];
  moveNumber: number;
  flag: Mark;
  events: GameEvent[];
}

export type Outcome = 'win' | 'loss' | 'draw';

/** Las 8 líneas del tablero, en el mismo orden que el método numérico. */
export const LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export const LINE_NAMES = ['Fila 1', 'Fila 2', 'Fila 3', 'Col 1', 'Col 2', 'Col 3', 'Diag ↘', 'Diag ↙'];

/** Solo presentación: qué línea ganó (para dibujar el trazo animado). */
export function winningLine(board: Mark[]): readonly [number, number, number] | null {
  for (const l of LINES) {
    const [a, b, c] = l;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) return l;
  }
  return null;
}
