// Interfaz web: dibuja el tablero y anima los eventos que producen los controladores.
// No decide ninguna jugada; toda la lógica está en src/game.
import { Level, MODES, WINNING_LINES, findMode } from '../game/constants.js';
import { Form } from '../game/form.js';
import { play as playSound, setSoundEnabled } from './sound.js';

const $ = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pause = (ms) => sleep(reducedMotion ? 0 : ms);

const OUTCOMES = {
  '¡Ganó X!': 'win', 'You Win!': 'win',
  '¡Ganó O!': 'loss', 'AI Wins!': 'loss',
  '¡Empate!': 'draw', "It's a Draw!": 'draw',
};
const COPY = {
  win: { title: '¡GANASTE!', emoji: '🏆', sub: 'Le ganaste a la máquina.' },
  loss: { title: 'PERDISTE', emoji: '🤖', sub: 'La JCC no dejó escapar la jugada ganadora.' },
  draw: { title: 'EMPATE', emoji: '🤝', sub: 'Tablero lleno y sin ganador.' },
};
const LINE_NAMES = ['Fila 1', 'Fila 2', 'Fila 3', 'Col 1', 'Col 2', 'Col 3', 'Diag ↘', 'Diag ↙'];
const SCORE_KEY = 'ttt-js-scores';

const state = {
  form: new Form(Level.UnbeatableAI),
  view: Array(9).fill(''), // lo que se ve, avanza evento a evento
  busy: false,
  sound: true,
  scores: loadScores(),
};

function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(SCORE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function saveScores() {
  try {
    localStorage.setItem(SCORE_KEY, JSON.stringify(state.scores));
  } catch {
    // Sin almacenamiento: el marcador dura lo que dure la pestaña.
  }
}

const mode = () => findMode(state.form.level);

// ---------- Construcción inicial ----------

function buildModes() {
  $('mode-list').replaceChildren(...MODES.map((m) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mode';
    b.dataset.level = m.level;
    b.innerHTML = `<span class="lvl">${m.level}</span><span class="body"><strong>${m.name}</strong>` +
      `<small>${m.description}</small><code>${m.original}</code><span class="badge">${m.owner}</span></span>`;
    b.addEventListener('click', () => selectMode(m.level));
    return b;
  }));
}

function buildGrid() {
  $('grid').replaceChildren(...Array.from({ length: 9 }, (_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cell';
    b.setAttribute('role', 'gridcell');
    b.innerHTML = `<span class="num">${i + 1}</span>`;
    b.addEventListener('click', () => clickCell(i));
    return b;
  }));
}

// ---------- Dibujo ----------

const MARK_SVG = {
  X: '<svg class="mark x" viewBox="0 0 100 100" aria-hidden="true"><path d="M24 24 76 76"/><path d="M76 24 24 76"/></svg>',
  O: '<svg class="mark o" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="27"/></svg>',
};

function renderCell(i, last = false) {
  const cell = $('grid').children[i];
  const mark = state.view[i];
  cell.querySelector('.mark')?.remove();
  if (mark) cell.insertAdjacentHTML('beforeend', MARK_SVG[mark]);
  cell.classList.toggle('filled', mark !== '');
  cell.classList.toggle('last', last);
  cell.setAttribute('aria-label', `Casilla ${i + 1}${mark ? `: ${mark}` : ' vacía'}`);
}

function renderBoard() {
  const playable = state.form.board.enabled && !state.busy;
  [...$('grid').children].forEach((cell, i) => {
    renderCell(i, cell.classList.contains('last'));
    cell.disabled = !playable || state.view[i] !== '';
  });
  $('grid').classList.toggle('locked', !state.form.board.enabled);
  renderWinLine();
}

function winningLine() {
  return WINNING_LINES.find(([a, b, c]) => state.view[a] && state.view[a] === state.view[b] && state.view[b] === state.view[c]);
}

function renderWinLine() {
  const line = winningLine();
  const svg = $('winline');
  [...$('grid').children].forEach((cell, i) => {
    cell.classList.toggle('win', !!line?.includes(i));
    cell.classList.toggle('dim', !!line && !line.includes(i));
  });
  if (!line) {
    svg.innerHTML = '';
    return;
  }
  const center = (i) => [50 + (i % 3) * 100, 50 + Math.floor(i / 3) * 100];
  const [[x1, y1], [x2, y2]] = [center(line[0]), center(line[2])];
  const [dx, dy] = [(x2 - x1) * 0.18, (y2 - y1) * 0.18];
  const cls = state.view[line[0]] === 'X' ? 'x' : 'o';
  svg.innerHTML = `<line class="${cls}" x1="${x1 - dx}" y1="${y1 - dy}" x2="${x2 + dx}" y2="${y2 + dy}"/>`;
}

function renderModes() {
  for (const b of $('mode-list').children) {
    const active = Number(b.dataset.level) === state.form.level;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  }
}

function renderScore() {
  const s = state.scores[mode().key] ?? { win: 0, draw: 0, loss: 0 };
  $('score-mode').textContent = mode().name;
  $('score-win').textContent = s.win;
  $('score-draw').textContent = s.draw;
  $('score-loss').textContent = s.loss;
}

