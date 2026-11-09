import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionDivider from './SectionDivider';
import useLang from '@/i18n/useLang';

const germanTowns = [
  { name: 'Konstanz', primary: true },
  { name: 'Friedrichshafen' },
  { name: 'Meersburg' },
  { name: 'Überlingen' },
  { name: 'Radolfzell' },
  { name: 'Singen' },
  { name: 'Stockach' },
];

const swissTowns = [
  { name: 'Kreuzlingen' },
  { name: 'Frauenfeld' },
  { name: 'Schaffhausen' },
  { name: 'St. Gallen' },
  { name: 'Winterthur' },
  { name: 'Zürich' },
];

// Real coordinates for every town on the map, plus a hand-tuned label
// position (dx/dy/anchor) so 13 close-together towns don't collide.
const MAP_TOWNS = [
  { name: 'Konstanz', lat: 47.6603, lon: 9.1758, primary: true, country: 'DE', dx: 0, dy: -16, anchor: 'middle' },
  { name: 'Friedrichshafen', lat: 47.6549, lon: 9.4795, country: 'DE', dx: -9, dy: -8, anchor: 'end' },
  { name: 'Meersburg', lat: 47.6939, lon: 9.2716, country: 'DE', dx: 8, dy: -6, anchor: 'start' },
  { name: 'Überlingen', lat: 47.7692, lon: 9.1669, country: 'DE', dx: 0, dy: -9, anchor: 'middle' },
  { name: 'Radolfzell', lat: 47.7392, lon: 8.9686, country: 'DE', dx: -8, dy: -5, anchor: 'end' },
  { name: 'Singen', lat: 47.7594, lon: 8.8389, country: 'DE', dx: 0, dy: -9, anchor: 'middle' },
  { name: 'Stockach', lat: 47.8508, lon: 9.0087, country: 'DE', dx: 0, dy: -9, anchor: 'middle' },
  { name: 'Kreuzlingen', lat: 47.6467, lon: 9.1747, country: 'CH', dx: 10, dy: 13, anchor: 'start' },
  { name: 'Frauenfeld', lat: 47.5584, lon: 8.8969, country: 'CH', dx: 0, dy: 15, anchor: 'middle' },
  { name: 'Schaffhausen', lat: 47.6979, lon: 8.6308, country: 'CH', dx: -8, dy: 4, anchor: 'end' },
  { name: 'St. Gallen', lat: 47.4245, lon: 9.3767, country: 'CH', dx: 9, dy: 4, anchor: 'start' },
  { name: 'Winterthur', lat: 47.5000, lon: 8.7241, country: 'CH', dx: -9, dy: 4, anchor: 'end' },
  { name: 'Zürich', lat: 47.3769, lon: 8.5417, country: 'CH', dx: 9, dy: -6, anchor: 'start' },
];

// Bounding box (with margin) covering all towns above, mapped onto a
// 400x300 viewBox. Simple linear projection — the region is small enough
// that this reads as accurate without needing a real map projection.
const REGION = { latMin: 47.32, latMax: 47.90, lonMin: 8.45, lonMax: 9.58 };
const VB_W = 400;
const VB_H = 300;
const PAD = 22;

function project(lat, lon) {
  const x = PAD + ((lon - REGION.lonMin) / (REGION.lonMax - REGION.lonMin)) * (VB_W - 2 * PAD);
  const y = PAD + (1 - (lat - REGION.latMin) / (REGION.latMax - REGION.latMin)) * (VB_H - 2 * PAD);
  return [x, y];
}

// Rough Lake Constance outline (Bodensee), simplified to a soft glowing
// shape — not survey-accurate, but geographically in the right place and
// orientation relative to the towns around it.
const LAKE_LATLON = [
  [47.80, 8.98], [47.83, 9.03], [47.80, 9.10], [47.76, 9.20],
  [47.71, 9.30], [47.68, 9.40], [47.655, 9.49], [47.60, 9.46],
  [47.615, 9.35], [47.635, 9.25], [47.645, 9.18], [47.63, 9.10],
  [47.655, 9.03], [47.68, 8.99], [47.75, 8.97], [47.80, 8.98],
];
const lakePath = LAKE_LATLON.map(([lat, lon], i) => {
  const [x, y] = project(lat, lon);
  return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
}).join(' ') + ' Z';

const konstanz = MAP_TOWNS.find((t) => t.primary);
const [kx, ky] = project(konstanz?.lat, konstanz?.lon);
const reachRings = [34, 58, 84];

