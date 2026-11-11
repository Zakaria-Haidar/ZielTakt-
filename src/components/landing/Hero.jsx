import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import GlassButton from './GlassButton';
import { WhatsAppIcon } from './icons';
import useLang from '@/i18n/useLang';
import { CAL_URL, whatsappHref } from '@/lib/contact';

// Counts 0 → `to` once `start` is true. Renders the final value until then, so the
// prerendered HTML (and reduced-motion visitors) always show the real number.
function CountUp({ to, start }) {
  const [value, setValue] = useState(to);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start || reduce) return undefined;
    const controls = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [start, to, reduce]);
  return value;
}

// Desktop: cards float around the dashboard. Mobile: 2×2 grid below it.
const CARD_POS = [
  'lg:-top-24 lg:-start-10',
  'lg:-top-24 lg:end-8',
  'lg:-bottom-[6.5rem] lg:-start-4',
  'lg:-bottom-[6.5rem] lg:end-14',
];

function StatCards({ revealed }) {
  const { t } = useLang();
  const cards = t('hero.statCards', { returnObjects: true });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const start = revealed && inView;

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 mt-10 lg:mt-0 lg:block">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          animate={{ y: [0, i % 2 ? 6 : -6, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          className={`glass-strong rounded-2xl px-4 py-3 shadow-lg shadow-black/30 light:shadow-ink/10 lg:absolute lg:z-20 lg:min-w-[150px] ${CARD_POS[i]}`}
        >
          <div className="font-heading font-bold text-titanium text-2xl leading-none tabular-nums" dir="ltr">
            {c.prefix}<CountUp to={c.value} start={start} />{c.suffix}
          </div>
          <div className="text-titanium/90 text-xs font-medium mt-1.5">{c.label}</div>
          <div className={`text-[10px] mt-0.5 ${c.placeholder ? 'text-neon-ink' : 'text-datagrey'}`}>{c.note}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Desktop cinematic intro (GSAP + ScrollTrigger + CSS 3D) ─────────────────────
// Laptop geometry: lid 640×400 with a 12px bezel → screen 616×376 (≈16:10).
const LID_W = 640;
const LID_H = 400;
const BEZEL = 12;
const SCR_W = LID_W - 2 * BEZEL;
const SCR_H = LID_H - 2 * BEZEL;
const BASE_H = 18;
// The laptop group is centred in the viewport; the screen centre sits this far above
// the group centre (base below the lid), so the zoom shifts it down by this much.
const SCREEN_DY = (LID_H + BASE_H) / 2 - LID_H / 2;

// Screen preview: the hero's text column laid out at the real viewport width and
// scaled down to the screen, so at full zoom it lines up with the real hero and the
// crossfade is seamless. Decorative copy (no h1, no links).
function ScreenPreview({ vw }) {
  const { t } = useLang();
  return (
    <div
      style={{ width: vw, height: vw * (SCR_H / SCR_W), transform: `scale(${SCR_W / vw})`, transformOrigin: 'var(--zt-origin, top left)' }}
      className="rtl:[--zt-origin:top_right] absolute top-0 start-0"
    >
      <div className="max-w-7xl mx-auto px-12 pt-40 grid grid-cols-5 gap-8">
        <div className="col-span-3 space-y-8">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon" />
            <span className="text-datagrey text-xs font-medium tracking-widest uppercase">{t('hero.badge')}</span>
          </div>
          <div className="font-heading font-bold text-titanium leading-[0.95] tracking-[-0.04em]" style={{ fontSize: '5rem' }}>
            {t('hero.titleStart')} <span className="text-gradient-blue">{t('hero.titleHighlight')}</span>
          </div>
          <p className="text-datagrey text-xl max-w-lg" style={{ lineHeight: '1.6' }}>{t('hero.text')}</p>
          <div className="flex gap-4">
            <span className="rounded-full px-8 py-4 border border-neon/20 text-neon-ink light:bg-neon light:text-on-neon">{t('hero.ctaPrimary')}</span>
            <span className="self-center rounded-full px-6 py-3 border border-titanium/10 text-titanium text-sm">{t('hero.ctaWhatsApp')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Only shown on md+ without reduced motion (CSS in index.css keys off the `zt-intro`
// class that index.html sets before first paint). Never receives pointer events.
function LaptopOverlay({ refs, vw }) {
  return (
    <div ref={refs.overlay} aria-hidden="true" className="zt-laptop-overlay hidden absolute inset-x-0 top-0 h-screen z-20 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1400px' }}>
        {/* zoom layer (scroll) */}
        <div ref={refs.zoom} style={{ transformOrigin: `50% ${LID_H / 2}px` }} className="will-change-transform">
          {/* tilt layer (page-load entrance) */}
          <div ref={refs.tilt} style={{ transformStyle: 'preserve-3d' }}>
            <div style={{ width: LID_W, height: LID_H, padding: BEZEL }} className="relative rounded-2xl bg-[#0b0b0d] ring-1 ring-white/10 shadow-2xl shadow-black/50 light:shadow-ink/25">
              <div className="relative h-full w-full rounded-md overflow-hidden bg-void">
                <div className="absolute -top-1/4 end-0 w-2/3 h-2/3 rounded-full bg-neon/10 blur-3xl" />
                <div ref={refs.preview} className="absolute inset-0">{vw > 0 && <ScreenPreview vw={vw} />}</div>
              </div>
              <span className="absolute top-[5px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1d1d20]" />
            </div>
            <div ref={refs.base} style={{ height: BASE_H }} className="relative -mx-14 rounded-b-2xl bg-gradient-to-b from-[#3a3b3f] to-[#141416] light:from-[#d6cfc3] light:to-[#a9a195]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-1/2 rounded-b-lg bg-black/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t, href } = useLang();
  const stats = t('hero.stats', { returnObjects: true });
  const tiles = t('hero.dashboard.tiles', { returnObjects: true });

  const pinRef = useRef(null);
  const contentRef = useRef(null);
  const refs = { overlay: useRef(null), zoom: useRef(null), tilt: useRef(null), base: useRef(null), preview: useRef(null) };
  const [vw, setVw] = useState(0);
  // Stat cards count up once the hero is actually visible.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let mm;
    let cancelled = false;
    // Without the desktop intro (mobile, reduced motion) the hero is visible at once.
    if (!document.documentElement.classList.contains('zt-intro')) setRevealed(true);

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      mm = gsap.matchMedia();

      // Desktop only, motion allowed. Mobile keeps the CSS fade/slide-in (.hero-rise);
      // reduced motion gets the static hero instantly.
      mm.add('(min-width: 768px) and (max-height: 1600px) and (prefers-reduced-motion: no-preference)', () => {
        if (!document.documentElement.classList.contains('zt-intro')) return undefined;
        window.__ztIntro = true; // tells the no-JS failsafe in index.html we're running
        setVw(window.innerWidth);
        const { overlay, zoom, tilt, base, preview } = Object.fromEntries(Object.entries(refs).map(([k, r]) => [k, r.current]));
        const content = contentRef.current;
        gsap.set(overlay, { display: 'block' });

        // Phase 1 (load): angled → front-facing, decelerating, then stationary.
        const intro = gsap.fromTo(
          tilt,
          { rotateY: -38, rotateX: 22, rotateZ: -4, scale: 0.82, autoAlpha: 0 },
          { rotateY: 0, rotateX: 0, rotateZ: 0, scale: 1, autoAlpha: 1, duration: 1.4, ease: 'expo.out', delay: 0.15 },
        );

        // Phases 2 + 3 (scroll, scrubbed → reverses on scroll-up): pin the hero, zoom
        // the screen until it fills the viewport, then crossfade into the real content.
        const fill = () => Math.max(window.innerWidth / SCR_W, window.innerHeight / SCR_H);
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => { if (self.progress > 0.8) setRevealed(true); },
          },
        });
        tl.to(zoom, { scale: fill, y: SCREEN_DY, ease: 'power2.in', duration: 1 }, 0)
          .to(base, { autoAlpha: 0, y: 60, duration: 0.35 }, 0)
          // Text hand-over is sequential, never overlapping (no doubled text in either
          // scroll direction): 1.00–1.15 the screen preview text fades out while the real
          // content is still hidden; 1.15–1.35 the real content fades in while the now
          // text-free overlay (bezel + background) fades away.
          .to(preview, { autoAlpha: 0, duration: 0.15 }, 1)
          .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, immediateRender: true }, 1.15)
          // autoAlpha 0 → visibility:hidden: the laptop no longer intercepts anything
          .to(overlay, { autoAlpha: 0, duration: 0.2 }, 1.15);

        return () => {
          intro.kill();
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    });

    return () => {
      cancelled = true;
      mm?.revert(); // kills every timeline/ScrollTrigger above and removes inline styles
    };
  }, []);

  return (
    <div className="relative">
    <div ref={pinRef}>
    <LaptopOverlay refs={refs} vw={vw} />
    <section
      ref={contentRef}
      className="zt-hero-content relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      {/* Ambient background glow — desktop only. A large `filter: blur()`
          radius is expensive on mobile GPUs and, unlike our backdrop-filter
          and gem-spin rules, nothing was turning this off on phones. */}
      <div className="hidden md:block absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-neon/3 blur-[200px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-neon-dark/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          {/* Text column (start side: left in German, right in Arabic) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero text fades in with CSS (.hero-rise in index.css), not framer-motion:
                it starts as soon as the prerendered HTML arrives instead of waiting for
                the JS bundle, which keeps LCP fast on mobile. */}
            <div
              className="hero-rise inline-flex items-center gap-2 glass rounded-full px-4 py-1.5"
              style={{ '--rise': '10px', animationDelay: '0.05s' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-glow" />
              <span className="text-datagrey text-xs font-medium tracking-widest uppercase">
                {t('hero.badge')}
              </span>
            </div>

            {/* The headline is the LCP element: it slides in but never starts invisible
                (.hero-slide = transform only), so it counts as painted on the first frame. */}
            <h1
              className="hero-slide font-heading font-bold text-titanium leading-[0.95] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', '--rise': '30px', animationDelay: '0.1s' }}
            >
              {t('hero.titleStart')}{' '}
              <span className="text-gradient-blue">{t('hero.titleHighlight')}</span>
            </h1>

            <p
              className="hero-rise text-datagrey text-lg md:text-xl max-w-lg leading-relaxed"
              style={{ lineHeight: '1.6', animationDelay: '0.2s' }}
            >
              {t('hero.text')}
            </p>

            <div className="hero-rise flex flex-wrap gap-4" style={{ animationDelay: '0.3s' }}>
              {/* Books the Cal.com call once CAL_URL is set; until then scrolls to the contact form. */}
              <GlassButton href={CAL_URL ?? href('contact')} external={Boolean(CAL_URL)}>
                {t('hero.ctaPrimary')}
              </GlassButton>
              <GlassButton href={whatsappHref(t('whatsapp.message'))} variant="secondary" external>
                <WhatsAppIcon className="w-4 h-4" />
                {t('hero.ctaWhatsApp')}
              </GlassButton>
            </div>

            <p className="hero-rise text-datagrey text-xs tracking-wide" style={{ '--rise': '0px', animationDelay: '0.4s' }}>
              {t('hero.trustLine')}
            </p>

            {/* Trust elements */}
            <motion.div
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-3 gap-4 sm:flex sm:gap-12 pt-8 border-t border-border"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading font-bold text-lg sm:text-2xl text-titanium">{stat.value}</div>
                  <div className="text-datagrey text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right visual: compact modern dashboard */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
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
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon to-neon-dark flex items-center justify-center font-heading font-bold text-on-neon text-sm">
                      Z
                    </div>
                    <div>
                      <div className="text-titanium text-sm font-semibold leading-tight">{t('hero.dashboard.name')}</div>
                      <div className="text-datagrey text-[10px]">{t('hero.dashboard.sub')}</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] text-neon-ink bg-neon/10 border border-neon/20 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                    {t('hero.dashboard.active')}
                  </span>
                </div>

                {/* Main panels */}
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {/* Metric panel */}
                  <div className="glass rounded-xl p-4 flex flex-col justify-between">
                    <div className="text-datagrey text-[10px] tracking-widest uppercase">PageSpeed</div>
                    <div className="flex items-end gap-1" dir="ltr">
                      <span className="font-heading font-bold text-titanium text-4xl leading-none">98</span>
                      <span className="text-datagrey text-xs mb-1">/100</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neon/10 overflow-hidden">
                      <div className="h-full w-[98%] rounded-full bg-gradient-to-r rtl:bg-gradient-to-l from-neon-dark to-neon" />
                    </div>
                    <div className="text-neon-ink text-[10px] font-medium">{t('hero.dashboard.example')}</div>
                  </div>

                  {/* Chart panel */}
                  <div className="glass rounded-xl p-4 flex flex-col justify-between">
                    <div className="text-datagrey text-[10px] tracking-widest uppercase">{t('hero.dashboard.visibility')}</div>
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
                    <div className="text-neon-ink text-[10px] font-medium">{t('hero.dashboard.example')}</div>
                  </div>
                </div>

                {/* Bottom stat tiles */}
                <div className="grid grid-cols-3 gap-3">
                  {tiles.map((tile) => (
                    <div key={tile.l} className="glass rounded-xl p-3 text-center">
                      <div className="font-heading font-bold text-neon-ink text-lg leading-none"><bdi dir="ltr">{tile.v}</bdi></div>
                      <div className="text-datagrey text-[9px] tracking-wide mt-1">{tile.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -inset-8 bg-neon/10 rounded-3xl blur-lg md:blur-3xl -z-10" />
            <StatCards revealed={revealed} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
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
    </div>
    </div>
  );
}
