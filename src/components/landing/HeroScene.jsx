import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Color } from 'three';

// WebGL particle field: a slowly flowing grid of points driven by a custom shader.
// Default export = hero background (lazy-loaded by Hero.jsx after paint; "lite" on
// phones). Named export SectionScene = a quieter variant for other sections
// (mounted by SectionParticles.jsx while the section is near the viewport).
// Reduced motion and no-WebGL visitors never load this file.

const COLS = 110;
const ROWS = 55;
const WIDTH = 26;
const HEIGHT = 13;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform float uSize;
  attribute float aRand;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float t = uTime * 0.15;
    float w = sin(p.x * 0.35 + t * 2.0) * cos(p.y * 0.5 - t * 1.3)
            + 0.5 * sin((p.x + p.y) * 0.8 + t * 3.0 + aRand * 6.2832);
    p.z = w * 0.9;
    p.y += uScroll * 1.5;
    p.z += smoothstep(3.5, 0.0, distance(p.xy, uMouse)) * 0.9;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (3.0 + aRand * 3.0) * (9.0 / -mv.z) * uSize;
    vAlpha = 0.3 + 0.6 * smoothstep(-1.0, 1.5, w);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    gl_FragColor = vec4(uColor, vAlpha * uOpacity * smoothstep(0.5, 0.0, r));
  }
`;


// Phones ("lite"): a narrower portrait field with ~1.8k instead of ~6k particles.
const LITE = { cols: 36, rows: 50, width: 12, height: 13 };
const FULL = { cols: COLS, rows: ROWS, width: WIDTH, height: HEIGHT };

// Lite mode renders on demand at a capped frame rate (battery / mobile GPUs).
function FrameCap({ fps }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let id;
    let last = 0;
    const tick = (t) => {
      id = requestAnimationFrame(tick);
      if (t - last >= 1000 / fps - 2) { last = t; invalidate(); }
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [fps, invalidate]);
  return null;
}

// Sections: a wider, flatter carpet seen from a lower angle, dimmer than the hero.
const SECTION_FULL = { cols: 90, rows: 40, width: 26, height: 12 };
const SECTION_LITE = { cols: 34, rows: 34, width: 12, height: 12 };

function Field({ grid, container, rotation = -0.9, opacity = 1, size = 1, scroll = true }) {
  const { cols, rows, width, height } = grid;
  const material = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, rands } = useMemo(() => {
    const positions = new Float32Array(cols * rows * 3);
    const rands = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i++) {
      positions[i * 3] = ((i % cols) / (cols - 1) - 0.5) * width;
      positions[i * 3 + 1] = (Math.floor(i / cols) / (rows - 1) - 0.5) * height;
      rands[i] = Math.random();
    }
    return { positions, rands };
  }, [cols, rows, width, height]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: { x: 0, y: 0 } },
    uScroll: { value: 0 },
    uSize: { value: size },
    uOpacity: { value: opacity },
    uColor: { value: new Color('#00E0FF') },
  }), [size, opacity]);

  useEffect(() => {
    // Pointer position relative to the scene's own box (hero or section).
    const onMove = (e) => {
      const r = container.current.getBoundingClientRect();
      mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * width * 0.8;
      mouse.current.y = -((e.clientY - r.top) / r.height - 0.5) * height * 0.8;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
    };
  }, [container, width, height]);

  useFrame((_, delta) => {
    const u = material.current.uniforms;
    u.uTime.value += delta;
    // Ease toward the pointer / scroll position so the reaction stays soft.
    u.uMouse.value.x += (mouse.current.x - u.uMouse.value.x) * 0.04;
    u.uMouse.value.y += (mouse.current.y - u.uMouse.value.y) * 0.04;
    if (scroll) u.uScroll.value += (Math.min(window.scrollY / window.innerHeight, 2) - u.uScroll.value) * 0.05;
  });

  return (
    <points rotation={[rotation, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[rands, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

// Shared canvas shell: stops rendering while off-screen; lite = phones (on-demand
// rendering capped at 30 fps, dpr 1).
function Scene({ lite, mask, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`absolute inset-0 pointer-events-none zt-fade-in ${mask}`}>
      <Canvas
        frameloop={!visible ? 'never' : lite ? 'demand' : 'always'}
        dpr={lite ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        {lite && visible && <FrameCap fps={30} />}
        {children(ref)}
      </Canvas>
    </div>
  );
}

export default function HeroScene({ lite = false }) {
  return (
    <Scene lite={lite} mask="[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]">
      {(ref) => <Field container={ref} grid={lite ? LITE : FULL} size={lite ? 1.4 : 1} />}
    </Scene>
  );
}

// Quieter field for content sections: seen from a lower angle, dimmer, no scroll
// drift, faded out towards the section's top and bottom edges.
export function SectionScene({ lite = false }) {
  return (
    <Scene lite={lite} mask="[mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
      {(ref) => (
        <Field container={ref} grid={lite ? SECTION_LITE : SECTION_FULL} rotation={-1.15} opacity={lite ? 0.6 : 0.5} size={lite ? 1.2 : 0.9} scroll={false} />
      )}
    </Scene>
  );
}
