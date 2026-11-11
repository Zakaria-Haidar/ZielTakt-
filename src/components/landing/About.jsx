import { motion } from 'framer-motion';
import { Heart, Sparkles, Handshake, Zap, CircleCheck, TrendingUp, Globe, Gauge } from 'lucide-react';
import SectionDivider from './SectionDivider';
import useLang from '@/i18n/useLang';

// Icons stay in code; their labels come from the translation files (same order).
const valueIcons = [Heart, Sparkles, Handshake, Zap];

// Decorative floating icons in the empty space beside the heading (lg+ only).
// Each drifts on its own loop; reduced motion freezes them (MotionConfig in App).
const floaters = [
  { Icon: CircleCheck, pos: 'top-6 end-[30%]', y: [0, -10, 0], x: [0, 4, 0], d: 6.5 },
  { Icon: TrendingUp, pos: 'top-24 end-[8%]', y: [0, 8, 0], x: [0, -6, 0], d: 8 },
  { Icon: Globe, pos: 'bottom-6 end-[24%]', y: [0, -7, 0], x: [0, -4, 0], d: 7.2 },
  { Icon: Gauge, pos: 'top-2 end-0', y: [0, 9, 0], x: [0, 3, 0], d: 9 },
];

export default function About() {
  const { t } = useLang();
  const stats = t('about.stats', { returnObjects: true });
  const values = t('about.values', { returnObjects: true });

  return (
    <section id="about" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="relative pt-16 pb-20 space-y-4">
          <div aria-hidden="true" className="hidden lg:block absolute inset-y-10 end-0 w-[38%] pointer-events-none">
            {floaters.map(({ Icon, pos, y, x, d }, i) => (
              <motion.div
                key={i}
                viewport={{ once: true }}
                animate={{ y, x }}
                transition={{ y: { duration: d, repeat: Infinity, ease: 'easeInOut' }, x: { duration: d * 1.3, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.8, delay: i * 0.12 } }}
                className={`absolute ${pos} w-14 h-14 rounded-2xl glass zt-card flex items-center justify-center`}
              >
                <Icon className="w-6 h-6 text-neon-ink" strokeWidth={1.5} />
              </motion.div>
            ))}
          </div>
          <motion.span
            viewport={{ once: true }}
            className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('about.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em] max-w-3xl"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('about.titleStart')}{' '}
            <span className="text-gradient-blue">{t('about.titleHighlight')}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <p className="text-datagrey text-lg leading-relaxed" style={{ lineHeight: '1.7' }}>
              {t('about.p1')}
            </p>
            <p className="text-datagrey text-lg leading-relaxed" style={{ lineHeight: '1.7' }}>
              {t('about.p2')}
            </p>

            <div className="flex flex-wrap gap-12 pt-4 border-t border-border">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-heading font-bold text-2xl text-neon-ink">{s.value}</div>
                  <div className="text-datagrey text-xs tracking-widest uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {values.map((item, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div
                  key={item.label}
                  className="glass-strong zt-card rounded-2xl p-6 space-y-3 hover:border-neon/20 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-xl bg-neon/5 border border-neon/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-neon-ink" />
                  </div>
                  <div className="font-heading font-semibold text-titanium text-sm">{item.label}</div>
                  <div className="text-datagrey text-xs leading-relaxed">{item.sub}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
