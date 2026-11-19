import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Board } from '../src/game/board.js';
import { GameState, Level, Player, WINNING_LINES } from '../src/game/constants.js';
import { Form } from '../src/game/form.js';
import { MediumAIController } from '../src/game/medium-ai.js';
import { exploreAllHumanMoves } from './helpers.js';

const emptyWeights = Array(9).fill(0);

test('D01 inicializa y reinicia el controlador y el tablero', () => {
  const c = new MediumAIController();
  assert.equal(c.flag, 'X');
  assert.equal(c.moveCount, 0);
  assert.equal(c.currentGameState, GameState.Active);
  const board = new Board();
  board.buttons = ['X', 'O', '', '', '', '', '', '', ''];
  board.enabled = false;
  c.arrayMoves[0] = 1;
  c.boardState[0] = Player.User;
  c.moveCount = 1;
  c.initializeData();
  c.initializeControls(board);
  assert.deepEqual(c.arrayMoves, emptyWeights);
  assert.deepEqual(c.boardState, emptyWeights);
  assert.equal(c.moveCount, 0);
  assert.deepEqual(board.buttons, Array(9).fill(''));
  assert.equal(board.enabled, true);
});

test('D02 X marca 0 con el centro libre: O toma el centro', () => {
  const form = new Form(Level.MediumAI);
  form.click(0);
  assert.equal(form.medium.arrayMoves[4], 3);
  assert.equal(form.board.buttons[4], 'O');
  assert.equal(form.medium.flag, 'X');
});

test('D03 una casilla ocupada se ignora sin otra jugada de la IA', () => {
  const form = new Form(Level.MediumAI);
  form.click(0);
  const weights = [...form.medium.arrayMoves];
  const buttons = [...form.board.buttons];
  const events = form.board.events.length;
  form.click(4);
  assert.deepEqual(form.medium.arrayMoves, weights);
  assert.deepEqual(form.board.buttons, buttons);
  assert.equal(form.board.events.length, events);
  assert.equal(form.medium.moveCount, 2);
});

test('D04 ocho líneas con suma 6 y suma 2, con cada casilla vacía', async (t) => {
  for (const target of [6, 2]) {
    const value = target / 2;
    for (const [n, line] of WINNING_LINES.entries()) {
      for (let missing = 0; missing < 3; missing++) {
        await t.test(`${target === 6 ? 'gana' : 'bloquea'}/línea${n}/vacía${missing}`, () => {
          const c = new MediumAIController();
          line.forEach((cell, k) => { if (k !== missing) c.arrayMoves[cell] = value; });
          assert.equal(c.heuristicNumericalMethod(), line[missing]);
        });
      }
    }
  }
});

test('D05 con victoria y bloqueo posibles, prioriza la suma 6', () => {
  const c = new MediumAIController();
  c.arrayMoves = [3, 1, 0, 0, 3, 0, 1, 0, 0];
  assert.equal(c.heuristicNumericalMethod(), 8);
});

test('D06 sin suma 6 ni 2, elige al azar entre las libres', () => {
  const c = new MediumAIController();
  c.arrayMoves = [1, 3, 1, 3, 0, 1, 3, 1, 3];
  assert.equal(c.heuristicNumericalMethod(), 4);
});

test('D07 victoria de X y empate: mensaje original y tablero deshabilitado', async (t) => {
  const U = Player.User;
  const O = Player.NPC;
  const cases = [
    ['victoria de X', [U, U, U, O, O, 0, 0, 0, 0], 5, '¡Ganó X!'],
    ['empate', [U, O, U, O, O, U, U, U, O], 9, '¡Empate!'],
  ];
  for (const [name, state, moves, text] of cases) {
    await t.test(name, () => {
      const c = new MediumAIController();
      c.boardState = state;
      c.moveCount = moves;
      const board = new Board();
      assert.equal(c.checkWinner(board), GameState.GameOver);
      assert.equal(board.enabled, false);
      assert.deepEqual(board.events, [{ type: 'message', text, caption: 'Resultado' }]);
    });
  }
});

test('D08 explora 30 árboles de respuestas aleatorias', (t) => {
  let games = 0;
  let losses = 0;
  for (let n = 0; n < 30; n++) {
    const r = exploreAllHumanMoves(new Form(Level.MediumAI));
    games += r.games;
    losses += r.losses;
  }
  t.diagnostic(`árboles de respuestas aleatorias: ${games} finales, ${losses} derrotas de la IA ` +
    `(${((losses / games) * 100).toFixed(2)}%)`);
  assert.ok(games > 0);
});
