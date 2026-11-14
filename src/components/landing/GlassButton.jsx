import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const PULL = 0.28; // share of the cursor offset the button follows (magnetic hover)

// Magnetic hover: the button drifts toward the cursor and its label a little further.
// Only for a fine pointer with motion allowed; touch devices get no listeners.
function useMagnet() {
  const [on, setOn] = useState(false);
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 });
  const lx = useTransform(x, (v) => v * 0.35);
  const ly = useTransform(y, (v) => v * 0.35);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  if (!on) return { button: {}, label: undefined };
  return {
    button: {
      style: { x, y },
      onMouseMove: (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * PULL);
        y.set((e.clientY - r.top - r.height / 2) * PULL);
      },
      onMouseLeave: () => { x.set(0); y.set(0); },
    },
    label: { x: lx, y: ly },
  };
}

// `external` opens the link in a new tab (Cal.com, WhatsApp) with safe rel attributes.
export default function GlassButton({ children, href, variant = 'primary', className = '', type = 'button', disabled = false, external = false, onClick }) {
  const magnet = useMagnet();
  const base = "relative inline-flex items-center justify-center rounded-full font-medium transition-[border-color,box-shadow,color,background-color,opacity] duration-500 overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "glass px-8 py-4 text-neon-ink border border-neon/20 hover:border-neon/60 hover:glow-blue-strong text-base",
    secondary: "glass px-6 py-3 text-titanium border border-titanium/10 hover:border-neon/30 hover:text-neon-ink text-sm",
  };

  const content = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-neon/0 via-neon/5 to-neon/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <span className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl bg-neon/10" />
      <motion.span style={magnet.label} className="relative z-10 tracking-wide inline-flex items-center gap-2">{children}</motion.span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...magnet.button}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...(disabled ? {} : magnet.button)}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {content}
    </motion.button>
  );
}
