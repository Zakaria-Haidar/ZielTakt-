import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import SectionDivider from './SectionDivider';
import GlassButton from './GlassButton';
import useLang from '@/i18n/useLang';

// Provision in Prozent des Projektwerts.
const COMMISSION_PCT = '10';

export default function PartnerProgramm() {
  const { t } = useLang();

  const handlePartner = () => {
    window.dispatchEvent(
      new CustomEvent('preset-contact', { detail: { subject: t('partner.presetSubject') } })
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="partner" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass-strong rounded-3xl p-10 md:p-16 max-w-4xl mx-auto overflow-hidden"
        >
          {/* Light beam running around the border (ring mask; static on phones and for
              reduced motion — see .zt-beam in index.css) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              padding: 1,
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
            }}
          >
            <div className="zt-beam absolute left-1/2 top-1/2 w-[160%] aspect-square bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,rgb(0_224_255)_320deg,transparent_360deg)]" />
          </div>
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-neon/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-neon-dark/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-6">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5"
            >
              <Handshake className="w-3.5 h-3.5 text-neon-ink" />
              <span className="text-datagrey text-xs font-medium tracking-widest uppercase">
                {t('partner.badge')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-bold text-titanium tracking-[-0.03em]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              {t('partner.title')}
            </motion.h2>

            <motion.p
              initial={{ y: 15 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-datagrey text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ lineHeight: '1.6' }}
            >
              {t('partner.text', { pct: COMMISSION_PCT })}
            </motion.p>

            <GlassButton onClick={handlePartner}>
              {t('partner.cta')}
            </GlassButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
