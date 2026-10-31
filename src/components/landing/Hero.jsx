import { motion } from 'framer-motion';
import GlassButton from './GlassButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-void">
      {/* Ambient background glow — desktop only. A large `filter: blur()`
          radius is expensive on mobile GPUs and, unlike our backdrop-filter
          and gem-spin rules, nothing was turning this off on phones. */}
      <div className="hidden md:block absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-neon/3 blur-[200px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-neon-dark/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-glow" />
              <span className="text-datagrey text-xs font-medium tracking-widest uppercase">
                Growth Systems · Konstanz
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold text-titanium leading-[0.95] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Professionelle Websites für Unternehmen{' '}
              <span className="text-gradient-blue">am Bodensee.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-datagrey text-lg md:text-xl max-w-lg leading-relaxed"
              style={{ lineHeight: '1.6' }}
            >
              Wir gestalten moderne, vertrauenswürdige Websites und digitale Lösungen, damit lokale Kunden Ihr Unternehmen bei Google finden und sofort verstehen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <GlassButton href="#contact">
                Kostenloses Erstgespräch sichern
              </GlassButton>
              <GlassButton href="#services" variant="secondary">
                Leistungen ansehen
              </GlassButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="text-datagrey text-xs tracking-wide"
            >
              Unverbindlich · Persönliche Beratung · Lokal am Bodensee
            </motion.p>

                        {/* Trust elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-3 gap-4 sm:flex sm:gap-12 pt-8 border-t border-border"
            >
              {[
                { value: 'Lokal', label: 'Bodensee' },
                { value: 'Persönlich', label: 'Beratung' },
                { value: 'Schnell', label: 'Umsetzung' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading font-bold text-lg sm:text-2xl text-titanium">{stat.value}</div>
                  <div className="text-datagrey text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right visual: compact modern dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-strong">
              {/* Animated aurora blobs — lighter blur on mobile (blur-xl vs
                  blur-3xl), full strength from md: up. Still animates on
                  mobile, just cheaper to composite. */}
              <motion.div
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-neon/40 blur-xl md:blur-3xl"
              />
              <motion.div
                animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-[#0066FF]/40 blur-xl md:blur-3xl"
              />

              {/* Subtle grid overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#00E0FF" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)" />
              </svg>

              {/* Dashboard filling the frame */}
              <div className="absolute inset-0 p-4 md:p-5 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon to-neon-dark flex items-center justify-center font-heading font-bold text-void text-sm">
                      Z
                    </div>
                    <div>
                      <div className="text-titanium text-sm font-semibold leading-tight">ZielTakt Studio</div>
                      <div className="text-datagrey text-[10px]">Beispiel-Dashboard</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] text-neon bg-neon/10 border border-neon/20 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                    Aktiv
                  </span>
                </div>

                {/* Main panels */}
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {/* Metric panel */}
                  <div className="glass rounded-xl p-4 flex flex-col justify-between">
                    <div className="text-datagrey text-[10px] tracking-widest uppercase">PageSpeed</div>
                    <div className="flex items-end gap-1">
                      <span className="font-heading font-bold text-titanium text-4xl leading-none">98</span>
                      <span className="text-datagrey text-xs mb-1">/100</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neon/10 overflow-hidden">
                      <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-neon-dark to-neon" />
                    </div>
                    <div className="text-neon text-[10px] font-medium">Beispielansicht</div>
                  </div>

                  {/* Chart panel */}
                  <div className="glass rounded-xl p-4 flex flex-col justify-between">
                    <div className="text-datagrey text-[10px] tracking-widest uppercase">Sichtbarkeit</div>
                    <div className="flex items-end justify-between gap-1 flex-1 my-2">
                      {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.7, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-neon-dark/40 to-neon"
                        />
                      ))}
                    </div>
                    <div className="text-neon text-[10px] font-medium">Beispielansicht</div>
                  </div>
                </div>

                {/* Bottom stat tiles */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: 'SEO', l: 'Lokal optimiert' },
                    { v: 'A+', l: 'SSL-Sicherheit' },
                    { v: 'Schnell', l: 'auf dem Handy' },
                  ].map((t) => (
                    <div key={t.l} className="glass rounded-xl p-3 text-center">
                      <div className="font-heading font-bold text-neon text-lg leading-none">{t.v}</div>
                      <div className="text-datagrey text-[9px] tracking-wide mt-1">{t.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -inset-8 bg-neon/10 rounded-3xl blur-lg md:blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-8 bg-gradient-to-b from-neon/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}