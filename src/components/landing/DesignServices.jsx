import { motion } from 'framer-motion';
import { FileText, Heart, IdCard, Palette, ScrollText } from 'lucide-react';
import SectionDivider from './SectionDivider';
import { WhatsAppIcon } from './icons';
import useLang from '@/i18n/useLang';
import { whatsappHref } from '@/lib/contact';

const ICONS = { logo: Palette, card: IdCard, cv: ScrollText, heart: Heart, doc: FileText };

// "Weitere Design-Services": print & branding work beyond websites. No checkout:
// every card opens WhatsApp with the service pre-filled.
export default function DesignServices() {
  const { t } = useLang();
  const items = t('design.items', { returnObjects: true });

  return (
    <section id="design" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />
        <div className="pt-16 pb-12 space-y-4">
          <span className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase">{t('design.eyebrow')}</span>
          <h2 className="font-heading font-bold text-titanium tracking-[-0.04em]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {t('design.title')}
          </h2>
          <p className="text-datagrey text-lg max-w-2xl leading-relaxed">{t('design.text')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = ICONS[it.icon] ?? FileText;
            return (
              <motion.div
                key={it.name}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass zt-card rounded-2xl p-6 flex flex-col gap-4 hover:border-neon/30 transition-colors duration-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="w-11 h-11 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center text-neon-ink">
                    <Icon className="w-5 h-5" />
                  </span>
                  {/* Custom-quote services: no fixed starting price yet */}
                  <div className="text-neon-ink text-sm font-semibold whitespace-nowrap pt-2.5">{it.price}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-titanium text-lg tracking-tight">{it.name}</h3>
                  <p className="text-datagrey text-sm leading-relaxed mt-1.5">{it.text}</p>
                </div>
                <a
                  href={whatsappHref(t('design.waMessage', { service: it.name }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start rounded-full px-4 py-2.5 min-h-[44px] text-sm font-medium text-titanium border border-titanium/15 hover:border-neon/40 hover:text-neon-ink transition-colors duration-300"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  {t('design.cta')}
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="text-datagrey text-sm mt-8 max-w-3xl leading-relaxed">{t('design.printNote')}</p>
      </div>
    </section>
  );
}
