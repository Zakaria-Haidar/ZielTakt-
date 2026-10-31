import { motion } from 'framer-motion';
import { staedte } from '@/data/staedte';

// Internal links from the homepage to the town landing pages.
export default function RegionLinks() {
  return (
    <section className="relative bg-void pb-8 md:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <h2 className="font-heading font-semibold text-titanium text-lg tracking-tight md:whitespace-nowrap">
            Für Betriebe in der Region
          </h2>
          <ul className="flex flex-wrap gap-2">
            {staedte.map((stadt) => (
              <li key={stadt.slug}>
                <a
                  href={`/${stadt.slug}`}
                  className="inline-flex px-4 py-2 rounded-full text-sm font-medium glass text-titanium/80 border-border hover:text-neon hover:border-neon/30 transition-colors duration-300"
                >
                  {stadt.stadt}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
