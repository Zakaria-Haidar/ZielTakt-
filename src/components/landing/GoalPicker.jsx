import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, CalendarCheck, Check, Globe, Search, Star, Users } from 'lucide-react';
import SectionDivider from './SectionDivider';
import GlassButton from './GlassButton';
import useLang from '@/i18n/useLang';
import { CAL_URL } from '@/lib/contact';

const ICONS = { globe: Globe, search: Search, calendar: CalendarCheck, star: Star, users: Users, bot: Bot };

// Prices are Latin text: keep them left-to-right inside Arabic sentences.
const Num = ({ children, className = '' }) => (
  <bdi dir="ltr" className={className}>{children}</bdi>
);

// "Was soll Ihre Website tun?" — pick a goal, see the matching package and price.
// Prices and package names come from pricing.* so they never drift from the Preise section.
export default function GoalPicker() {
  const { t, href } = useLang();
  const goals = t('goals.items', { returnObjects: true });
  const packages = t('pricing.packages', { returnObjects: true });
  const automations = t('pricing.automations', { returnObjects: true });
  const [active, setActive] = useState(0);

  const goal = goals[active];
  const pkg = goal.pkg != null ? packages[goal.pkg] : null;
  const addon = goal.addon != null ? automations[goal.addon] : null;

  return (
    <section id="ziele" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-12 space-y-4">
          <span className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase">{t('goals.eyebrow')}</span>
          <h2 className="font-heading font-bold text-titanium tracking-[-0.04em]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            {t('goals.title')}
          </h2>
          <p className="text-datagrey text-lg max-w-2xl leading-relaxed">{t('goals.text')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Goals */}
          <div role="group" aria-label={t('goals.eyebrow')} className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goals.map((g, i) => {
              const Icon = ICONS[g.icon] ?? Check;
              const on = i === active;
              return (
                <button
                  key={g.label}
                  type="button"
                  aria-pressed={on}
                  aria-controls="goal-result"
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 text-start rounded-2xl px-4 py-4 min-h-[64px] border transition-all duration-300 ${
                    on
                      ? 'glass-strong border-neon/60 glow-blue light:shadow-none'
                      : 'glass border-transparent hover:border-neon/30'
                  }`}
                >
                  <span className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center ${on ? 'bg-neon text-on-neon' : 'bg-neon/10 text-neon-ink'}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className={`text-sm font-semibold ${on ? 'text-titanium' : 'text-titanium/80'}`}>{g.label}</span>
                </button>
              );
            })}
          </div>

          {/* Result */}
          <div id="goal-result" aria-live="polite" className="lg:col-span-2 lg:sticky lg:top-28">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="glass-strong zt-card rounded-2xl p-6 md:p-8 border border-neon/30 space-y-5"
              >
                <div className="text-neon-ink text-[11px] font-semibold tracking-widest uppercase">{t('goals.resultLabel')}</div>
                <div>
                  <h3 className="font-heading font-semibold text-titanium text-2xl tracking-tight">
                    <bdi>{pkg ? `ZielTakt ${pkg.name}` : addon.name}</bdi>
                  </h3>
                  <p className="text-datagrey text-sm leading-relaxed mt-2">{goal.why}</p>
                </div>

                {pkg ? (
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <Num className="font-heading font-bold text-titanium text-4xl leading-none">{pkg.setup}</Num>
                      <span className="text-datagrey text-sm">{t('goals.oneTime')}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 flex-wrap mt-2">
                      <span className="text-neon-ink font-heading font-bold text-lg">+</span>
                      <Num className="font-heading font-bold text-neon-ink text-2xl">{pkg.monthly}</Num>
                      <span className="text-datagrey text-sm">{t('pricing.perMonth')}</span>
                    </div>
                    <div className="text-datagrey text-xs mt-2">{t('pricing.minTerm')} · {t('pricing.delivery')}: {pkg.time}</div>
                  </div>
                ) : (
                  <div>
                    <Num className="font-heading font-bold text-titanium text-4xl leading-none">{addon.price}</Num>
                    <div className="text-datagrey text-xs mt-2">{addon.note}</div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <GlassButton href={CAL_URL ?? href('contact')} external={Boolean(CAL_URL)} className="!px-6 !py-3 !text-sm">
                    {t('goals.cta')}
                  </GlassButton>
                  <a href="#preise" className="text-neon-ink text-sm font-medium hover:underline">{t('goals.seePrices')}</a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
