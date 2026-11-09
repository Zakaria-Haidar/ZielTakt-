import { motion } from 'framer-motion';
import { Globe, MapPin, CalendarCheck, BarChart3 } from 'lucide-react';
import SectionDivider from './SectionDivider';
import { Arrow } from './icons';
import useLang from '@/i18n/useLang';

// Icons stay in code; texts come from the translation files (same order).
const phaseIcons = [Globe, MapPin, CalendarCheck, BarChart3];

export default function Services() {
  const { t, href } = useLang();
  const phases = t('services.items', { returnObjects: true });

  return (
    <section id="services" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neon text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('services.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('services.titleStart')} <span className="text-gradient-blue">{t('services.titleHighlight')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-datagrey text-lg max-w-2xl leading-relaxed"
          >
            {t('services.text')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((phase, i) => {
            const Icon = phaseIcons[i % phaseIcons.length];
            return (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="glass-strong rounded-2xl p-7 space-y-5 hover:border-neon/20 transition-all duration-500 group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-neon/5 border border-neon/10 flex items-center justify-center group-hover:glow-blue transition-all duration-500">
                    <Icon className="w-6 h-6 text-neon" />
                  </div>
                  <span aria-hidden="true" className="font-heading font-bold text-titanium/15 text-3xl tracking-tight">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-heading font-semibold text-titanium text-xl tracking-tight">
                      {phase.title}
                    </h3>
                    <span className="text-neon text-sm font-medium">{phase.tagline}</span>
                  </div>
                  <p className="text-datagrey text-sm leading-relaxed" style={{ lineHeight: '1.6' }}>
                    {phase.description}
                  </p>
                </div>
                <ul className="space-y-2 pt-2 border-t border-border">
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <p className="text-datagrey text-sm">
            {t('services.unsure')}{' '}
            <a href={href('contact')} className="text-neon hover:underline font-medium group inline-flex items-center gap-1">
              {t('services.unsureLink')} <Arrow />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
