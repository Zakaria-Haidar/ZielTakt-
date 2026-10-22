import { motion } from 'framer-motion';
import SectionDivider from './SectionDivider';

// Referenzen / Case Studies. Jeder Eintrag kann eine Website sein,
// aber auch ein anderer Service (Automatisierung, AI-Assistent, ...) -
// deshalb "type" statt es auf Websites zu beschränken.
const projects = [
  {
    id: 'swissline',
    type: 'Website',
    tag: 'Konstanz · Fahrzeugaufbereitung',
    title: 'Auto Kosmetik Swissline',
    heading: 'Auto Kosmetik Swissline.',
    description:
      'Premium-Fahrzeugaufbereitung aus Konstanz. Eine moderne Website, die Handwerk und Liebe zum Detail zeigt, von der Markenwelt über das Design bis zur direkten Buchungsanfrage.',
    facts: ['Individuelles Design', 'Logo & Farbwelt', 'Mobile-First', 'Direkte Buchungsanfrage'],
    image: '/case-study-swissline.jpg',
    url: 'https://autokosmetik-swissline.de',
  },
  {
    id: 'abeer',
    type: 'Website',
    tag: 'Kosmetikstudio · Zweisprachig (DE/AR)',
    title: 'Abeer Beauty Center',
    heading: 'Abeer Beauty Center.',
    description:
      'Kosmetikstudio mit zweisprachiger Website (Deutsch & Arabisch). Klare Leistungsübersicht, funktionierendes Kontaktformular mit direkter Anfrage per E-Mail, ausgelegt für beide Sprachgruppen der Kundschaft.',
    facts: ['Zweisprachig DE/AR', 'Individuelles Design', 'Kontaktformular inkl. E-Mail-Zustellung', 'Mobile-First'],
    image: '/case-study-abeer.jpg',
    url: 'https://abeerbeauty-center.de',
  },
];

export default function Projekt() {
  return (
    <section id="projekt" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neon text-xs font-medium tracking-[0.3em] uppercase"
          >
            Projekte
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Aus der Praxis.
          </motion.h2>
        </div>

        <div className="space-y-20">
          {projects.map((project, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Screenshot */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden glass-strong ${
                    reverse ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} – Website-Screenshot`}
                    loading="lazy"
                    width="1280"
                    height="720"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent pointer-events-none" />
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`space-y-6 ${reverse ? 'lg:order-1' : ''}`}
                >
                  <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-datagrey text-xs tracking-widest uppercase">
                    {project.tag}
                  </span>
                  <h3 className="font-heading font-bold text-titanium text-2xl tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-datagrey text-lg leading-relaxed" style={{ lineHeight: '1.6' }}>
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {project.facts.map((f) => (
                      <li
                        key={f}
                        className="px-3 py-1.5 rounded-full text-xs font-medium glass text-titanium/80 border-border"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neon text-sm font-medium hover:underline group"
                  >
                    Website ansehen
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
