import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import SectionDivider from './SectionDivider';

// Provision in Prozent des Projektwerts.
const COMMISSION_PCT = '10';

export default function PartnerProgramm() {
  const handlePartner = () => {
    window.dispatchEvent(
      new CustomEvent('preset-contact', { detail: { subject: 'Partner-Anfrage' } })
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="partner" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass-strong rounded-3xl p-10 md:p-16 max-w-4xl mx-auto overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-neon/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-neon-dark/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5"
            >
              <Handshake className="w-3.5 h-3.5 text-neon" />
              <span className="text-datagrey text-xs font-medium tracking-widest uppercase">
                Partner-Programm
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-bold text-titanium tracking-[-0.03em]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              Kennst du ein Unternehmen, das eine neue Website braucht?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-datagrey text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ lineHeight: '1.6' }}
            >
              Fotografen, Druckereien, Berater oder einfach gute Kontakte: Wer uns einen Kunden
              vermittelt, der abschließt, bekommt {COMMISSION_PCT} % des Projektwerts als
              Dankeschön. Keine Vertragsbindung, keine Bedingungen im Kleingedruckten.
            </motion.p>

            <motion.button
              onClick={handlePartner}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="glass rounded-full px-8 py-4 text-neon font-medium border border-neon/20 hover:border-neon/60 hover:glow-blue-strong transition-all duration-500"
            >
              Partner werden
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}