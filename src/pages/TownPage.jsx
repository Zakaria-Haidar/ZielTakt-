import { motion } from 'framer-motion';
import { Check, Phone } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';
import { staedte } from '@/data/staedte';
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '@/lib/contact';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import FloatingContact from '../components/landing/FloatingContact';
import SectionDivider from '../components/landing/SectionDivider';
import GlassButton from '../components/landing/GlassButton';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6 },
};

const h2Class = 'font-heading font-bold text-titanium tracking-[-0.04em]';
const h2Style = { fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' };
const textClass = 'text-datagrey text-lg leading-relaxed';
const textStyle = { lineHeight: '1.6' };

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.222 1.36.19 1.871.115.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347M12.02 22.09h-.005a10.03 10.03 0 01-4.988-1.343l-.358-.213-3.71.973.99-3.617-.233-.372a9.99 9.99 0 01-1.531-5.316c0-5.52 4.494-10.014 10.019-10.014 2.674 0 5.187 1.043 7.078 2.934a9.94 9.94 0 012.93 7.083c-.003 5.52-4.496 10.014-10.02 10.014m8.53-18.55A11.94 11.94 0 0012.021 0C5.4 0 .001 5.4 0 12.037c0 2.122.554 4.194 1.606 6.02L0 24l6.096-1.601a11.97 11.97 0 005.925 1.51h.005c6.62 0 12.02-5.4 12.023-12.037a11.96 11.96 0 00-3.5-8.478" />
  </svg>
);

// One landing page per town; all copy comes verbatim from src/data/staedte.js.
export default function TownPage({ stadt }) {
  usePageMeta(`/${stadt.slug}`);

  const referenzen = stadt.referenzen.filter((r) => r.freigegeben === true);
  // Only towns from "umgebung" that have their own page.
  const nachbarn = stadt.umgebung
    .map((name) => staedte.find((s) => s.stadt === name))
    .filter(Boolean);

  return (
    <div className="bg-void min-h-screen pb-16 md:pb-0 overflow-x-clip">
      <Navbar />
      <main>
        {/* Intro: deliberately not animated, so h1 + text are visible in the raw HTML
            immediately (LCP, no-JS visitors). */}
        <section className="relative overflow-hidden">
          <div className="hidden md:block absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-neon/3 blur-[200px] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-16 space-y-8">
            <nav aria-label="Breadcrumb">
              <ol className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase">
                <li>
                  <a href="/" className="text-datagrey hover:text-neon transition-colors">Start</a>
                </li>
                <li aria-hidden="true" className="text-datagrey/60">/</li>
                <li aria-current="page" className="text-neon">Webdesign {stadt.stadt}</li>
              </ol>
            </nav>

            <h1
              className="font-heading font-bold text-titanium leading-[1.02] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)' }}
            >
              {stadt.h1}
            </h1>

            <div className="space-y-5 max-w-3xl">
              {stadt.intro.map((absatz) => (
                <p key={absatz} className="text-datagrey text-lg md:text-xl leading-relaxed" style={textStyle}>
                  {absatz}
                </p>
              ))}
            </div>
          </div>
        </section>

        {stadt.abschnitte.map((abschnitt) => (
          <section key={abschnitt.h2} className="relative py-10 md:py-14">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
              <SectionDivider />
              <div className="pt-10 md:pt-14 space-y-6">
                <motion.h2 {...reveal} className={h2Class} style={h2Style}>
                  {abschnitt.h2}
                </motion.h2>
                {abschnitt.absaetze?.map((absatz) => (
                  <motion.p key={absatz} {...reveal} className={textClass} style={textStyle}>
                    {absatz}
                  </motion.p>
                ))}
                {abschnitt.liste && (
                  <motion.ul {...reveal} className="glass-strong rounded-2xl p-6 md:p-8 space-y-4">
                    {abschnitt.liste.map((punkt) => (
                      <li key={punkt} className="flex items-start gap-3 text-titanium/90 text-base leading-relaxed">
                        <Check className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{punkt}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </div>
          </section>
        ))}

        {referenzen.length > 0 && (
          <section className="relative py-10 md:py-14">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
              <SectionDivider />
              <div className="pt-10 md:pt-14 space-y-8">
                <motion.h2 {...reveal} className={h2Class} style={h2Style}>
                  Referenzen
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {referenzen.map((ref) => (
                    <motion.div key={ref.name} {...reveal} className="glass-strong rounded-2xl p-6 md:p-8 space-y-4">
                      <span className="inline-flex glass rounded-full px-3 py-1 text-datagrey text-xs tracking-widest uppercase">
                        {ref.ort}
                      </span>
                      <h3 className="font-heading font-bold text-titanium text-xl tracking-tight">{ref.name}</h3>
                      <p className="text-datagrey text-base leading-relaxed" style={textStyle}>{ref.text}</p>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-neon text-sm font-medium hover:underline group"
                      >
                        Website ansehen
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="relative py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <SectionDivider />
            <div className="pt-10 md:pt-14 space-y-8">
              <motion.h2 {...reveal} className={h2Class} style={h2Style}>
                Häufige Fragen
              </motion.h2>
              <div className="space-y-4">
                {stadt.faq.map((item) => (
                  <motion.div
                    key={item.frage}
                    {...reveal}
                    className="glass-strong rounded-2xl p-6 border border-border hover:border-neon/20 transition-colors duration-500"
                  >
                    <h3 className="font-heading font-semibold text-titanium text-base md:text-lg tracking-tight">
                      {item.frage}
                    </h3>
                    <p className="mt-3 text-datagrey text-sm md:text-base leading-relaxed" style={textStyle}>
                      {item.antwort}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <motion.div
              {...reveal}
              className="relative overflow-hidden glass-strong rounded-3xl p-8 md:p-12 text-center space-y-8"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-neon/10 blur-3xl pointer-events-none" />
              <div className="relative space-y-3">
                <span className="text-neon text-xs font-medium tracking-[0.3em] uppercase">Kontakt</span>
                <h2 className={h2Class} style={h2Style}>Lassen Sie uns sprechen.</h2>
              </div>
              <div className="relative flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4">
                <GlassButton href={PHONE_HREF}>
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {PHONE_DISPLAY}
                  </span>
                </GlassButton>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 sm:px-8 py-4 text-sm sm:text-base font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
                  style={{ backgroundColor: '#25D366', boxShadow: '0 0 20px rgba(37,211,102,0.3)' }}
                >
                  <WhatsAppIcon />
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </div>
              <a href="/#contact" className="relative inline-flex items-center gap-2 text-neon text-sm font-medium hover:underline group">
                Zum Kontaktformular
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>
        </section>

        {nachbarn.length > 0 && (
          <section className="relative pt-4 pb-16 md:pb-24">
            <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-4">
              <h2 className="text-datagrey text-xs tracking-widest uppercase">Auch in der Umgebung</h2>
              <ul className="flex flex-wrap gap-2">
                {nachbarn.map((n) => (
                  <li key={n.slug}>
                    <a
                      href={`/${n.slug}`}
                      className="inline-flex px-4 py-2 rounded-full text-sm font-medium glass text-titanium/80 border-border hover:text-neon hover:border-neon/30 transition-colors duration-300"
                    >
                      {n.stadt}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
