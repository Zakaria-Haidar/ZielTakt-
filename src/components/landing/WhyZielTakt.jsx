import { motion } from 'framer-motion';
import { Bot, Euro, Gauge, Languages, MessageCircle, ShieldCheck } from 'lucide-react';
import FloatingIcons from './FloatingIcons';
import SectionDivider from './SectionDivider';
import { WhatsAppIcon } from './icons';
import useLang from '@/i18n/useLang';

const ICONS = { languages: Languages, whatsapp: WhatsAppIcon, bot: Bot, euro: Euro };

// Floating cards beside the heading (lg positions; mobile shows only the first).
const FLOATERS = [
  { Icon: ShieldCheck, pos: 'lg:top-2 lg:end-[28%]', d: 6.2 },
  { Icon: Gauge, pos: 'lg:top-20 lg:end-[6%]', d: 7.6 },
  { Icon: MessageCircle, pos: 'lg:-top-4 lg:end-[52%]', d: 8.4 },
];

// Short "Warum ZielTakt": four differentiators, no competitor named.
export default function WhyZielTakt() {
  const { t } = useLang();
  const items = t('why.items', { returnObjects: true });

  return (
    <section id="warum" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />
        <div className="relative pt-16 pb-12 space-y-4">
          <FloatingIcons items={FLOATERS} />
          <span className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase">{t('why.eyebrow')}</span>
          <h2 className="font-heading font-bold text-titanium tracking-[-0.04em]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {t('why.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => {
            const Icon = ICONS[it.icon];
            return (
              <motion.div
                key={it.title}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="group glass zt-card rounded-2xl p-6 space-y-3 transition-[border-color,box-shadow] duration-500 hover:border-neon/35 hover:shadow-[0_18px_40px_-18px_rgb(0_224_255/0.45)]"
              >
                <span className="w-11 h-11 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center text-neon-ink transition-[background-color,box-shadow,transform,color] duration-500 group-hover:bg-neon group-hover:text-on-neon group-hover:shadow-[0_0_20px_rgb(0_224_255/0.6)] group-hover:-rotate-6 motion-reduce:group-hover:rotate-0">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="font-heading font-semibold text-titanium text-lg tracking-tight">{it.title}</h3>
                <p className="text-datagrey text-sm leading-relaxed">{it.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
