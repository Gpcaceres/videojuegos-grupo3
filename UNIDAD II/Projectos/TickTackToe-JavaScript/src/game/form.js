// Form es el equivalente a frmTicTacToe: tiene el tablero, el controlador del modo
// elegido y reparte los clics. En el original hay una aplicación por variante;
// aquí se elige con level.
import { Board } from './board.js';
import { Level, findMode } from './constants.js';
import { MediumAIController } from './medium-ai.js';
import { MinimaxAIController } from './minimax-ai.js';
import { UnbeatableAIController } from './unbeatable-ai.js';

export class GameError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export const Errors = Object.freeze({
  BadIndex: 'BAD_INDEX',
  Disabled: 'DISABLED',
  UnknownLevel: 'UNKNOWN_LEVEL',
});

export class Form {
  constructor(level, random = Math.random) {
    this.board = new Board();
    this.controlPlayer = false; // static bool ControlPlayer del frmTicTacToe
    this.medium = new MediumAIController(random);
    this.unbeatable = new UnbeatableAIController(random);
    this.minimax = new MinimaxAIController();
    this.setLevel(level);
  }

  /** Controlador del modo actual. */
  get controller() {
    switch (this.level) {
      case Level.MediumAI: return this.medium;
      case Level.UnbeatableAI: return this.unbeatable;
      case Level.Minimax: return this.minimax;
      default: return undefined;
    }
  }

  /** Cambia de modo e inicia una partida nueva. */
  setLevel(level) {
    if (!findMode(level)) throw new GameError(Errors.UnknownLevel, 'Nivel de juego desconocido.');
    this.level = level;
    this.initializeGame();
  }

  /** InitializeGame (también btnNew_Click). */
  initializeGame() {
    this.controller.initializeData();
    this.controller.initializeControls(this.board);
    this.board.events = [];
  }

  /** btnTicTacToeN_Click (N = index + 1). */
  click(index) {
    if (!Number.isInteger(index) || index < 0 || index > 8) {
      throw new GameError(Errors.BadIndex, 'Casilla fuera de rango (0 a 8).');
    }
    if (!this.board.enabled) {
      throw new GameError(Errors.Disabled, 'El tablero está deshabilitado: la partida terminó.');
    }
    this.controlPlayer = this.controller.playUser(this.board, index);
    if (this.controlPlayer) this.controller.playNPC(this.board);
  }
}
