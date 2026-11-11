import { motion } from 'framer-motion';

// Small floating icon cards for empty space next to a section heading. Same surface as
// the hero stat cards (glass-strong, rounded-2xl, shadow-lg) with an independent gentle
// bob per card. Transform-only motion, so the cards are always painted; reduced motion
// freezes them (MotionConfig in App). Decorative only.
//
// items: [{ Icon, pos, d }] — pos = Tailwind position classes (lg layout), d = loop seconds.
// On mobile only the first item is shown, small, beside the eyebrow line, so nothing
// overlaps the heading or gets clipped at 390px.
export default function FloatingIcons({ items }) {
  return (
    <div aria-hidden="true" className="absolute inset-y-10 end-0 w-12 lg:w-[38%] pointer-events-none">
      {items.map(({ Icon, pos, d }, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, i % 2 ? 7 : -7, 0], x: [0, i % 2 ? -3 : 3, 0] }}
          transition={{ y: { duration: d, repeat: Infinity, ease: 'easeInOut' }, x: { duration: d * 1.4, repeat: Infinity, ease: 'easeInOut' } }}
          className={`${i === 0 ? 'flex top-6 end-0' : 'hidden lg:flex'} ${pos} absolute w-10 h-10 lg:w-14 lg:h-14 rounded-2xl glass-strong shadow-lg shadow-black/30 light:shadow-ink/10 items-center justify-center`}
        >
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-neon-ink" strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}
