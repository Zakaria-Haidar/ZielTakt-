import { motion } from 'framer-motion';
import { SearchX, Star, MessageCircleOff, UserX } from 'lucide-react';
import SectionDivider from './SectionDivider';
import { Arrow } from './icons';
import useLang from '@/i18n/useLang';

// The four problems a local business owner recognises: not found on Google,
// too few reviews, lost WhatsApp/phone enquiries, no job applicants.
const icons = [SearchX, Star, MessageCircleOff, UserX];

export default function Problems() {
  const { t, href } = useLang();
  const items = t('problems.items', { returnObjects: true });

  return (
    <section id="probleme" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neon text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('problems.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em] max-w-3xl"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('problems.title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-strong rounded-2xl p-7 space-y-4 hover:border-neon/20 transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-xl bg-neon/5 border border-neon/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-neon" />
                </div>
                <h3 className="font-heading font-semibold text-titanium text-lg tracking-tight">{item.title}</h3>
                <p className="text-datagrey text-sm leading-relaxed" style={{ lineHeight: '1.6' }}>{item.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 text-center text-datagrey text-sm"
        >
          {t('problems.footer')}{' '}
          <a href={href('services')} className="text-neon hover:underline font-medium group inline-flex items-center gap-1">
            {t('problems.footerLink')} <Arrow />
          </a>
        </motion.p>
      </div>
    </section>
  );
}
