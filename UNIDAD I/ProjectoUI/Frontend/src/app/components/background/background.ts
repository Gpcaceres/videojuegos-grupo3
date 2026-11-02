import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  z: number; // profundidad (parallax)
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  kind: 'x' | 'o' | 'dot';
  hue: number;
}

/** Fondo animado: X y O flotando con parallax según el mouse. */
@Component({
  selector: 'app-background',
  template: `
    <div class="aurora a1"></div>
    <div class="aurora a2"></div>
    <div class="aurora a3"></div>
    <canvas #cv></canvas>
    <div class="grid"></div>
    <div class="vignette"></div>
  `,
  styleUrl: './background.scss',
})
export class Background implements AfterViewInit, OnDestroy {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('cv');
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private raf = 0;
  private mx = 0;
  private my = 0;
  private w = 0;
  private h = 0;
  private readonly reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  private readonly onResize = () => this.resize();
  private readonly onMove = (e: PointerEvent) => {
    this.mx = e.clientX / this.w - 0.5;
    this.my = e.clientY / this.h - 0.5;
  };

  ngAfterViewInit(): void {
    this.ctx = this.canvas().nativeElement.getContext('2d')!;
    this.resize();
    addEventListener('resize', this.onResize);
    addEventListener('pointermove', this.onMove);
    const loop = () => {
      this.draw();
      this.raf = requestAnimationFrame(loop);
    };
    loop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    removeEventListener('resize', this.onResize);
    removeEventListener('pointermove', this.onMove);
  }

  private resize(): void {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const c = this.canvas().nativeElement;
    this.w = innerWidth;
    this.h = innerHeight;
    c.width = this.w * dpr;
    c.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, (this.w * this.h) / 16000));
    this.particles = Array.from({ length: count }, () => this.spawn());
  }

  private spawn(): Particle {
    const r = Math.random();
    return {
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      z: 0.3 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.1 - Math.random() * 0.35,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.01,
      size: 6 + Math.random() * 16,
      kind: r < 0.35 ? 'x' : r < 0.7 ? 'o' : 'dot',
      hue: Math.random() < 0.5 ? 190 : 320,
    };
  }

  private draw(): void {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);
    const speed = this.reduced ? 0 : 1;
    for (const p of this.particles) {
      p.x += p.vx * p.z * speed;
      p.y += p.vy * p.z * speed;
      p.rot += p.vr * speed;
      if (p.y < -40) Object.assign(p, this.spawn(), { y: h + 30 });
      if (p.x < -40) p.x = w + 30;
      if (p.x > w + 40) p.x = -30;

      const px = p.x - this.mx * 40 * p.z;
      const py = p.y - this.my * 40 * p.z;
      const s = p.size * p.z * 0.6;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(p.rot);
      ctx.globalAlpha = 0.12 + 0.22 * (p.z / 1.5);
      ctx.strokeStyle = `hsl(${p.hue} 95% 65%)`;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 12;
      ctx.lineWidth = Math.max(1.5, s * 0.18);
      ctx.lineCap = 'round';
      ctx.beginPath();
      if (p.kind === 'x') {
        ctx.moveTo(-s, -s);
        ctx.lineTo(s, s);
        ctx.moveTo(s, -s);
        ctx.lineTo(-s, s);
        ctx.stroke();
      } else if (p.kind === 'o') {
        ctx.arc(0, 0, s, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }
}
