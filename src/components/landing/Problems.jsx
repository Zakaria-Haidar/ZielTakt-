import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SearchX, Star, MessageCircleOff, UserX } from 'lucide-react';
import SectionDivider from './SectionDivider';
import { Arrow } from './icons';
import useLang from '@/i18n/useLang';

// The four problems a local business owner recognises: not found on Google,
// too few reviews, lost WhatsApp/phone enquiries, no job applicants.
const icons = [SearchX, Star, MessageCircleOff, UserX];

export default function Problems() {
  const { t, href } = useLang();
  const reduce = useReducedMotion();
  // "Signal lost -> back online": the cards start dim; one cyan scan line sweeps
  // across the grid when it enters view and lights each card as it passes.
  // Text is never hidden; reduced motion starts lit.
  const [scanned, setScanned] = useState(false);
  const lit = reduce || scanned;
  const items = t('problems.items', { returnObjects: true });

  return (
    <section id="probleme" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            viewport={{ once: true }}
            className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('problems.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em] max-w-3xl"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('problems.title')}
          </motion.h2>
        </div>

        <motion.div
          className="relative overflow-hidden -m-6 p-6"
          viewport={{ once: true, amount: 0.35 }}
          onViewportEnter={() => setScanned(true)}
        >
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-10 w-28 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgb(0 224 255 / 0.18) 70%, rgb(0 224 255 / 0.9) 98%, transparent)' }}
            initial={{ x: '-120%', opacity: 0 }}
            animate={scanned ? { x: ['-120%', '1400%'], opacity: [1, 1, 0] } : undefined}
            transition={{ duration: 1.6, ease: [0.45, 0, 0.2, 1], times: [0, 0.9, 1] }}
          />
        )}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass-strong rounded-2xl p-7 space-y-4 transition-[border-color,box-shadow] duration-700 ${
                  lit ? 'border-neon/25 shadow-[0_0_34px_-14px_rgb(0_224_255/0.45)] hover:border-neon/40' : 'hover:border-neon/20'
                }`}
                style={{ transitionDelay: lit && !reduce ? `${250 + i * 260}ms` : '0ms' }}
              >
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-700 ${
                    lit ? 'bg-neon/15 border-neon/40 shadow-[0_0_18px_rgb(0_224_255/0.45)]' : 'bg-white/[0.03] border-border'
                  }`}
                  style={{ transitionDelay: lit && !reduce ? `${250 + i * 260}ms` : '0ms' }}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-700 ${lit ? 'text-neon-ink' : 'text-datagrey'}`}
                    style={{ transitionDelay: lit && !reduce ? `${250 + i * 260}ms` : '0ms' }}
                  />
                </div>
                <h3 className="font-heading font-semibold text-titanium text-lg tracking-tight">{item.title}</h3>
                <p className="text-datagrey text-sm leading-relaxed" style={{ lineHeight: '1.6' }}>{item.text}</p>
              </motion.div>
            );
          })}
        </div>
        </motion.div>

        <motion.p
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 text-center text-datagrey text-sm"
        >
          {t('problems.footer')}{' '}
          <a href={href('services')} className="text-neon-ink hover:underline font-medium group inline-flex items-center gap-1">
            {t('problems.footerLink')} <Arrow />
          </a>
        </motion.p>
      </div>
    </section>
  );
}
