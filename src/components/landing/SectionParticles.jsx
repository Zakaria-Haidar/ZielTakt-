import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import ParticleCanvas from './ParticleCanvas';
import hasWebGL from '@/lib/webgl';

// Particle-field backdrop for content sections (same wave as the hero, quieter).
// Desktops with WebGL get the shader version; phones, no-WebGL and reduced-motion
// visitors get the canvas-2D version (a still frame under reduced motion). Either way
// it only exists while the section is within ~400px of the viewport.
const SectionScene = lazy(() => import('./HeroScene')
  .then((m) => ({ default: m.SectionScene }))
  .catch(() => ({ default: () => <ParticleCanvas variant="section" /> })));
const SCENE_MQ = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

export default function SectionParticles() {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(window.matchMedia(SCENE_MQ).matches && hasWebGL());
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '400px 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      {near && (webgl ? (
        <Suspense fallback={null}>
          <SectionScene />
        </Suspense>
      ) : (
        <ParticleCanvas variant="section" />
      ))}
    </div>
  );
}
