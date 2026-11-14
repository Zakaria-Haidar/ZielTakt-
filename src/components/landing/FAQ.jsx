import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionDivider from './SectionDivider';
import useLang from '@/i18n/useLang';

function FaqItem({ item, index, open, toggle }) {
  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`group relative glass-strong rounded-2xl overflow-hidden border transition-[border-color,box-shadow] duration-500 ${
        open
          ? 'border-neon/35 shadow-[0_0_44px_-14px_rgb(0_224_255/0.45),inset_0_1px_0_rgb(0_224_255/0.12)]'
          : 'border-border hover:border-neon/25 hover:shadow-[0_0_30px_-16px_rgb(0_224_255/0.4)]'
      }`}
    >
      {/* Accent bar: grows along the start edge while the item is open */}
      <span
        aria-hidden="true"
        className={`absolute start-0 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-neon via-neon/60 to-transparent transition-transform duration-500 ease-out motion-reduce:transition-none ${
          open ? 'scale-y-100' : 'scale-y-0'
        }`}
      />
      {/* Soft glow pooling behind the open answer */}
      <span
        aria-hidden="true"
        className={`absolute -top-24 start-1/4 w-72 h-48 rounded-full pointer-events-none transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'radial-gradient(closest-side, rgb(0 224 255 / 0.12), transparent)' }}
      />
      <button
        onClick={toggle}
        aria-expanded={open}
        className="relative w-full flex items-center justify-between gap-4 p-6 text-start"
      >
        <span className="flex items-baseline gap-4">
          <span aria-hidden="true" className={`font-heading font-bold text-xs tabular-nums transition-colors duration-500 ${open ? 'text-neon-ink' : 'text-datagrey/50 group-hover:text-datagrey'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-heading font-semibold text-titanium text-base md:text-lg tracking-tight">
            {item.q}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-500 ${
              open
                ? 'bg-neon border-neon shadow-[0_0_16px_rgb(0_224_255/0.6)]'
                : 'bg-neon/5 border-neon/10 group-hover:border-neon/30'
            }`}
          >
            <Plus className={`w-4 h-4 transition-colors duration-500 ${open ? 'text-on-neon' : 'text-neon-ink'}`} />
          </div>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.p
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 ps-14 pb-6 text-datagrey text-sm md:text-base leading-relaxed"
              style={{ lineHeight: '1.6' }}
            >
              {item.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Atmosphere: two soft neon glows drifting behind the accordion (same technique as
// the mobile hero smoke — transform-only CSS keyframes, no blur filter, no JS per
// frame). Paused while off-screen, static under reduced motion.
function FaqGlow() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="zt-smoke-wrap pointer-events-none" data-paused={paused || undefined}>
      <div className="zt-smoke zt-faq-glow-1" />
      <div className="zt-smoke zt-faq-glow-2" />
    </div>
  );
}

export default function FAQ() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = t('faq.items', { returnObjects: true });

  return (
    <section id="faq" className="relative bg-void py-16 md:py-24">
      <FaqGlow />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            viewport={{ once: true }}
            className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('faq.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('faq.title')}
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
