import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import SectionDivider from './SectionDivider';
import SectionParticles from './SectionParticles';
import useLang from '@/i18n/useLang';

export default function Ablauf() {
  const { t } = useLang();
  const steps = t('process.steps', { returnObjects: true });
  const reduce = useReducedMotion();
  const railRef = useRef(null);
  // Scroll-scrubbed "circuit": the rail fills as the steps scroll through, and each
  // step lights up once the fill reaches it. Transform-only (scaleX / scaleY).
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 85%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [lit, setLit] = useState(0);
  useMotionValueEvent(fill, 'change', (v) => {
    const n = Math.min(steps.length, Math.floor(v * steps.length + 0.25));
    if (n !== lit) setLit(n);
  });
  const isLit = (i) => reduce || i < lit;

  return (
    <section id="ablauf" className="relative bg-void py-16 md:py-24">
      <SectionParticles />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            viewport={{ once: true }}
            className="text-neon-ink text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('process.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('process.title')}
          </motion.h2>
        </div>

        <div ref={railRef} className="relative ps-8 md:ps-0 lg:pt-10">
        {/* Rail: vertical on phones, horizontal on desktop (2-col tablet: nodes only) */}
        <div aria-hidden="true" className="md:hidden absolute start-3 top-0 bottom-0 w-px bg-border">
          <motion.div
            className="absolute inset-0 origin-top bg-gradient-to-b from-neon-dark to-neon shadow-[0_0_10px_rgb(0_224_255/0.6)]"
            style={{ scaleY: reduce ? 1 : fill }}
          />
        </div>
        <div aria-hidden="true" className="hidden lg:block absolute inset-x-0 top-3 h-px bg-border">
          <motion.div
            className="absolute inset-0 origin-left rtl:origin-right bg-gradient-to-r rtl:bg-gradient-to-l from-neon-dark to-neon shadow-[0_0_10px_rgb(0_224_255/0.6)]"
            style={{ scaleX: reduce ? 1 : fill }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-strong rounded-2xl p-7 space-y-4 transition-[border-color,box-shadow] duration-500 relative ${
                isLit(i) ? 'border-neon/30 shadow-[0_0_36px_-14px_rgb(0_224_255/0.45)]' : 'hover:border-neon/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className={`font-heading font-bold text-3xl tracking-tight transition-colors duration-500 ${isLit(i) ? 'text-neon-ink' : 'text-datagrey/50'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-neon-ink text-xs font-medium tracking-widest uppercase bg-neon/10 border border-neon/20 rounded-full px-3 py-1">
                  {step.time}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-titanium text-lg tracking-tight">
                {step.title}
              </h3>
              <p className="text-datagrey text-sm leading-relaxed" style={{ lineHeight: '1.6' }}>
                {step.desc}
              </p>
              {/* Rail node for this step */}
              <span
                aria-hidden="true"
                className={`md:hidden lg:block absolute max-lg:-start-[25px] max-lg:top-9 lg:-top-[33px] lg:start-7 w-[9px] h-[9px] rounded-full !m-0 transition-[background-color,box-shadow] duration-500 ${
                  isLit(i) ? 'bg-neon shadow-[0_0_12px_rgb(0_224_255/0.9)]' : 'bg-border'
                }`}
              />
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
