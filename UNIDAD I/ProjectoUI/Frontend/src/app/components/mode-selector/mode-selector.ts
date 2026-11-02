import { Component, input, output, signal } from '@angular/core';
import { GameMode } from '../../core/game.models';

/** Selector de nivel (los RadioButton del formulario original). */
@Component({
  selector: 'app-mode-selector',
  template: `
    <h2 class="label">Modo de juego</h2>
    <div class="modes">
      @for (m of modes(); track m.level; let i = $index) {
        <button
          type="button"
          class="mode"
          [class.active]="m.level === level()"
          [class.wip]="!m.implemented"
          [class.denied]="denied() === m.level"
          [style.--i]="i"
          [attr.aria-pressed]="m.level === level()"
          (click)="choose(m)"
        >
          <span class="lvl">{{ m.level }}</span>
          <span class="body">
            <strong>{{ m.name }}</strong>
            <small>{{ m.description }}</small>
            <code>{{ m.original }}</code>
          </span>
          @if (m.implemented) {
            <span class="badge ok">{{ m.owner }}</span>
          } @else {
            <span class="badge wip">🚧 En construcción · {{ m.owner }}</span>
          }
        </button>
      }
    </div>
  `,
  styleUrl: './mode-selector.scss',
})
export class ModeSelector {
  readonly modes = input.required<GameMode[]>();
  readonly level = input.required<number>();
  readonly pick = output<GameMode>();
  readonly denied = signal<number | null>(null);

  choose(m: GameMode): void {
    if (!m.implemented) {
      this.denied.set(m.level);
      setTimeout(() => this.denied.set(null), 500);
    }
    this.pick.emit(m);
  }
}
