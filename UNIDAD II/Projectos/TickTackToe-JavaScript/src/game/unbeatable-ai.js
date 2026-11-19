// Port de UnbeatableAIController.cs (Tic-Tac-Toe-Versión-IA-Fuerte).
import {
  CENTER_INDEX, CORNER_INDICES, GameState, Player, SIDE_INDICES, WINNING_LINES,
  flagForPlayer, nextIndex,
} from './constants.js';

export class UnbeatableAIController {
  /** Veces en que el original se habría congelado (lo usan las pruebas). */
  static frozenCases = 0;

  /** random sustituye a new Random(); las pruebas pueden inyectar uno propio. */
  constructor(random = Math.random) {
    this.random = random;
    this.initializeGameData();
  }

  /** InitializeGameData: deja todos los datos en el estado inicial. */
  initializeGameData() {
    this.arrayMoves = Array(9).fill(0); // mArrayMoves: pesos 0/1/3
    this.boardState = Array(9).fill(Player.None); // mBoardState
    this.currentPlayerFlag = Player.User; // el usuario (X) empieza
    this.moveCount = 0;
    this.currentGameState = GameState.Active;
    this.heuristicSum = 0;
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

  /** Primera casilla vacía de la línea (a, b, d), guardando su suma como el original. */
  pick(a, b, d) {
    const m = this.arrayMoves;
    let index = 0;
    if (m[a] === 0) index = a;
    else if (m[b] === 0) index = b;
    else if (m[d] === 0) index = d;
    this.heuristicSum = m[a] + m[b] + m[d];
    return index;
  }

  /**
   * HeuristicNumericalMethod. Las 16 ramas de suma 6 y suma 2 del original recorren
   * las líneas en el orden de WINNING_LINES; aquí se expresan como dos bucles.
   */
  heuristicNumericalMethod() {
    const m = this.arrayMoves;
    // Suma 6 (3 + 3 + 0): la JCC completa la línea y gana (Caso 2).
    for (const [a, b, d] of WINNING_LINES) {
      if (m[a] + m[b] + m[d] === 6) return this.pick(a, b, d);
    }
    // Suma 2 (1 + 1 + 0): la JCC bloquea al usuario (Caso 1).
    for (const [a, b, d] of WINNING_LINES) {
      if (m[a] + m[b] + m[d] === 2) return this.pick(a, b, d);
    }
    // Suma 5 en diagonal (1 + 3 + 1): caso trivial (Caso 3).
    if (m[0] + m[4] + m[8] === 5) {
      let index;
      if (m[2] === 0) index = 2;
      else if (m[6] === 0) index = 6;
      else index = this.generateRandomNPCMove();
      this.heuristicSum = 5;
      return index;
    }
    if (m[2] + m[4] + m[6] === 5) {
      let index;
      if (m[0] === 0) index = 0;
      else if (m[8] === 0) index = 8;
      else index = this.generateRandomNPCMove();
      this.heuristicSum = 5;
      return index;
    }
    // Dos lados adyacentes del usuario: la esquina entre ellos.
    if (m[1] + m[3] === 2 && m[0] === 0) {
      this.heuristicSum = 2;
      return CORNER_INDICES[0];
    }
    if (m[1] + m[5] === 2 && m[2] === 0) {
      this.heuristicSum = 2;
      return CORNER_INDICES[1];
    }
    if (m[3] + m[7] === 2 && m[6] === 0) {
      this.heuristicSum = 2;
      return CORNER_INDICES[2];
    }
    if (m[5] + m[7] === 2 && m[8] === 0) {
      this.heuristicSum = 2;
      return CORNER_INDICES[3];
    }
    return this.generateRandomNPCMove();
  }

  /**
   * Los do/while del original eligen al azar hasta dar con una casilla libre del grupo.
   * Única diferencia: si no queda ninguna, el original entra en un bucle infinito y
   * congelaría la pestaña; aquí se devuelve -1 y el llamador sigue con la heurística.
   */
  randomFreeAmong(...allowed) {
    if (!allowed.some((a) => this.arrayMoves[a] === 0)) {
      UnbeatableAIController.frozenCases++;
      return -1;
    }
    for (;;) {
      const index = nextIndex(this.random);
      if (this.arrayMoves[index] === 0 && allowed.includes(index)) return index;
    }
  }

  /** PlayNPC: orquesta el turno de la JCC. */
  playNPC(board) {
    if (this.currentGameState !== GameState.Active) return;

    if (this.moveCount === 1) {
      // Primera jugada de la JCC: el centro si está libre; si no, una esquina al azar.
      const index = this.arrayMoves[4] === 0 ? CENTER_INDEX : this.randomFreeAmong(...CORNER_INDICES);
      this.showNPCMove(board, index);
      this.currentGameState = this.checkWinner(board);
      return;
    }

    if (this.arrayMoves[4] === 0) {
      this.showNPCMove(board, CENTER_INDEX);
      this.currentGameState = this.checkWinner(board);
      return;
    }

    const index = this.heuristicNumericalMethod();
    if (this.arrayMoves[4] === 3 && this.heuristicSum === 5) {
      // JCC en el centro y el usuario en esquinas opuestas: un lado al azar. Como en el
      // original, la condición compara SIDE_INDICES[0] dos veces, así que el lado 3
      // (SIDE_INDICES[1]) nunca se elige aquí.
      const side = this.randomFreeAmong(SIDE_INDICES[0], SIDE_INDICES[0], SIDE_INDICES[2], SIDE_INDICES[3]);
      if (side !== -1) {
        this.showNPCMove(board, side);
        this.currentGameState = this.checkWinner(board);
        return;
      }
    }
    this.showNPCMove(board, index);
    this.currentGameState = this.checkWinner(board);
  }
}
