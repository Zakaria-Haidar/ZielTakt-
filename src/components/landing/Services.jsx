import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, CalendarCheck, BarChart3 } from 'lucide-react';
import SectionDivider from './SectionDivider';
import { Arrow } from './icons';
import useLang from '@/i18n/useLang';

// Icons stay in code; texts come from the translation files (same order).
const phaseIcons = [Globe, MapPin, CalendarCheck, BarChart3];

// Cursor spotlight on the cards — only for a fine pointer that can hover, so touch
// devices get no pointer listeners at all.
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return fine;
}

const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function Services() {
  const { t, href } = useLang();
  const phases = t('services.items', { returnObjects: true });
  const fine = useFinePointer();
  const cards = useRef([]);
  // The phase whose card crosses the middle of the viewport; drives the progress
  // rail (desktop) and the highlighted card (all sizes).
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)); }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    cards.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="pt-16 pb-20 space-y-4 lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <motion.span
            viewport={{ once: true }}
            className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('services.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('services.titleStart')} <span className="text-gradient-blue">{t('services.titleHighlight')}</span>
          </motion.h2>
          <motion.p
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-datagrey text-lg max-w-2xl leading-relaxed"
          >
            {t('services.text')}
          </motion.p>

          {/* Progress rail — desktop only, decorative (the h3s below carry the content) */}
          <ol aria-hidden="true" className="hidden lg:block relative mt-12 ps-6 space-y-5">
            <span className="absolute start-[3px] top-1 bottom-1 w-px bg-border" />
            <span
              className="absolute start-[3px] top-1 w-px bg-gradient-to-b from-neon-dark to-neon shadow-[0_0_12px_rgb(0_224_255/0.6)] transition-[height] duration-700 ease-out motion-reduce:transition-none"
              style={{ height: `calc(${((active + 1) / phases.length) * 100}% - 0.5rem)` }}
            />
            {phases.map((phase, i) => (
              <li key={phase.title} className="relative flex items-baseline gap-3">
                <span
                  className={`absolute -start-6 top-1.5 w-[7px] h-[7px] rounded-full transition-colors duration-500 ${
                    i <= active ? 'bg-neon shadow-[0_0_10px_rgb(0_224_255/0.8)]' : 'bg-border'
                  }`}
                />
                <span className={`font-heading font-bold text-sm tabular-nums transition-colors duration-500 ${i === active ? 'text-neon-ink' : 'text-datagrey/60'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`text-sm transition-colors duration-500 ${i === active ? 'text-titanium' : 'text-datagrey/70'}`}>
                  {phase.title}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:col-span-7 lg:pt-16">
          {phases.map((phase, i) => {
            const Icon = phaseIcons[i % phaseIcons.length];
            return (
              <motion.div
                key={phase.title}
                ref={(el) => { cards.current[i] = el; }}
                data-i={i}
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                onPointerMove={fine ? spotlight : undefined}
                className={`relative overflow-hidden glass-strong zt-card rounded-2xl p-6 md:p-8 space-y-5 transition-[border-color,box-shadow] duration-500 group ${
                  i === active ? 'border-neon/30 shadow-[0_0_40px_-12px_rgb(0_224_255/0.35)]' : 'hover:border-neon/20'
                }`}
              >
                {fine && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(0 224 255 / 0.09), transparent 60%)' }}
                  />
                )}
                <div className="relative flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-neon/5 border border-neon/10 flex items-center justify-center group-hover:glow-blue transition-all duration-500">
                    <Icon className="w-6 h-6 text-neon-ink" />
                  </div>
                  <span aria-hidden="true" className={`font-heading font-bold text-3xl tracking-tight transition-colors duration-500 ${i === active ? 'text-neon-ink' : 'text-datagrey/50'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="relative space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-heading font-semibold text-titanium text-xl tracking-tight">
                      {phase.title}
                    </h3>
                    <span className="text-neon-ink text-sm font-medium">{phase.tagline}</span>
                  </div>
                  <p className="text-datagrey text-sm leading-relaxed" style={{ lineHeight: '1.6' }}>
                    {phase.description}
                  </p>
                </div>
                <ul className="relative space-y-2 pt-2 border-t border-border">
                  {phase.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-datagrey text-xs">
                      <span className="w-1 h-1 rounded-full bg-neon flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        </div>

        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <p className="text-datagrey text-sm">
            {t('services.unsure')}{' '}
            <a href={href('contact')} className="text-neon-ink hover:underline font-medium group inline-flex items-center gap-1">
              {t('services.unsureLink')} <Arrow />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
