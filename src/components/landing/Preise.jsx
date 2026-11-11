import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionDivider from './SectionDivider';
import GlassButton from './GlassButton';
import useLang from '@/i18n/useLang';

// Prices are Latin text ("1.490 €", "CHF 670–890"): isolate them as left-to-right
// so the browser never reorders the digits/currency inside Arabic sentences.
const Num = ({ children, className = '' }) => (
  <bdi dir="ltr" className={className}>{children}</bdi>
);

export default function Preise() {
  const { t, href } = useLang();
  const packages = t('pricing.packages', { returnObjects: true });
  const automations = t('pricing.automations', { returnObjects: true });
  const vatOriginal = t('pricing.vatNoteOriginal');

  return (
    <section id="preise" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            viewport={{ once: true }}
            className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('pricing.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('pricing.title')}
          </motion.h2>
          <motion.p
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-datagrey text-lg max-w-2xl leading-relaxed"
          >
            {t('pricing.text')}
          </motion.p>
          <motion.div
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5"
          >
            <Check className="w-3.5 h-3.5 text-neon-ink" strokeWidth={2.5} />
            <span className="text-datagrey text-xs font-medium tracking-widest uppercase">
              {t('pricing.badge')}
            </span>
          </motion.div>
        </div>

        {/* ZielTakt Komplett: setup + monthly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-strong rounded-2xl p-6 md:p-8 space-y-6 relative transition-all duration-500 hover:border-neon/30 flex flex-col ${
                pkg.popular ? 'border-neon/40 glow-blue' : 'zt-card'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-widest uppercase text-on-neon bg-neon rounded-full px-3 py-1 whitespace-nowrap">
                  {t('pricing.recommended')}
                </span>
              )}
              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-titanium text-xl tracking-tight">
                  <bdi>ZielTakt {pkg.name}</bdi>
                </h3>
                <p className="text-datagrey text-sm leading-relaxed">{pkg.for}</p>
              </div>

              <div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <Num className="font-heading font-bold text-titanium text-4xl leading-none">{pkg.setup}</Num>
                  <span className="text-datagrey text-sm">{t('pricing.oneTime')}</span>
                </div>
                <div className="flex items-baseline gap-1.5 flex-wrap mt-3">
                  <span className="text-neon-ink font-heading font-bold text-xl">+</span>
                  <Num className="font-heading font-bold text-neon-ink text-2xl">{pkg.monthly}</Num>
                  <span className="text-datagrey text-sm">{t('pricing.perMonth')}</span>
                </div>
                {pkg.extra && (
                  <div className="text-titanium/80 text-sm font-medium mt-1">{pkg.extra}</div>
                )}
                <div className="text-datagrey text-sm mt-3">
                  {t('pricing.switzerland')}: <Num>{pkg.chfSetup}</Num> + <Num>{pkg.chfMonthly}</Num>{t('pricing.perMonth')}
                </div>
                <div className="text-datagrey text-sm mt-2">
                  {t('pricing.delivery')}: {pkg.time}
                </div>
                <div className="text-datagrey text-sm mt-1">{t('pricing.minTerm')}</div>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-border flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-datagrey text-sm">
                    <Check className="w-4 h-4 text-neon-ink flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-datagrey text-xs mt-6 max-w-3xl leading-relaxed"
        >
          {t('pricing.notes')}
        </motion.p>

        {/* Automation & AI add-ons */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <h3 className="font-heading font-semibold text-titanium text-lg tracking-tight mb-2">
            {t('pricing.automationTitle')}
          </h3>
          <p className="text-datagrey text-sm max-w-2xl leading-relaxed mb-8">
            {t('pricing.automationText')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automations.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ y: 15 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass zt-card rounded-2xl p-6 flex items-center justify-between gap-4 hover:border-neon/20 transition-all duration-500"
              >
                <div>
                  <div className="text-titanium text-sm font-semibold">{a.name}</div>
                  <div className="text-datagrey text-xs leading-relaxed mt-1">{a.note}</div>
                </div>
                <div className="text-end whitespace-nowrap">
                  <div className="font-heading font-bold text-neon-ink text-sm">{a.price}</div>
                  <div className="text-datagrey text-[11px] mt-0.5">{a.chf}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-datagrey text-xs mt-6 max-w-2xl leading-relaxed">
            {t('pricing.automationNote')}
          </p>
          <a href={href('design')} className="inline-flex items-center gap-2 mt-6 text-neon-ink text-sm font-medium hover:underline">
            {t('design.pricingLink')} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">→</span>
          </a>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 text-center space-y-4"
        >
          <GlassButton href={href('contact')}>
            {t('pricing.cta')}
          </GlassButton>
          <p className="text-datagrey text-xs">{t('pricing.vatNote')}</p>
          {vatOriginal && (
            <p className="text-datagrey/80 light:text-datagrey text-xs" lang="de" dir="ltr">{vatOriginal}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
