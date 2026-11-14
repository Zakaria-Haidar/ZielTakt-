import { useEffect, useRef, useState } from 'react';

// Soft neon glow that follows the cursor across the whole page. One fixed layer moved
// with transform (compositor only), updated at most once per frame and only while the
// pointer moves. Fine pointer + motion allowed only; touch devices render nothing.
export default function CursorAura() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!on) return undefined;
    const el = ref.current;
    let x = 0;
    let y = 0;
    let frame = 0;
    const paint = () => {
      frame = 0;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = '1';
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => { el.style.opacity = '0'; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [on]);

  if (!on) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[1] w-[600px] h-[600px] rounded-full pointer-events-none opacity-0 transition-opacity duration-500 will-change-transform"
      style={{ background: 'radial-gradient(closest-side, rgb(0 224 255 / 0.12), rgb(0 224 255 / 0.04) 50%, transparent)' }}
    />
  );
}
