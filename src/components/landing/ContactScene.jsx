import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color } from 'three';

// Desktop-only WebGL backdrop for the contact section: a slow liquid "aurora" of
// brand cyan built from layered value noise. Lazy-loaded by Contact.jsx when the
// section approaches the viewport; everyone else keeps the static CSS glow.

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform vec3 uColor;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uRes.x / uRes.y;
    float t = uTime * 0.06;
    vec2 q = vec2(fbm(uv * 1.5 + t), fbm(uv * 1.5 - t + 3.1));
    float f = fbm(uv * 1.2 + q * 1.8 + vec2(t * 0.5, -t));
    float glow = smoothstep(0.38, 0.85, f);
    glow += 0.35 * smoothstep(0.35, 0.0, distance(vUv, uMouse)) * f;
    // Fade out towards the edges so the canvas has no visible border.
    float fade = smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.65, vUv.y)
               * smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
    gl_FragColor = vec4(uColor, glow * 0.6 * fade);
  }
`;


function Aurora({ container }) {
  const material = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uRes: { value: { x: 1, y: 1 } },
    uMouse: { value: { x: 0.5, y: 0.5 } },
    uColor: { value: new Color('#00E0FF') },
  }), []);

  useEffect(() => {
    const onMove = (e) => {
      const r = container.current.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / r.width;
      mouse.current.y = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
    };
  }, [container, uniforms]);

  useFrame(({ size }, delta) => {
    const u = material.current.uniforms;
    u.uTime.value += delta;
    u.uRes.value.x = size.width;
    u.uRes.value.y = size.height;
    u.uMouse.value.x += (mouse.current.x - u.uMouse.value.x) * 0.05;
    u.uMouse.value.y += (mouse.current.y - u.uMouse.value.y) * 0.05;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ContactScene() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering while the section is out of view.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <Aurora container={ref} />
      </Canvas>
    </div>
  );
}
