import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionDivider from './SectionDivider';
import GlassButton from './GlassButton';

const packages = [
  {
    name: 'Starter Site',
    price: '1.590 €',
    chf: 'CHF 1.790',
    time: '5–7 Tage',
    features: ['1–3 Seiten', 'Individuelles Design', 'Kontaktformular & Click-to-Call', 'SSL & technische SEO-Basis'],
    popular: false,
  },
  {
    name: 'Growth Website',
    price: '2.990 €',
    chf: 'CHF 3.390',
    time: '7–14 Werktage',
    features: ['Bis 7 Seiten', 'Conversion-optimiertes Design', 'Booking- & Anfragefunktion', 'Google- & Local-SEO-Setup'],
    popular: true,
  },
  {
    name: 'Growth Pro',
    price: '4.990 €',
    chf: 'CHF 5.590',
    time: '2–4 Wochen',
    features: ['10+ Seiten möglich', 'Vollständige Conversion-Struktur', 'Branding & Visual Identity inklusive', 'Persönliche Betreuung & Priorität'],
    popular: false,
  },
];

const automations = [
  { name: 'Lead-Automatisierung', price: 'ab 250 €', chf: 'ab CHF 290', note: 'Neue Anfrage → sofortige Weiterleitung per WhatsApp/E-Mail' },
  { name: 'Bewertungs-Automatisierung', price: 'ab 300 €', chf: 'ab CHF 340', note: 'Nach Auftragsabschluss automatisch um eine Google-Bewertung bitten' },
  { name: 'Follow-up-Automatisierung', price: 'ab 400 €', chf: 'ab CHF 450', note: 'Keine Antwort? Automatische Erinnerung, damit keine Anfrage verloren geht' },
  { name: 'AI-Assistent', price: 'ab 750 €', chf: 'ab CHF 850', note: 'Beantwortet häufige Fragen automatisch & erfasst neue Leads' },
];

const care = [
  { name: 'Care', price: '99 €', chf: 'CHF 115', note: 'Updates, Backups & technischer Support', popular: false },
  { name: 'Growth', price: '299 €', chf: 'CHF 340', note: 'Care + SEO-Checks, Google-Business-Pflege & Reporting', popular: true },
  { name: 'Growth Pro', price: '599 €', chf: 'CHF 680', note: 'Local SEO, Tracking & strategische Weiterentwicklung', popular: false },
];

export default function Preise() {
  return (
    <section id="preise" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neon text-xs font-medium tracking-[0.3em] uppercase"
          >
            Preise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Klare Pakete. Ehrliche Preise.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-datagrey text-lg max-w-2xl leading-relaxed"
          >
            Jedes Projekt ist anders, hier sind unsere Startpreise. Für alles darüber hinaus: individuelles Angebot auf Anfrage.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5"
          >
            <Check className="w-3.5 h-3.5 text-neon" strokeWidth={2.5} />
            <span className="text-datagrey text-xs font-medium tracking-widest uppercase">
              Transparente Preise · Keine versteckten Kosten
            </span>
          </motion.div>
        </div>

        {/* Einmalige Pakete */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-strong rounded-2xl p-8 space-y-6 relative transition-all duration-500 hover:border-neon/30 ${
                pkg.popular ? 'border-neon/40 glow-blue' : ''
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-widest uppercase text-void bg-neon rounded-full px-3 py-1">
                  Beliebt
                </span>
              )}
              <h3 className="font-heading font-semibold text-titanium text-xl tracking-tight">
                {pkg.name}
              </h3>
              <div>
                <span className="text-datagrey text-sm">ab</span>
                <div className="font-heading font-bold text-titanium text-4xl leading-none mt-1">
                  {pkg.price}
                </div>
                <div className="text-datagrey text-sm mt-1.5">
                  Schweiz: ab {pkg.chf}
                </div>
                <div className="text-datagrey text-sm mt-2">{pkg.time} Umsetzung</div>
              </div>
              <ul className="space-y-2.5 pt-2 border-t border-border">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-datagrey text-sm">
                    <Check className="w-4 h-4 text-neon flex-shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-datagrey text-xs mt-6 max-w-2xl leading-relaxed"
        >
          Zeiträume gelten ab Freigabe aller Inhalte durch den Kunden. Bei optionalen Druckprodukten kommen 3–5 Werktage Versand hinzu.
        </motion.p>

        {/* Automation & AI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <h3 className="font-heading font-semibold text-titanium text-lg tracking-tight mb-2">
            Automation &amp; AI
          </h3>
          <p className="text-datagrey text-sm max-w-2xl leading-relaxed mb-8">
            Weniger manuelle Arbeit, mehr Zeit für Ihr Geschäft. Unabhängig buchbar, ob als Teil eines Website-Projekts oder später ergänzt.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automations.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-neon/20 transition-all duration-500"
              >
                <div>
                  <div className="text-titanium text-sm font-semibold">{a.name}</div>
                  <div className="text-datagrey text-xs leading-relaxed mt-1">{a.note}</div>
                </div>
                <div className="text-right whitespace-nowrap">
                  <div className="font-heading font-bold text-neon text-sm">{a.price}</div>
                  <div className="text-datagrey text-[11px] mt-0.5">{a.chf}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-datagrey text-xs mt-6 max-w-2xl leading-relaxed">
            Laufende Betriebskosten für eingesetzte Tools/Software separat, je nach Umfang. Weitere Automationen (CRM-Anbindung, komplette Workflow-Systeme) auf Anfrage.
          </p>
        </motion.div>

        {/* Laufende Betreuung */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <h3 className="font-heading font-semibold text-titanium text-lg tracking-tight mb-2">
            Laufendes Wachstum: monatlich
          </h3>
          <p className="text-datagrey text-sm max-w-2xl leading-relaxed mb-8">
            Nicht nur online sein, sondern sichtbar bleiben. Jederzeit kündbar, kein Vertrag über Monate hinaus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {care.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass rounded-2xl p-6 space-y-3 relative transition-all duration-500 hover:border-neon/20 ${
                  c.popular ? 'border-neon/40 glow-blue' : ''
                }`}
              >
                {c.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-widest uppercase text-void bg-neon rounded-full px-3 py-1">
                    Empfohlen
                  </span>
                )}
                <div className="text-datagrey text-xs tracking-widest uppercase">{c.name}</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-datagrey text-sm">ab</span>
                  <span className="font-heading font-bold text-neon text-2xl">{c.price}</span>
                  <span className="text-datagrey text-sm">/Monat</span>
                </div>
                <div className="text-datagrey text-xs">Schweiz: {c.chf}/Monat</div>
                <div className="text-datagrey text-sm leading-relaxed">{c.note}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Abschluss-CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 text-center space-y-4"
        >
          <GlassButton href="#contact">Individuelles Angebot auf Anfrage</GlassButton>
          <p className="text-datagrey text-xs">Alle Preise netto. Ggf. Umsatzsteuer (Kleinunternehmerregelung möglich).</p>
        </motion.div>
      </div>
    </section>
  );
}
