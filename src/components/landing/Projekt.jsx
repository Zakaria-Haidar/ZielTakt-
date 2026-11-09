import { motion } from 'framer-motion';
import SectionDivider from './SectionDivider';
import { Arrow } from './icons';
import useLang from '@/i18n/useLang';

// Referenzen / Case Studies. Jeder Eintrag kann eine Website sein,
// aber auch ein anderer Service (Automatisierung, AI-Assistent, ...).
// Visuell: echtes Kundenlogo statt Screenshot, damit nichts veraltet, wenn
// ein Kunde sein Website-Design später ändert.
// Fixed data (logo, link, name) stays here; descriptions come from
// projects.items.<id> in the translation files.
const projects = [
  {
    id: 'swissline',
    title: 'Auto Kosmetik Swissline',
    logo: '/logo-swissline.webp',
    url: 'https://autokosmetik-swissline.de',
  },
  {
    id: 'abeer',
    title: 'Abeer Beauty Center',
    logo: '/logo-abeer.svg',
    url: 'https://abeerbeauty-center.de',
  },
];

export default function Projekt() {
  const { t } = useLang();

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
            {t('projects.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('projects.title')}
          </motion.h2>
        </div>

        <div className="space-y-20">
          {projects.map((project, idx) => {
            const reverse = idx % 2 === 1;
            const text = t(`projects.items.${project.id}`, { returnObjects: true });
            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Echtes Kundenlogo statt Screenshot */}
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden glass-strong flex items-center justify-center ${
                    reverse ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-neon/10 blur-3xl pointer-events-none" />
                  <img
                    src={project.logo}
                    alt={text.logoAlt}
                    loading="lazy"
                    className="relative w-2/3 max-w-[220px] h-auto object-contain"
                  />
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
                    {text.tag}
                  </span>
                  <h3 className="font-heading font-bold text-titanium text-2xl tracking-tight">
                    <bdi>{project.title}</bdi>
                  </h3>
                  <p className="text-datagrey text-lg leading-relaxed" style={{ lineHeight: '1.6' }}>
                    {text.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {text.facts.map((f) => (
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
                    {t('projects.viewSite')}
                    <Arrow />
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
