// Efectos de sonido sintetizados con Web Audio (sin archivos de audio).
let ctx;
let enabled = true;

export function setSoundEnabled(on) {
  enabled = on;
}

function tone(freq, start, duration, type = 'sine', gain = 0.08) {
  ctx ??= new AudioContext();
  const t = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  amp.gain.setValueAtTime(gain, t);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(amp).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration);
}

const SOUNDS = {
  user: () => tone(660, 0, 0.12, 'triangle'),
  npc: () => tone(440, 0, 0.14, 'square', 0.05),
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.22, 'triangle')),
  loss: () => [392, 330, 262].forEach((f, i) => tone(f, i * 0.12, 0.25, 'sawtooth', 0.05)),
  draw: () => [440, 440].forEach((f, i) => tone(f, i * 0.15, 0.18, 'sine')),
};

export function play(name) {
  if (!enabled) return;
  try {
    SOUNDS[name]?.();
  } catch {
    // Sin audio disponible: el juego continúa en silencio.
  }
}
