import { Injectable, signal } from '@angular/core';

/** Efectos de sonido sintetizados con Web Audio (sin archivos de audio). */
@Injectable({ providedIn: 'root' })
export class SoundService {
  readonly enabled = signal(readFlag());
  private ctx?: AudioContext;

  toggle(): void {
    this.enabled.update((v) => !v);
    try {
      localStorage.setItem('ttt.sound', this.enabled() ? '1' : '0');
    } catch {}
  }

  place(isUser: boolean): void {
    this.tone(isUser ? 520 : 330, 0.09, 'triangle', 0.18);
    this.tone(isUser ? 780 : 247, 0.12, 'sine', 0.1, 0.05);
  }

  hover(): void {
    this.tone(1200, 0.03, 'sine', 0.025);
  }

  thinking(): void {
    [0, 0.12, 0.24].forEach((d) => this.tone(880, 0.05, 'sine', 0.04, d));
  }

  win(): void {
    [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, 0.22, 'triangle', 0.16, i * 0.09));
  }

  loss(): void {
    [392, 330, 262, 196].forEach((f, i) => this.tone(f, 0.3, 'sawtooth', 0.07, i * 0.14));
  }

  draw(): void {
    [440, 440, 523].forEach((f, i) => this.tone(f, 0.18, 'square', 0.05, i * 0.12));
  }

  error(): void {
    this.tone(140, 0.15, 'square', 0.08);
  }

  private tone(freq: number, dur: number, type: OscillatorType, gain: number, delay = 0): void {
    if (!this.enabled()) return;
    try {
      this.ctx ??= new AudioContext();
      const t = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g).connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    } catch {}
  }
}

function readFlag(): boolean {
  try {
    return localStorage.getItem('ttt.sound') !== '0';
  } catch {
    return true;
  }
}
