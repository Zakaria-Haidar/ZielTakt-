import { motion } from 'framer-motion';
import SectionDivider from './SectionDivider';
import useLang from '@/i18n/useLang';

export default function Ablauf() {
  const { t } = useLang();
  const steps = t('process.steps', { returnObjects: true });

  return (
    <section id="ablauf" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neon text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('process.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('process.title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-7 space-y-4 hover:border-neon/20 transition-all duration-500 relative"
            >
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className="font-heading font-bold text-titanium/15 text-3xl tracking-tight">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-neon text-xs font-medium tracking-widest uppercase bg-neon/10 border border-neon/20 rounded-full px-3 py-1">
                  {step.time}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-titanium text-lg tracking-tight">
                {step.title}
              </h3>
              <p className="text-datagrey text-sm leading-relaxed" style={{ lineHeight: '1.6' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
