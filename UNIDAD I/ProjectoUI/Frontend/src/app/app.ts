import { Component, OnInit, inject, signal } from '@angular/core';
import { AiInspector } from './components/ai-inspector/ai-inspector';
import { Background } from './components/background/background';
import { Board } from './components/board/board';
import { ModeSelector } from './components/mode-selector/mode-selector';
import { ResultOverlay } from './components/result-overlay/result-overlay';
import { GameStore } from './core/game-store.service';
import { GameMode } from './core/game.models';
import { ScoreService } from './core/score.service';
import { SoundService } from './core/sound.service';

@Component({
  selector: 'app-root',
  imports: [Background, Board, ModeSelector, AiInspector, ResultOverlay],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly store = inject(GameStore);
  readonly sound = inject(SoundService);
  readonly scores = inject(ScoreService);
  readonly showOverlay = signal(true);
  readonly wipMode = signal<GameMode | null>(null);

  ngOnInit(): void {
    void this.store.init();
  }

  async onMode(m: GameMode): Promise<void> {
    const ok = await this.store.selectMode(m);
    this.wipMode.set(ok ? null : m);
    if (ok) this.showOverlay.set(true);
  }

  async again(): Promise<void> {
    this.showOverlay.set(true);
    await this.store.newGame();
  }

  play(i: number): void {
    void this.store.play(i);
  }

  resetScore(): void {
    const key = this.store.mode()?.key;
    if (key) this.scores.reset(key);
  }
}