function renderInspector() {
  // Minimax no usa pesos: el inspector numérico solo aplica a las IA numéricas.
  const numeric = state.form.level !== Level.Minimax;
  $('inspector').hidden = !numeric;
  if (!numeric) return;
  const w = state.form.controller.weights();
  $('weights').innerHTML = w.map((v, i) =>
    `<div class="w" data-v="${v}"><small>[${i}]</small><b>${v}</b></div>`).join('');
  $('sums').innerHTML = WINNING_LINES.map(([a, b, c], n) => {
    const sum = w[a] + w[b] + w[c];
    const diagonal = n >= 6;
    const kind = sum === 6 ? 'k6' : sum === 2 ? 'k2' : sum === 5 && diagonal ? 'k5' : '';
    const note = { k6: '¡gana!', k2: 'bloquea', k5: 'trivial' }[kind] ?? '';
    return `<div class="s ${kind}"><small>${LINE_NAMES[n]}</small><b>${sum}</b><em>${note}</em></div>`;
  }).join('');
}

function setStatus(html) {
  $('status').innerHTML = html;
}

function log(text, kind) {
  const li = document.createElement('li');
  li.className = kind;
  li.textContent = text;
  $('log').prepend(li);
  while ($('log').children.length > 8) $('log').lastElementChild.remove();
}

function renderAll() {
  renderModes();
  renderBoard();
  renderScore();
  renderInspector();
}

// ---------- Acciones ----------

function resetView() {
  state.view = [...state.form.board.buttons];
  [...$('grid').children].forEach((c) => c.classList.remove('last'));
  hideResult();
  setStatus('Tu turno · juegas con <b class="x">X</b>');
  log(`Nueva partida · ${mode().name}`, 'info');
  renderAll();
}

function selectMode(level) {
  if (state.busy) return;
  state.form.setLevel(level);
  resetView();
}

function newGame() {
  if (state.busy) return;
  state.form.initializeGame();
  resetView();
}

async function clickCell(index) {
  if (state.busy || !state.form.board.enabled || state.view[index] !== '') return;
  state.form.click(index);
  const events = state.form.board.takeEvents();
  if (events.length === 0) return;
  state.busy = true;
  renderBoard();
  await replay(events);
  state.busy = false;
  renderAll();
}

/** Reproduce en orden lo que hizo el controlador: jugada del usuario, de la JCC y MessageBox. */
async function replay(events) {
  for (const [n, e] of events.entries()) {
    if (e.type === 'message') {
      await pause(350);
      finish(e);
      continue;
    }
    if (e.type === 'npc') {
      setStatus('La JCC está pensando…');
      $('thinking').hidden = false;
      await pause(550);
      $('thinking').hidden = true;
    }
    [...$('grid').children].forEach((c) => c.classList.remove('last'));
    state.view[e.index] = e.mark;
    renderCell(e.index, true);
    renderWinLine();
    playSound(e.type);
    log(e.type === 'user' ? `Marcaste «X» en la casilla ${e.index + 1}` : `La JCC marcó «O» en la casilla ${e.index + 1}`, e.type);
    if (e.type === 'user' && events[n + 1]?.type === 'npc') await pause(200);
  }
  if (state.form.board.enabled) setStatus('Tu turno · juegas con <b class="x">X</b>');
}

function finish(event) {
  const outcome = OUTCOMES[event.text];
  const s = (state.scores[mode().key] ??= { win: 0, draw: 0, loss: 0 });
  s[outcome]++;
  saveScores();
  log(event.text, 'info');
  setStatus(event.text);
  playSound(outcome);
  showResult(outcome, event);
}

function showResult(outcome, event) {
  const copy = COPY[outcome];
  $('result').dataset.outcome = outcome;
  $('result-emoji').textContent = copy.emoji;
  $('result-title').innerHTML = [...copy.title].map((ch, i) => `<span style="--d:${i}">${ch}</span>`).join('');
  $('result-text').textContent = `“${event.text}”`;
  $('result-caption').textContent = `(${event.caption})`;
  $('result-sub').textContent = copy.sub;
  $('result').hidden = false;
  $('again').focus();
}

function hideResult() {
  $('result').hidden = true;
}

function toggleSound() {
  state.sound = !state.sound;
  setSoundEnabled(state.sound);
  $('sound').textContent = state.sound ? '🔊' : '🔇';
  $('sound').setAttribute('aria-pressed', String(state.sound));
}

// ---------- Arranque ----------

buildModes();
buildGrid();
$('new-game').addEventListener('click', newGame);
$('again').addEventListener('click', newGame);
$('dismiss').addEventListener('click', () => { hideResult(); $('new-game').focus(); });
$('sound').addEventListener('click', toggleSound);
$('score-reset').addEventListener('click', () => {
  state.scores[mode().key] = { win: 0, draw: 0, loss: 0 };
  saveScores();
  renderScore();
});
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'Escape' && !$('result').hidden) hideResult();
  else if (/^[1-9]$/.test(e.key) && $('result').hidden) clickCell(Number(e.key) - 1);
  else if (e.key.toLowerCase() === 'n') newGame();
  else if (e.key.toLowerCase() === 's') toggleSound();
});
resetView();
