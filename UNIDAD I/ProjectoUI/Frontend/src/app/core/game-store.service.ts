import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GameApiService } from './game-api.service';
import { GameEvent, GameMode, GameState, Mark, Outcome, winningLine } from './game.models';
import { ScoreService } from './score.service';
import { SoundService } from './sound.service';

export interface LogEntry {
  id: number;
  who: 'user' | 'npc' | 'system';
  text: string;
}

const UNBEATABLE = 3;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Orquesta la partida: llama al backend (que tiene TODA la lógica del juego)
 * y reproduce los eventos que devuelve con pausas para poder animarlos.
 * Aquí no se decide ninguna jugada.
 */
@Injectable({ providedIn: 'root' })
export class GameStore {
  private readonly api = inject(GameApiService);
  private readonly sound = inject(SoundService);
  private readonly scores = inject(ScoreService);

  readonly modes = signal<GameMode[]>([]);
  readonly level = signal(UNBEATABLE);
  readonly state = signal<GameState | null>(null);

  /** Tablero que se ve (va un paso detrás del backend mientras se anima). */
  readonly board = signal<Mark[]>(Array(9).fill(''));
  readonly weights = signal<number[]>(Array(9).fill(0));
  readonly lastMove = signal<number | null>(null);
  readonly thinking = signal(false);
  readonly busy = signal(false);
  readonly outcome = signal<Outcome | null>(null);
  readonly resultText = signal('');
  readonly error = signal<string | null>(null);
  readonly backendOnline = signal<boolean | null>(null);
  readonly log = signal<LogEntry[]>([]);
  readonly round = signal(0); // cambia en cada partida nueva (para reiniciar animaciones)

  readonly mode = computed(() => this.modes().find((m) => m.level === this.level()) ?? null);
  readonly score = computed(() => this.scores.of(this.mode()?.key ?? '-')());
  readonly line = computed(() => winningLine(this.board()));
  readonly canPlay = computed(
    () => !!this.state()?.enabled && !this.busy() && !this.outcome() && this.backendOnline() === true,
  );

  private logId = 0;

  async init(): Promise<void> {
    try {
      this.modes.set(await firstValueFrom(this.api.modes()));
      this.backendOnline.set(true);
      await this.newGame(this.level());
    } catch (e) {
      this.backendOnline.set(false);
      this.fail(e);
    }
  }

  async selectMode(m: GameMode): Promise<boolean> {
    if (!m.implemented) {
      this.sound.error();
      return false;
    }
    if (m.level === this.level() && this.state()) return true;
    this.level.set(m.level);
    const st = this.state();
    if (st) {
      await this.apply(() => this.api.setLevel(st.id, m.level), true);
    } else {
      await this.newGame(m.level);
    }
    return true;
  }

  async newGame(level = this.level()): Promise<void> {
    const st = this.state();
    if (st && st.level === level) {
      await this.apply(() => this.api.restart(st.id), true);
    } else {
      await this.apply(() => this.api.create(level), true);
    }
  }

  async play(index: number): Promise<void> {
    const st = this.state();
    if (!st || !this.canPlay() || this.board()[index] !== '') {
      if (this.board()[index] !== '') this.sound.error();
      return;
    }
    await this.apply(() => this.api.move(st.id, index), false);
  }

  retryConnection(): void {
    this.error.set(null);
    this.backendOnline.set(null);
    void this.init();
  }

  private async apply(call: () => ReturnType<GameApiService['create']>, reset: boolean): Promise<void> {
    this.busy.set(true);
    this.error.set(null);
    try {
      const next = await firstValueFrom(call());
      this.backendOnline.set(true);
      if (reset) this.resetView(next);
      await this.replay(next.events);
      this.state.set(next);
      this.board.set([...next.board]);
      this.weights.set([...(next.arrayMoves ?? Array(9).fill(0))]);
    } catch (e) {
      this.fail(e);
    } finally {
      this.thinking.set(false);
      this.busy.set(false);
    }
  }

  private resetView(next: GameState): void {
    this.outcome.set(null);
    this.resultText.set('');
    this.lastMove.set(null);
    this.log.set([]);
    this.board.set(Array(9).fill(''));
    this.weights.set(Array(9).fill(0));
    this.level.set(next.level);
    this.round.update((r) => r + 1);
    this.push('system', `Nueva partida · ${next.mode.name}`);
  }

  /** Reproduce los eventos del backend con tiempos para las animaciones. */
  private async replay(events: GameEvent[]): Promise<void> {
    for (const ev of events) {
      if (ev.type === 'message') {
        await sleep(this.line() ? 700 : 250);
        this.finish(ev.text ?? '');
        continue;
      }
      const idx = ev.index!;
      if (ev.type === 'npc') {
        this.thinking.set(true);
        this.sound.thinking();
        await sleep(520 + Math.random() * 380);
        this.thinking.set(false);
      }
      this.board.update((b) => b.map((v, i) => (i === idx ? (ev.mark as Mark) : v)));
      this.weights.update((w) => w.map((v, i) => (i === idx ? (ev.type === 'user' ? 1 : 3) : v)));
      this.lastMove.set(idx);
      this.sound.place(ev.type === 'user');
      this.push(ev.type, `${ev.type === 'user' ? 'Tú' : 'JCC'} marcó «${ev.mark}» en la casilla ${idx + 1}`);
      await sleep(120);
    }
  }

  private finish(text: string): void {
    const o: Outcome = text === 'Empate' ? 'draw' : text.endsWith('X') ? 'win' : 'loss';
    this.outcome.set(o);
    this.resultText.set(text);
    this.push('system', text);
    if (this.mode()) this.scores.record(this.mode()!.key, o);
    ({ win: () => this.sound.win(), loss: () => this.sound.loss(), draw: () => this.sound.draw() })[o]();
  }

  private push(who: LogEntry['who'], text: string): void {
    this.log.update((l) => [{ id: ++this.logId, who, text }, ...l].slice(0, 40));
  }

  private fail(e: unknown): void {
    this.sound.error();
    if (e instanceof HttpErrorResponse) {
      if (e.status === 0 || e.status === 504 || e.status === 502) {
        this.backendOnline.set(false);
        this.error.set('No hay conexión con el backend Go. ¿Está corriendo en el puerto 8080?');
      } else {
        this.error.set(e.error?.error ?? e.message);
      }
    } else {
      this.error.set(String(e));
    }
  }
}