export default function ServiceArea() {
  const { t } = useLang();
  const remote = t('area.remote');

  return (
    <section id="area" className="relative bg-void py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionDivider />

        <div className="pt-16 pb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neon text-xs font-medium tracking-[0.3em] uppercase"
          >
            {t('area.eyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-bold text-titanium tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {t('area.title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Regional map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Geographic map: always laid out left-to-right, also on the Arabic page. */}
            <div dir="ltr" className="relative glass-strong rounded-2xl overflow-hidden aspect-[4/3]">
              <div className="absolute inset-0 bg-charcoal">
                <svg
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  className="w-full h-full"
                  role="img"
                  aria-label={t('area.mapLabel')}
                >
                  <defs>
                    <pattern id="area-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00E0FF" strokeWidth="0.5" />
                    </pattern>
                    <filter id="lake-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3" />
                    </filter>
                    <radialGradient id="konstanz-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00E0FF" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#area-grid)" opacity="0.12" />

                  {/* Service-radius rings from Konstanz */}
                  {reachRings.map((r) => (
                    <motion.circle
                      key={r}
                      cx={kx}
                      cy={ky}
                      r={r}
                      fill="none"
                      stroke="#00E0FF"
                      strokeWidth="0.6"
                      initial={{ opacity: 0.08 }}
                      animate={{ opacity: [0.06, 0.22, 0.06] }}
                      transition={{ duration: 4, repeat: Infinity, delay: r * 0.02, ease: 'easeInOut' }}
                    />
                  ))}

                  {/* Lake Constance */}
                  <path d={lakePath} fill="#0A84B8" opacity="0.22" filter="url(#lake-glow)" />
                  <path d={lakePath} fill="none" stroke="#38C6EE" strokeWidth="0.7" opacity="0.35" />

                  {/* Region labels */}
                  <text x={PAD + 4} y={PAD + 10} fontSize="8" letterSpacing="1.5" fill="#5B6B7A" className="uppercase font-medium">
                    {t('area.germany')}
                  </text>
                  <text x={PAD + 4} y={VB_H - PAD + 2} fontSize="8" letterSpacing="1.5" fill="#5B6B7A" className="uppercase font-medium">
                    {t('area.switzerland')}
                  </text>

                  {/* Konstanz glow halo */}
                  <circle cx={kx} cy={ky} r="26" fill="url(#konstanz-glow)" />

                  {/* Town markers */}
                  {MAP_TOWNS.map((town) => {
                    const [x, y] = project(town.lat, town.lon);
                    const isCH = town.country === 'CH';
                    return (
                      <g key={town.name}>
                        {town.primary ? (
                          <>
                            <motion.circle
                              cx={x}
                              cy={y}
                              r="9"
                              fill="none"
                              stroke="#00E0FF"
                              strokeWidth="1"
                              initial={{ opacity: 0.5, scale: 0.9 }}
                              animate={{ opacity: [0.5, 0, 0.5], scale: [0.9, 1.8, 0.9] }}
                              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                              style={{ transformOrigin: `${x}px ${y}px` }}
                            />
                            <circle cx={x} cy={y} r="4.5" fill="#00E0FF" />
                          </>
                        ) : (
                          <circle
                            cx={x}
                            cy={y}
                            r="2.6"
                            fill={isCH ? '#7FE8FF' : '#00E0FF'}
                            opacity={isCH ? 0.75 : 0.9}
                          />
                        )}
                        <text
                          x={x + town.dx}
                          y={y + town.dy}
                          textAnchor={town.anchor}
                          fontSize={town.primary ? 11 : 8}
                          fontWeight={town.primary ? 600 : 500}
                          fill={town.primary ? '#00E0FF' : '#C7D2DA'}
                        >
                          {town.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-datagrey text-lg leading-relaxed" style={{ lineHeight: '1.6' }}>
              {t('area.text')}
            </p>
            {remote && (
              <p className="text-titanium/80 text-base leading-relaxed" style={{ lineHeight: '1.6' }}>
                {remote}
              </p>
            )}

            <div className="space-y-3">
              <span className="text-datagrey text-xs tracking-widest uppercase">{t('area.germany')}</span>
              <div className="flex flex-wrap gap-2">
                {germanTowns.map((town) => (
                  <span
                    key={town.name}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      town.primary
                        ? 'bg-neon/10 border-neon/30 text-neon'
                        : 'glass text-titanium/80 border-border'
                    }`}
                  >
                    {town.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-datagrey text-xs tracking-widest uppercase">{t('area.switzerland')}</span>
              <div className="flex flex-wrap gap-2">
                {swissTowns.map((town) => (
                  <span
                    key={town.name}
                    className="px-3 py-1.5 rounded-full text-xs font-medium glass text-titanium/80 border-border inline-flex items-center gap-1.5"
                  >
                    <span className="text-[9px] font-bold tracking-wider text-neon bg-neon/10 border border-neon/20 rounded px-1 py-0.5">
                      CH
                    </span>
                    {town.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4 pt-2">
              <div className="w-10 h-10 rounded-lg bg-neon/5 border border-neon/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-neon" />
              </div>
              <div>
                <div className="text-datagrey text-xs tracking-widest uppercase">{t('area.studio')}</div>
                <div className="text-titanium text-base font-medium mt-0.5">{t('area.studioPlace')}</div>
                <div className="text-datagrey text-sm mt-1">{t('area.studioNote')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}