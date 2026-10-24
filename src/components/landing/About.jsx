import { motion } from 'framer-motion';
import { Heart, Sparkles, Handshake, Zap } from 'lucide-react';
import SectionDivider from './SectionDivider';

const stats = [
  { value: '100%', label: 'Maßarbeit' },
  { value: 'Bodensee', label: 'Region' },
  { value: '1:1', label: 'Betreuung' },
];

const values = [
  { icon: Heart, label: 'Persönlich', sub: 'Direkter Kontakt, kein Callcenter' },
  { icon: Sparkles, label: 'Echtes Design', sub: 'Handgemacht, kein Baukasten' },
  { icon: Handshake, label: 'Verlässlich', sub: 'Was wir versprechen, halten wir' },
  { icon: Zap, label: 'Schnell', sub: 'Von Idee bis Launch' },
];

export default function About() {
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
            Über uns
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em] max-w-3xl"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Ihr lokaler Partner für{' '}
            <span className="text-gradient-blue">digitales Handwerk.</span>
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
              ZielTakt ist ein digitales Growth-Studio aus Konstanz. Wir bauen für lokale Unternehmen mehr als nur Websites – wir verbinden Design, Sichtbarkeit und Automatisierung zu einem System, das darauf ausgelegt ist, neue Kunden zu gewinnen.
            </p>
            <p className="text-datagrey text-lg leading-relaxed" style={{ lineHeight: '1.7' }}>
              Für uns ist jede Website Maßarbeit: kein Baukasten, keine Standard-Vorlagen, sondern durchdachtes Design, das zu Ihrem Unternehmen und Ihren Kunden passt. Wir verstehen die Bodensee-Region, weil wir hier arbeiten und leben.
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
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((item) => (
              <div
                key={item.label}
                className="glass-strong rounded-2xl p-6 space-y-3 hover:border-neon/20 transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-xl bg-neon/5 border border-neon/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-neon" />
                </div>
                <div className="font-heading font-semibold text-titanium text-sm">{item.label}</div>
                <div className="text-datagrey text-xs leading-relaxed">{item.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}