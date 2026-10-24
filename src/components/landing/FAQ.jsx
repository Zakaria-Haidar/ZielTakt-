import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionDivider from './SectionDivider';

const faqs = [
  {
    q: 'Wie lange dauert eine Website?',
    a: 'Je nach Paket: Eine Starter Site ist nach 5–7 Tagen live, eine Growth Website nach 7–14 Werktagen, Growth Pro nach 2–4 Wochen. Die einzelnen Schritte stehen weiter oben im Ablauf-Abschnitt, vom Erstgespräch bis zum Launch.',
  },
  {
    q: 'Was kostet es wirklich am Ende?',
    a: 'Die Startpreise stehen bei Preisen: ab 1.590 € (Starter Site), ab 2.990 € (Growth Website), ab 4.990 € (Growth Pro). Automatisierungen sind separat buchbar, laufendes Wachstum beginnt ab 99 € pro Monat. Nach dem Erstgespräch erhalten Sie ein schriftliches Festangebot, in dem alle Kosten aufgeführt sind, auch eventuelle laufende Kosten für Tools oder Software.',
  },
  {
    q: 'Kann ich meine Website später selbst bearbeiten?',
    a: 'Ja. Wir bauen auf einem pflegeleichten System, damit Sie Texte, Bilder und Termine selbst ändern können. Wer es lieber abgeben möchte, wählt ein Betreuungspaket (ab 99 €/Monat), dann übernehmen wir die Pflege für Sie.',
  },
  {
    q: 'Was passiert nach dem Launch?',
    a: 'Nach dem Launch übergeben wir die Website, zeigen Ihnen die wichtigsten Funktionen und richten die Google-Sichtbarkeit ein (Google-Unternehmensprofil, Search Console). Danach läuft die Website weiter, wahlweise mit Betreuungspaket oder eigenständig.',
  },
  {
    q: 'Arbeitet ihr auch mit Kunden in der Schweiz?',
    a: 'Ja. Wir sitzen in Konstanz direkt an der Grenze und betreuen Kunden in der gesamten Region, auch auf der Schweizer Seite. Persönliche Termine nach Vereinbarung.',
  },
];

function FaqItem({ item, index, open, toggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="glass-strong rounded-2xl overflow-hidden border border-border hover:border-neon/20 transition-all duration-500"
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-heading font-semibold text-titanium text-base md:text-lg tracking-tight">
          {item.q}
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-neon/5 border border-neon/10 flex items-center justify-center">
            <Plus className="w-4 h-4 text-neon" />
          </div>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 text-datagrey text-sm md:text-base leading-relaxed" style={{ lineHeight: '1.6' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neon text-xs font-medium tracking-[0.3em] uppercase"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Häufige Fragen.
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}