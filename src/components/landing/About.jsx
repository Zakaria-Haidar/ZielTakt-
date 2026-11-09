import { motion } from 'framer-motion';
import { Heart, Sparkles, Handshake, Zap } from 'lucide-react';
import SectionDivider from './SectionDivider';
import useLang from '@/i18n/useLang';

// Icons stay in code; their labels come from the translation files (same order).
const valueIcons = [Heart, Sparkles, Handshake, Zap];

export default function About() {
  const { t } = useLang();
  const stats = t('about.stats', { returnObjects: true });
  const values = t('about.values', { returnObjects: true });

  return (
    <section id="about" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neon text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('about.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                  <div className="font-heading font-bold text-2xl text-neon">{s.value}</div>
                  <div className="text-datagrey text-xs tracking-widest uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((item, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div
                  key={item.label}
                  className="glass-strong rounded-2xl p-6 space-y-3 hover:border-neon/20 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-xl bg-neon/5 border border-neon/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-neon" />
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
