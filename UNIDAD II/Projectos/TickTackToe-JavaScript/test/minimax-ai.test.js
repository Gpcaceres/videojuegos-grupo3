import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { Board } from '../src/game/board.js';
import { Level, WINNING_LINES } from '../src/game/constants.js';
import { Errors, Form } from '../src/game/form.js';
import { MinimaxAIController } from '../src/game/minimax-ai.js';
import { clone, winnerOf } from './helpers.js';

/** Tablero 3x3 a partir de 9 caracteres ("X", "O" o espacio). */
const grid = (s) => [0, 1, 2].map((r) => [...s.slice(r * 3, r * 3 + 3)]);
const flat = (board) => board.flat().join('');

function setup(s, humanTurn) {
  const c = new MinimaxAIController();
  c.board = grid(s);
  c.isHumanTurn = humanTurn;
  const b = new Board();
  [...s].forEach((ch, i) => { if (ch !== ' ') b.buttons[i] = ch; });
  return [c, b];
}

test('M01 reinicia tras una victoria de la IA y coincide con el constructor', () => {
  const [c, b] = setup('OO XX X  ', false);
  c.playNPC(b);
  assert.equal(c.isGameOver, true);
  c.initializeData();
  c.initializeControls(b);
  assert.equal(flat(c.board), ' '.repeat(9));
  assert.deepEqual(c.weights(), Array(9).fill(0));
  assert.equal(c.flag, 'X');
  assert.equal(b.enabled, true);
  assert.deepEqual(b.buttons, Array(9).fill(''));
  assert.deepEqual({ ...new MinimaxAIController() }, { ...c });
});

test('M02 turnos: rechaza índices inválidos, doble turno y casillas ocupadas', () => {
  const [c, b] = setup('         ', true);
  c.playNPC(b);
  assert.equal(c.playUser(b, -1), false);
  assert.equal(c.playUser(b, 9), false);
  assert.equal(b.events.length, 0, 'jugada antes del usuario');
  assert.equal(c.playUser(b, 0), true);
  assert.equal(c.flag, 'O');
  assert.equal(c.playUser(b, 1), false, 'aceptó un segundo turno humano');
  c.playNPC(b);
  assert.equal(c.board[1][1], 'O');
  assert.deepEqual(c.weights(), [1, 0, 0, 0, 3, 0, 0, 0, 0]);
  const before = flat(c.board);
  assert.equal(c.playUser(b, 0), false);
  assert.equal(c.playUser(b, 4), false);
  c.playNPC(b);
  assert.equal(flat(c.board), before);
  assert.deepEqual(b.events, [{ type: 'user', index: 0, mark: 'X' }, { type: 'npc', index: 4, mark: 'O' }]);
});

test('M03 getBestMove elige la jugada esperada y restaura el tablero', async (t) => {
  const cases = [
    ['tablero vacío, primer empate', '         ', 0],
    ['respuesta al centro', 'X        ', 4],
    ['primera esquina', '    X    ', 0],
    ['victoria inmediata', 'OO XX X  ', 2],
    ['bloqueo', 'XX  O    ', 2],
    ['tablero lleno', 'XOXOOXXXO', -1],
  ];
  const c = new MinimaxAIController();
  for (const [name, s, want] of cases) {
    await t.test(name, () => {
      const board = grid(s);
      assert.equal(c.getBestMove(board), want);
      assert.equal(flat(board), s, 'la búsqueda no restauró el tablero');
    });
  }
});

test('M04 ocho líneas por jugador con puntuación y ajuste por profundidad', async (t) => {
  for (const p of ['X', 'O']) {
    for (const [n, line] of WINNING_LINES.entries()) {
      await t.test(`${p}/línea${n}`, () => {
        const c = new MinimaxAIController();
        for (const i of line) c.board[Math.floor(i / 3)][i % 3] = p;
        const score = p === 'O' ? 10 : -10;
        assert.equal(c.checkWin(p), true);
        assert.equal(c.evaluateBoard(c.board), score);
        for (const depth of [0, 1, 4]) {
          const want = p === 'O' ? score - depth : score + depth;
          for (const maximizing of [false, true]) assert.equal(c.minimax(c.board, depth, maximizing), want);
        }
      });
    }
  }
  // Victorias simultáneas sintéticas: verifican el orden original de evaluación.
  assert.equal(setup('XXXOOO   ', true)[0].evaluateBoard(grid('XXXOOO   ')), -10);
  assert.equal(setup('XOOX OX  ', true)[0].evaluateBoard(grid('XOOX OX  ')), -10);
});

test('M05 finales con el mensaje original y sin jugadas posteriores', async (t) => {
  const cases = [
    ['victoria humana', 'XX OO    ', true, 2, 'You Win!'],
    ['victoria de la IA', 'OO XX X  ', false, -1, 'AI Wins!'],
    ['empate humano', 'XOXOOXX O', true, 7, "It's a Draw!"],
    ['empate de la IA', 'XOXOOXXX ', false, -1, "It's a Draw!"],
  ];
  for (const [name, s, human, index, text] of cases) {
    await t.test(name, () => {
      const [c, b] = setup(s, human);
      if (human) assert.equal(c.playUser(b, index), true);
      else c.playNPC(b);
      assert.equal(c.isGameOver, true);
      assert.equal(b.enabled, false);
      assert.equal(c.flag, 'X');
      assert.deepEqual(b.events[1], { type: 'message', text, caption: 'Tic Tac Toe' });
      const before = [flat(c.board), [...b.buttons], b.events.length];
      for (let i = 0; i < 9; i++) {
        assert.equal(c.playUser(b, i), false);
        c.playNPC(b);
      }
      assert.deepEqual([flat(c.board), [...b.buttons], b.events.length], before);
    });
  }
  const [c, b] = setup('XOXOOXXXO', false);
  assert.equal(c.isMovesLeft(c.board), false);
  assert.equal(c.isBoardFull(), true);
  assert.equal(c.minimax(c.board, 0, true), 0);
  c.playNPC(b); // la rama bestMove === -1 de AIMove devuelve el turno al usuario
  assert.equal(c.flag, 'X');
  assert.equal(b.events.length, 0);
});

