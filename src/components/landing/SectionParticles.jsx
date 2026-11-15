import { lazy, Suspense, useEffect, useRef, useState } from 'react';

// Particle-field backdrop for content sections (same shader as the hero, quieter).
// Mounts the WebGL canvas only while the section is within ~400px of the viewport and
// unmounts it again when it is far away, so only a couple of WebGL contexts exist at
// once. Phones get the lite version. Reduced motion / no WebGL: renders nothing.
const SectionScene = lazy(() => import('./HeroScene').then((m) => ({ default: m.SectionScene })).catch(() => ({ default: () => null })));

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function SectionParticles() {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !hasWebGL()) return undefined;
    setLite(!window.matchMedia('(min-width: 768px)').matches);
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '400px 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {near && (
        <Suspense fallback={null}>
          <SectionScene lite={lite} />
        </Suspense>
      )}
    </div>
  );
}
