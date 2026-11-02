import { Component, ElementRef, computed, inject, input, output, signal } from '@angular/core';
import { Mark, Outcome } from '../../core/game.models';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.html',
  styleUrl: './board.scss',
  host: {
    '(pointermove)': 'tilt($event)',
    '(pointerleave)': 'untilt()',
    '(window:keydown)': 'key($event)',
    '[class.thinking]': 'thinking()',
    '[class.locked]': '!canPlay()',
    '[attr.data-outcome]': 'outcome()',
    '[style.--rx.deg]': 'rx()',
    '[style.--ry.deg]': 'ry()',
  },
})
export class Board {
  readonly board = input.required<Mark[]>();
  readonly line = input<readonly [number, number, number] | null>(null);
  readonly lastMove = input<number | null>(null);
  readonly thinking = input(false);
  readonly canPlay = input(false);
  readonly outcome = input<Outcome | null>(null);
  readonly round = input(0);
  readonly cellClick = output<number>();
  readonly cellHover = output<number>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  readonly rx = signal(0);
  readonly ry = signal(0);
  readonly ripples = signal<Ripple[]>([]);
  private rippleId = 0;

  /** Coordenadas del trazo ganador (viewBox 300x300). */
  readonly linePath = computed(() => {
    const l = this.line();
    if (!l) return null;
    const c = (i: number) => ({ x: 50 + (i % 3) * 100, y: 50 + Math.floor(i / 3) * 100 });
    const a = c(l[0]);
    const b = c(l[2]);
    const dx = (b.x - a.x) * 0.18;
    const dy = (b.y - a.y) * 0.18;
    return `M ${a.x - dx} ${a.y - dy} L ${b.x + dx} ${b.y + dy}`;
  });

  readonly lineColor = computed(() => {
    const l = this.line();
    if (!l) return '';
    return this.board()[l[0]] === 'X' ? 'var(--x-color)' : 'var(--o-color)';
  });

  inLine(i: number): boolean {
    return !!this.line()?.includes(i);
  }

  click(i: number, e: MouseEvent): void {
    const r = this.host.nativeElement.getBoundingClientRect();
    const id = ++this.rippleId;
    this.ripples.update((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => this.ripples.update((rs) => rs.filter((x) => x.id !== id)), 700);
    this.cellClick.emit(i);
  }

  rippleStyle(rp: Ripple) {
    return { left: `${rp.x}px`, top: `${rp.y}px` };
  }

  tilt(e: PointerEvent): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = this.host.nativeElement.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    this.ry.set(px * 14);
    this.rx.set(-py * 14);
  }

  untilt(): void {
    this.rx.set(0);
    this.ry.set(0);
  }

  /** Teclado: 1-9 (o numpad, con la disposición del teclado numérico). */
  key(e: KeyboardEvent): void {
    if (e.target instanceof HTMLInputElement || e.ctrlKey || e.metaKey || e.altKey) return;
    const numpad: Record<string, number> = {
      Numpad7: 0, Numpad8: 1, Numpad9: 2, Numpad4: 3, Numpad5: 4, Numpad6: 5, Numpad1: 6, Numpad2: 7, Numpad3: 8,
    };
    const idx = e.code in numpad ? numpad[e.code] : /^[1-9]$/.test(e.key) ? +e.key - 1 : -1;
    if (idx >= 0) this.cellClick.emit(idx);
  }
}
