import assert from 'node:assert/strict';
import { test } from 'node:test';
import { GameState, Level, Player } from '../src/game/constants.js';
import { Form } from '../src/game/form.js';
import { UnbeatableAIController } from '../src/game/unbeatable-ai.js';
import { exploreAllHumanMoves } from './helpers.js';

function play(...clicks) {
  const form = new Form(Level.UnbeatableAI);
  for (const i of clicks) form.click(i);
  return form;
}

/** Carga un estado intermedio (pesos 0/1/3), como en las figuras de los PDF de los casos. */
function setup(weights) {
  const form = new Form(Level.UnbeatableAI);
  const c = form.unbeatable;
  c.arrayMoves = [...weights];
  weights.forEach((w, i) => {
    if (w === 1) [c.boardState[i], form.board.buttons[i]] = [Player.User, 'X'];
    if (w === 3) [c.boardState[i], form.board.buttons[i]] = [Player.NPC, 'O'];
    if (w !== 0) c.moveCount++;
  });
  return form;
}

test('U01 primera jugada: la JCC toma el centro', () => {
  const form = play(0);
  assert.equal(form.unbeatable.arrayMoves[4], 3);
  assert.equal(form.board.buttons[4], 'O');
});

test('U02 primera jugada: si el usuario toma el centro, la JCC va a una esquina', () => {
  for (let n = 0; n < 50; n++) {
    const m = play(4).unbeatable.arrayMoves;
    assert.ok([0, 2, 6, 8].some((i) => m[i] === 3), `esperaba esquina: ${m}`);
  }
});

test('U03 Caso 1: X en 4, O en 0; el usuario juega 2 y la JCC bloquea en 6', () => {
  const form = setup([3, 0, 0, 0, 1, 0, 0, 0, 0]);
  form.click(2);
  assert.equal(form.unbeatable.arrayMoves[6], 3);
});

test('U04 Caso 2: la JCC tiene 2 y 8, completa 5 y gana', () => {
  const form = setup([1, 0, 3, 0, 1, 0, 0, 0, 3]);
  form.click(6);
  assert.equal(form.unbeatable.arrayMoves[5], 3);
  assert.equal(form.board.enabled, false);
  assert.equal(form.unbeatable.currentGameState, GameState.GameOver);
  assert.deepEqual(form.board.events.at(-1), { type: 'message', text: '¡Ganó O!', caption: 'Resultado' });
});

test('U05 prioriza ganar (suma 6) antes que bloquear (suma 2)', () => {
  const form = setup([3, 1, 0, 0, 3, 0, 1, 0, 0]);
  form.click(5);
  assert.equal(form.unbeatable.arrayMoves[8], 3);
});

test('U06 esquinas por lados adyacentes en el orden oficial: 1+3 antes que 1+5', () => {
  const form = setup([0, 1, 0, 1, 3, 0, 0, 0, 0]);
  form.click(5);
  assert.equal(form.unbeatable.arrayMoves[0], 3);
});

test('U07 Caso 3 con la JCC en el centro: el lado aleatorio nunca es 3', () => {
  for (let n = 0; n < 200; n++) {
    const form = setup([1, 0, 0, 0, 3, 0, 0, 0, 0]);
    form.click(8);
    const m = form.unbeatable.arrayMoves;
    assert.notEqual(m[3], 3, 'la JCC eligió el lado 3');
    assert.ok([1, 5, 7].some((i) => m[i] === 3), `esperaba un lado 1, 5 o 7: ${m}`);
  }
});

test('U08 recorre todas las respuestas humanas en 30 árboles con IA aleatoria', (t) => {
  UnbeatableAIController.frozenCases = 0;
  let games = 0;
  let losses = 0;
  for (let n = 0; n < 30; n++) {
    const r = exploreAllHumanMoves(new Form(Level.UnbeatableAI));
    games += r.games;
    losses += r.losses;
  }
  const rate = (losses / games) * 100;
  t.diagnostic(`partidas exploradas: ${games}, derrotas de la JCC: ${losses} (${rate.toFixed(2)}%), ` +
    `casos en que el original se congelaría: ${UnbeatableAIController.frozenCases}`);
  assert.ok(games > 0);
  assert.ok(rate <= 3, `${losses} derrotas de ${games} partidas`);
});
