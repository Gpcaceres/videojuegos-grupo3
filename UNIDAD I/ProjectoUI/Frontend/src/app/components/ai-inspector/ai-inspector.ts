import { Component, computed, input } from '@angular/core';
import { LINES, LINE_NAMES } from '../../core/game.models';

/**
 * Muestra mArrayMoves (pesos: usuario=1, JCC=3, vacío=0) y la suma de cada
 * línea, como en las tablas de los PDF "Caso 1/2/3 TTT". Solo visualiza:
 * la decisión real la toma el backend.
 */
@Component({
  selector: 'app-ai-inspector',
  template: `
    <h2 class="label">Cerebro de la JCC · mArrayMoves</h2>
    <div class="vector">
      @for (w of weights(); track $index) {
        <div class="slot" [attr.data-w]="w" [class.last]="lastMove() === $index">
          <small>[{{ $index }}]</small>
          <b>{{ w }}</b>
        </div>
      }
    </div>
    <div class="sums">
      @for (s of sums(); track s.name) {
        <div class="sum" [attr.data-kind]="s.kind">
          <span>{{ s.name }}</span>
          <b>{{ s.value }}</b>
          <em>{{ s.hint }}</em>
        </div>
      }
    </div>
    <p class="legend">
      <span class="k win">6</span> JCC gana ·
      <span class="k block">2</span> JCC bloquea ·
      <span class="k diag">5</span> diagonal (caso trivial)
    </p>
  `,
  styleUrl: './ai-inspector.scss',
})
export class AiInspector {
  readonly weights = input.required<number[]>();
  readonly lastMove = input<number | null>(null);

  readonly sums = computed(() =>
    LINES.map((l, i) => {
      const w = this.weights();
      const value = w[l[0]] + w[l[1]] + w[l[2]];
      const isDiag = i >= 6;
      const kind = value === 6 ? 'win' : value === 2 ? 'block' : value === 5 && isDiag ? 'diag' : 'none';
      const hint = { win: '¡gana!', block: 'bloquear', diag: 'trivial', none: '' }[kind];
      return { name: LINE_NAMES[i], value, kind, hint };
    }),
  );
}
