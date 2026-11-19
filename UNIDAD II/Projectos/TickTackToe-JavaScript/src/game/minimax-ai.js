// Port de UnbeatableAIController.cs y frmTicTacToe.cs (Tic-Tac-Toe-Version-MiniMax).
const AI_PLAYER = 'O';
const HUMAN_PLAYER = 'X';
const EMPTY = ' ';
// int.MinValue e int.MaxValue de C# (enteros de 32 bits con signo).
const INT_MIN_VALUE = -2147483648;
const INT_MAX_VALUE = 2147483647;

export class MinimaxAIController {
  constructor() {
    this.initializeData();
  }

  /** ResetBoard (datos): tablero char[3,3] vacío y turno del usuario. */
  initializeData() {
    this.board = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    this.isHumanTurn = true;
    this.isGameOver = false;
  }

  /** ResetBoard (botones). */
  initializeControls(board) {
    board.clearTexts();
    board.enabled = true;
  }

  get flag() {
    return this.isHumanTurn ? 'X' : 'O';
  }

  /** Convierte el tablero a pesos 0/1/3 solo para la interfaz; Minimax no los usa. */
  weights() {
    return this.board.flat().map((cell) => (cell === HUMAN_PLAYER ? 1 : cell === AI_PLAYER ? 3 : 0));
  }

  /** OnButtonClick hasta AIMove; Form.click despacha playNPC por separado. */
  playUser(board, index) {
    if (this.isGameOver || !this.isHumanTurn || !Number.isInteger(index) || index < 0 || index >= 9) return false;
    if (this.board[Math.floor(index / 3)][index % 3] !== EMPTY) return false;
    this.makeMove(board, index, HUMAN_PLAYER);
    if (this.checkGameEnd(board)) return true;
    this.isHumanTurn = false;
    return true;
  }

  /** AIMove. La guarda de turno adapta el método a la interfaz común de controladores. */
  playNPC(board) {
    if (this.isGameOver || this.isHumanTurn) return;
    const bestMove = this.getBestMove(this.board);
    if (bestMove !== -1) {
      this.makeMove(board, bestMove, AI_PLAYER);
      this.checkGameEnd(board);
    }
    this.isHumanTurn = true;
  }

  /** GetBestMove. El > estricto conserva la primera jugada con igual puntuación. */
  getBestMove(board) {
    let bestScore = INT_MIN_VALUE;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      if (board[row][col] === EMPTY) {
        board[row][col] = AI_PLAYER;
        const score = this.minimax(board, 0, false);
        board[row][col] = EMPTY;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  /** Minimax: O maximiza y X minimiza; la profundidad premia ganar antes y perder después. */
  minimax(board, depth, isMaximizing) {
    const score = this.evaluateBoard(board);
    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (!this.isMovesLeft(board)) return 0;

    if (isMaximizing) {
      let best = INT_MIN_VALUE;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === EMPTY) {
            board[i][j] = AI_PLAYER;
            best = Math.max(best, this.minimax(board, depth + 1, false));
            board[i][j] = EMPTY;
          }
        }
      }
      return best;
    }

    let best = INT_MAX_VALUE;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) {
          board[i][j] = HUMAN_PLAYER;
          best = Math.min(best, this.minimax(board, depth + 1, true));
          board[i][j] = EMPTY;
        }
      }
    }
    return best;
  }

  /** EvaluateBoard: filas, columnas y diagonales, en ese orden. */
  evaluateBoard(board) {
    for (let row = 0; row < 3; row++) {
      if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
        if (board[row][0] === AI_PLAYER) return 10;
        if (board[row][0] === HUMAN_PLAYER) return -10;
      }
    }
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
        if (board[0][col] === AI_PLAYER) return 10;
        if (board[0][col] === HUMAN_PLAYER) return -10;
      }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (board[0][0] === AI_PLAYER) return 10;
      if (board[0][0] === HUMAN_PLAYER) return -10;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[0][2] === AI_PLAYER) return 10;
      if (board[0][2] === HUMAN_PLAYER) return -10;
    }
    return 0;
  }

  /** IsMovesLeft. */
  isMovesLeft(board) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) return true;
      }
    }
    return false;
  }

  /** MakeMove. Comprobar la ocupación sustituye a deshabilitar cada botón. */
  makeMove(board, index, player) {
    this.board[Math.floor(index / 3)][index % 3] = player;
    board.setText(index, player, player === AI_PLAYER ? 'npc' : 'user');
  }

  /** CheckGameEnd, con la misma prioridad (usuario, IA, empate) y los mismos mensajes. */
  checkGameEnd(board) {
    let message;
    if (this.checkWin(HUMAN_PLAYER)) message = 'You Win!';
    else if (this.checkWin(AI_PLAYER)) message = 'AI Wins!';
    else if (this.isBoardFull()) message = "It's a Draw!";
    else return false;
    board.showMessage(message, 'Tic Tac Toe');
    this.isGameOver = true;
    // En la web, el tablero completo representa la disponibilidad de la partida.
    board.enabled = false;
    return true;
  }

  /** CheckWin: filas y columnas intercaladas; después, las diagonales. */
  checkWin(player) {
    const b = this.board;
    for (let i = 0; i < 3; i++) {
      if (b[i][0] === player && b[i][1] === player && b[i][2] === player) return true;
      if (b[0][i] === player && b[1][i] === player && b[2][i] === player) return true;
    }
    if (b[0][0] === player && b[1][1] === player && b[2][2] === player) return true;
    if (b[0][2] === player && b[1][1] === player && b[2][0] === player) return true;
    return false;
  }

  /** IsBoardFull. */
  isBoardFull() {
    return !this.board.some((row) => row.includes(EMPTY));
  }
}
