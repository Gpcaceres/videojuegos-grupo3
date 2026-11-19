// Port de MediumAIController.cs (Tic-Tac-Toe-Versión-IA-Debil).
import { CENTER_INDEX, GameState, Player, WINNING_LINES, flagForPlayer, nextIndex } from './constants.js';

export class MediumAIController {
  /** random sustituye a new Random(); las pruebas pueden inyectar uno propio. */
  constructor(random = Math.random) {
    this.random = random;
    this.initializeGameData();
  }

  /** InitializeGameData: deja todos los datos en el estado inicial. */
  initializeGameData() {
    this.arrayMoves = Array(9).fill(0);
    this.boardState = Array(9).fill(Player.None);
    this.currentPlayerFlag = Player.User;
    this.moveCount = 0;
    this.currentGameState = GameState.Active;
  }

  initializeData() {
    this.initializeGameData();
  }

  initializeControls(board) {
    board.clearTexts();
    this.enableControls(board);
  }

  disableControls(board) {
    board.enabled = false;
  }

  enableControls(board) {
    board.enabled = true;
  }

  get flag() {
    return flagForPlayer(this.currentPlayerFlag);
  }

  weights() {
    return [...this.arrayMoves];
  }

  /** CheckWinner: filas, columnas y diagonales; después, el empate. */
  checkWinner(board) {
    for (const [a, b, c] of WINNING_LINES) {
      const cell1 = this.boardState[a];
      if (cell1 !== Player.None && cell1 === this.boardState[b] && this.boardState[b] === this.boardState[c]) {
        board.showMessage(`¡Ganó ${flagForPlayer(cell1)}!`, 'Resultado');
        this.disableControls(board);
        return GameState.GameOver;
      }
    }
    if (this.moveCount === 9) {
      board.showMessage('¡Empate!', 'Resultado');
      this.disableControls(board);
      return GameState.GameOver;
    }
    return GameState.Active;
  }

  showUserMove(board, index) {
    board.setText(index, flagForPlayer(Player.User), 'user');
    this.boardState[index] = Player.User;
    this.moveCount++;
    this.currentPlayerFlag = Player.NPC;
    this.arrayMoves[index] = 1;
  }

  /** PlayUser: devuelve true si la jugada se hizo. */
  playUser(board, index) {
    if (board.buttons[index] === '' && this.currentGameState === GameState.Active) {
      if (this.currentPlayerFlag === Player.User) {
        this.showUserMove(board, index);
        this.currentGameState = this.checkWinner(board);
        return true;
      }
    }
    return false;
  }

  /** GenerateRandomNPCMove: cualquier casilla vacía al azar. */
  generateRandomNPCMove() {
    for (;;) {
      const index = nextIndex(this.random);
      if (this.arrayMoves[index] === 0) return index;
    }
  }

  showNPCMove(board, index) {
    board.setText(index, flagForPlayer(Player.NPC), 'npc');
    this.boardState[index] = Player.NPC;
    this.moveCount++;
    this.currentPlayerFlag = Player.User;
    this.arrayMoves[index] = 3;
  }

  /** Primera casilla vacía de la línea (a, b, d). */
  firstEmpty(a, b, d) {
    const m = this.arrayMoves;
    if (m[a] === 0) return a;
    if (m[b] === 0) return b;
    if (m[d] === 0) return d;
    return 0;
  }

  /**
   * HeuristicNumericalMethod de la IA débil: solo ganar (suma 6) o bloquear (suma 2),
   * recorriendo las líneas en el orden del original; si no, una casilla al azar.
   */
  heuristicNumericalMethod() {
    const m = this.arrayMoves;
    for (const [a, b, d] of WINNING_LINES) {
      if (m[a] + m[b] + m[d] === 6) return this.firstEmpty(a, b, d);
    }
    for (const [a, b, d] of WINNING_LINES) {
      if (m[a] + m[b] + m[d] === 2) return this.firstEmpty(a, b, d);
    }
    return this.generateRandomNPCMove();
  }

  /** PlayNPC: el centro si está libre; si no, la heurística. */
  playNPC(board) {
    if (this.currentGameState !== GameState.Active) return;
    const index = this.arrayMoves[4] === 0 ? CENTER_INDEX : this.heuristicNumericalMethod();
    this.showNPCMove(board, index);
    this.currentGameState = this.checkWinner(board);
  }
}