test('M06 ningún camino humano legal le gana a Minimax', (t) => {
  let endings = 0;
  let wins = 0;
  let draws = 0;
  const visit = (c, b) => {
    if (c.isGameOver) {
      endings++;
      assert.equal(b.enabled, false);
      if (winnerOf(c.board.flat()) === 'O') wins++;
      else {
        draws++;
        assert.equal(c.isBoardFull(), true, 'empate prematuro');
      }
      return;
    }
    for (let i = 0; i < 9; i++) {
      if (c.board[Math.floor(i / 3)][i % 3] !== ' ') continue;
      const next = clone(c);
      const view = clone(b);
      view.events = [];
      assert.equal(next.playUser(view, i), true);
      next.playNPC(view);
      assert.notEqual(winnerOf(next.board.flat()), 'X', 'la IA perdió');
      visit(next, view);
    }
  };
  visit(new MinimaxAIController(), new Board());
  t.diagnostic(`todas las secuencias humanas legales: ${endings} finales, ${wins} victorias de la IA, ${draws} empates, ninguna derrota`);
  assert.deepEqual([endings, wins, draws], [569, 386, 183]);
});

test('M07 coincide con las 2097 decisiones del C# original (SHA-256)', (t) => {
  // Referencia obtenida en la Unidad I al compilar y ejecutar el UnbeatableAIController.cs
  // original: se enumeran todas las partidas legales que empiezan con X, se cortan al
  // ganar o llenar el tablero, se deduplican y se ordenan. Cada registro es
  // "9 caracteres|GetBestMove" seguido de LF, en UTF-8.
  const ORIGINAL_SHA256 = 'fb6a9200c81c724a24f04ddad024e88659df8a3837e3c2c4c5fb9d6c84d7b31f';
  const seen = new Set();
  const decisions = new Map();
  const c = new MinimaxAIController();
  const visit = (board, turn) => {
    const key = flat(board);
    if (seen.has(key)) return;
    seen.add(key);
    if (winnerOf([...key]) !== '' || !key.includes(' ')) return;
    if (turn === 'O') {
      decisions.set(key, c.getBestMove(board));
      assert.equal(flat(board), key, 'la búsqueda cambió el tablero');
    }
    for (let i = 0; i < 9; i++) {
      const [r, col] = [Math.floor(i / 3), i % 3];
      if (board[r][col] !== ' ') continue;
      board[r][col] = turn;
      visit(board, turn === 'X' ? 'O' : 'X');
      board[r][col] = ' ';
    }
  };
  visit(grid(' '.repeat(9)), 'X');
  const data = [...decisions.keys()].sort().map((k) => `${k}|${decisions.get(k)}\n`).join('');
  const sha = createHash('sha256').update(data, 'utf8').digest('hex');
  t.diagnostic(`coincide con el C# original: ${decisions.size} decisiones en ${seen.size} tableros; SHA256=${sha}`);
  assert.equal(seen.size, 5478);
  assert.equal(decisions.size, 2097);
  assert.equal(sha, ORIGINAL_SHA256);
});

test('M08 Form: despacho, rechazo, final humano y reinicio', () => {
  const form = new Form(Level.Minimax);
  assert.equal(form.controller, form.minimax);
  assert.throws(() => form.click(-1), { code: Errors.BadIndex });
  form.click(0);
  const events = form.board.takeEvents();
  assert.deepEqual(events.map((e) => e.type), ['user', 'npc']);
  assert.equal(form.board.buttons[0], 'X');
  assert.equal(form.board.buttons[4], 'O');
  const before = flat(form.minimax.board);
  form.click(0);
  assert.equal(flat(form.minimax.board), before);
  assert.equal(form.board.events.length, 0, 'una casilla ocupada disparó a la IA');

  // Una jugada humana final no debe provocar la jugada de la IA.
  [form.minimax, form.board] = setup('XX OO    ', true);
  form.click(2);
  assert.equal(form.board.events.length, 2);
  assert.equal(form.board.events[1].text, 'You Win!');
  assert.throws(() => form.click(6), { code: Errors.Disabled });

  form.initializeGame();
  assert.equal(flat(form.minimax.board), ' '.repeat(9));
  assert.deepEqual(form.board.buttons, Array(9).fill(''));
  assert.equal(form.board.enabled, true);
  assert.equal(form.minimax.flag, 'X');
  form.click(4);
  form.setLevel(Level.Minimax);
  assert.deepEqual(form.minimax.weights(), Array(9).fill(0));
  assert.equal(form.board.events.length, 0);
  assert.equal(form.board.enabled, true);
});
