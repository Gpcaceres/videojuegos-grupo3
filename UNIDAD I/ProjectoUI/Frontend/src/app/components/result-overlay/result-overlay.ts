import { AfterViewInit, Component, ElementRef, OnDestroy, computed, input, output, viewChild } from '@angular/core';
import { Outcome } from '../../core/game.models';

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  color: string;
  life: number;
}

const COPY: Record<Outcome, { title: string; sub: string; emoji: string }> = {
  win: { title: '¡GANASTE!', sub: 'Le ganaste a la máquina. Eso no debería pasar…', emoji: '🏆' },
  loss: { title: 'PERDISTE', sub: 'La JCC no dejó escapar la jugada ganadora.', emoji: '🤖' },
  draw: { title: 'EMPATE', sub: 'Nadie cede. Así juega una IA imbatible.', emoji: '🤝' },
};

@Component({
  selector: 'app-result-overlay',
  template: `
    <canvas #cv></canvas>
    <div class="card" [attr.data-outcome]="outcome()">
      <div class="emoji">{{ copy().emoji }}</div>
      <h2>
        @for (ch of letters(); track $index) {
          <span [style.--d]="$index">{{ ch }}</span>
        }
      </h2>
      <p class="msg">MessageBox: <b>“{{ text() }}”</b></p>
      <p class="sub">{{ copy().sub }}</p>
      <div class="actions">
        <button type="button" class="primary" (click)="again.emit()">Jugar otra vez</button>
        <button type="button" class="ghost" (click)="dismiss.emit()">Ver tablero</button>
      </div>
    </div>
  `,
  styleUrl: './result-overlay.scss',
  host: { '[attr.data-outcome]': 'outcome()' },
})
export class ResultOverlay implements AfterViewInit, OnDestroy {
  readonly outcome = input.required<Outcome>();
  readonly text = input('');
  readonly again = output<void>();
  readonly dismiss = output<void>();

  readonly copy = computed(() => COPY[this.outcome()]);
  readonly letters = computed(() => [...this.copy().title]);

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('cv');
  private raf = 0;

  ngAfterViewInit(): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const o = this.outcome();
    if (o === 'win') this.burst(['#22d3ee', '#ff2e88', '#fbbf24', '#a78bfa', '#34d399'], 260, true);
    if (o === 'draw') this.burst(['#a78bfa', '#94a3b8', '#e2e8f0'], 90, false);
    if (o === 'loss') this.burst(['#ff2e88', '#7f1d1d', '#f43f5e'], 70, false);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
  }

  private burst(colors: string[], count: number, cannons: boolean): void {
    const c = this.canvas().nativeElement;
    const ctx = c.getContext('2d')!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const W = innerWidth;
    const H = innerHeight;
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pieces: Piece[] = Array.from({ length: count }, (_, i) => {
      const fromLeft = i % 2 === 0;
      const angle = cannons
        ? (fromLeft ? -Math.PI / 3 : (-2 * Math.PI) / 3) + (Math.random() - 0.5) * 0.6
        : Math.PI / 2 + (Math.random() - 0.5) * 0.4;
      const speed = cannons ? 12 + Math.random() * 12 : 1 + Math.random() * 3;
      return {
        x: cannons ? (fromLeft ? 0 : W) : Math.random() * W,
        y: cannons ? H * 0.85 : -20 - Math.random() * H * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        w: 6 + Math.random() * 8,
        h: 4 + Math.random() * 6,
        color: colors[i % colors.length],
        life: 1,
      };
    });

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = 0;
      for (const p of pieces) {
        p.vy += 0.28;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > H + 40) continue;
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, Math.cos(p.rot * 2));
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive) this.raf = requestAnimationFrame(tick);
    };
    tick();
  }
}
