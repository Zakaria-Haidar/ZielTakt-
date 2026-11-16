import { useEffect, useRef } from 'react';

// Canvas-2D version of the WebGL particle field in HeroScene.jsx (same wave formula,
// same camera). Used on phones and wherever WebGL is unavailable: no three.js chunk,
// no GPU context, works in every browser. Renders at max 30 fps, pauses off-screen
// and in background tabs. Reduced motion: one still frame (particles stay visible).

const VARIANTS = {
  hero: {
    phone: { cols: 36, rows: 50, width: 12, height: 13 },
    wide: { cols: 80, rows: 40, width: 26, height: 13 },
    rotation: -0.9, opacity: 1, size: 1.4,
    mask: '[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]',
  },
  section: {
    phone: { cols: 34, rows: 34, width: 12, height: 12 },
    wide: { cols: 70, rows: 32, width: 26, height: 12 },
    rotation: -1.15, opacity: 0.6, size: 1.2,
    mask: '[mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]',
  },
};

const CAM_Z = 8;
const FOV = (55 * Math.PI) / 180;
const smoothstep = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

// Soft round dot, drawn once and stamped with drawImage (much cheaper than arcs).
function makeSprite() {
  const s = document.createElement('canvas');
  s.width = s.height = 32;
  const g = s.getContext('2d');
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(0,224,255,1)');
  grad.addColorStop(0.5, 'rgba(0,224,255,0.5)');
  grad.addColorStop(1, 'rgba(0,224,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  return s;
}

export default function ParticleCanvas({ variant = 'hero' }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const v = VARIANTS[variant];

  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext('2d');
    if (!ctx) return undefined;
    const sprite = makeSprite();
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cosA = Math.cos(v.rotation);
    const sinA = Math.sin(v.rotation);

    let W = 0, H = 0, grid = null, pts = null, rands = null;
    const resize = () => {
      const r = wrap.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      el.width = Math.round(W * dpr); el.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const next = W < 768 ? v.phone : v.wide;
      if (next !== grid) {
        grid = next;
        const n = grid.cols * grid.rows;
        pts = new Float32Array(n * 2);
        rands = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          pts[i * 2] = ((i % grid.cols) / (grid.cols - 1) - 0.5) * grid.width;
          pts[i * 2 + 1] = (Math.floor(i / grid.cols) / (grid.rows - 1) - 0.5) * grid.height;
          rands[i] = Math.random();
        }
      }
    };

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const r = wrap.current.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * grid.width * 0.8;
      pointer.ty = -((e.clientY - r.top) / r.height - 0.5) * grid.height * 0.8;
    };

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const f = H / 2 / Math.tan(FOV / 2);
      const t = time * 0.15;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      for (let i = 0, n = rands.length; i < n; i++) {
        const x = pts[i * 2];
        const y = pts[i * 2 + 1];
        const rnd = rands[i];
        const w = Math.sin(x * 0.35 + t * 2) * Math.cos(y * 0.5 - t * 1.3)
          + 0.5 * Math.sin((x + y) * 0.8 + t * 3 + rnd * 6.2832);
        const z = w * 0.9 + smoothstep(3.5, 0, Math.hypot(x - pointer.x, y - pointer.y)) * 0.9;
        const yr = y * cosA - z * sinA;
        const d = CAM_Z - (y * sinA + z * cosA);
        if (d < 0.5) continue;
        const sx = W / 2 + (x * f) / d;
        const sy = H / 2 - (yr * f) / d;
        const s = (3 + rnd * 3) * (9 / d) * v.size;
        if (sx < -s || sx > W + s || sy < -s || sy > H + s) continue;
        ctx.globalAlpha = (0.3 + 0.6 * smoothstep(-1, 1.5, w)) * v.opacity;
        ctx.drawImage(sprite, sx - s / 2, sy - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, last = 0, running = false, visible = true;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 1000 / 30 - 2) return;
      time += Math.min((now - last) / 1000, 0.1);
      last = now;
      draw();
    };
    const sync = () => {
      const want = !still && visible && !document.hidden;
      if (want && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(tick); }
      if (!want && running) { running = false; cancelAnimationFrame(raf); }
    };

    resize();
    draw();
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(wrap.current);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
    io.observe(wrap.current);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pointermove', onMove, { passive: true });
    sync();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pointermove', onMove);
    };
  }, [v]);

  return (
    <div ref={wrap} aria-hidden="true" className={`absolute inset-0 pointer-events-none zt-fade-in ${v.mask}`}>
      <canvas ref={canvas} className="block w-full h-full" />
    </div>
  );
}
