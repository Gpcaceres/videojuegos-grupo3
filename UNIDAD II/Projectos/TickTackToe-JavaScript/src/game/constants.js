// Enumeraciones y constantes compartidas por los controladores del docente
// (enum Player, enum GameState, CENTER_INDEX, CORNER_INDICES, SIDE_INDICES y WinningLines).

/** enum Player del original. */
export const Player = Object.freeze({
  None: 0, // casilla vacía
  User: 1, // usuario (X)
  NPC: 2, // jugador controlado por la computadora, JCC (O)
});

/** enum GameState del original. */
export const GameState = Object.freeze({
  GameOver: 0,
  Active: 1,
});

export const CENTER_INDEX = 4;
export const CORNER_INDICES = Object.freeze([0, 2, 6, 8]);
export const SIDE_INDICES = Object.freeze([1, 3, 5, 7]);

/** Filas, columnas y diagonales, en el mismo orden que el original. */
export const WINNING_LINES = Object.freeze([
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]);

/** FlagForPlayer del original: Player -> "X" u "O". */
export function flagForPlayer(player) {
  return player === Player.User ? 'X' : 'O';
}

/** RandomNumber.Next(0, 9) de C#: entero aleatorio entre 0 y 8. */
export function nextIndex(random) {
  return Math.floor(random() * 9);
}

/** Un nivel por cada variante del enunciado del Proyecto 3. */
export const Level = Object.freeze({
  MediumAI: 1, // Tic-Tac-Toe-Versión-IA-Debil
  UnbeatableAI: 2, // Tic-Tac-Toe-Versión-IA-Fuerte
  Minimax: 3, // Tic-Tac-Toe-Version-MiniMax
});

/** Catálogo de modos para el selector de la interfaz. */
export const MODES = Object.freeze([
  {
    level: Level.MediumAI,
    key: 'medium-ai',
    name: 'MediumAI',
    description: 'IA intermedia: gana y bloquea con el método numérico; si no, juega al azar.',
    original: 'MediumAIController',
    owner: 'Paul Moreno',
  },
  {
    level: Level.UnbeatableAI,
    key: 'unbeatable-ai',
    name: 'UnbeatableAI',
    description: 'Método numérico heurístico (pesos 0/1/3). Casos 1, 2 y 3.',
    original: 'UnbeatableAIController',
    owner: 'Germán Cáceres',
  },
  {
    level: Level.Minimax,
    key: 'unbeatable-minmax',
    name: 'UnbeatableAI · MinMax',
    description: 'IA imbatible con el algoritmo Minimax.',
    original: 'UnbeatableAIController (MiniMax)',
    owner: 'Diana Guerra',
  },
]);

export function findMode(level) {
  return MODES.find((m) => m.level === level);
}
