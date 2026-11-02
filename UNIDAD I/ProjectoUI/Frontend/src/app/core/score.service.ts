import { Injectable, computed, signal } from '@angular/core';
import { Outcome } from './game.models';

export interface Score {
  win: number;
  loss: number;
  draw: number;
}

type ScoreMap = Record<string, Score>;

/**
 * Marcador por modo (Gains / Losses / Draws de GlobalClassGame en el original).
 * Se guarda en el navegador; es solo presentación.
 */
@Injectable({ providedIn: 'root' })
export class ScoreService {
  private readonly scores = signal<ScoreMap>(load());
  readonly streak = signal(0);

  of(modeKey: string) {
    return computed(() => this.scores()[modeKey] ?? { win: 0, loss: 0, draw: 0 });
  }

  record(modeKey: string, outcome: Outcome): void {
    this.scores.update((all) => {
      const s = { ...(all[modeKey] ?? { win: 0, loss: 0, draw: 0 }) };
      s[outcome]++;
      return { ...all, [modeKey]: s };
    });
    this.streak.update((n) => (outcome === 'loss' ? 0 : n + 1));
    save(this.scores());
  }

  reset(modeKey: string): void {
    this.scores.update((all) => ({ ...all, [modeKey]: { win: 0, loss: 0, draw: 0 } }));
    this.streak.set(0);
    save(this.scores());
  }
}

function load(): ScoreMap {
  try {
    return JSON.parse(localStorage.getItem('ttt.scores') ?? '{}');
  } catch {
    return {};
  }
}

function save(s: ScoreMap): void {
  try {
    localStorage.setItem('ttt.scores', JSON.stringify(s));
  } catch {}
}
