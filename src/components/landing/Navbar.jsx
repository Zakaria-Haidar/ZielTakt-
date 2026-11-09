import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import useLang from '@/i18n/useLang';
import { homePath } from '@/i18n/languages';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t, lang, href } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = t('nav.links', { returnObjects: true });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#070708]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <a href={homePath(lang)} className="flex items-center gap-2 group">
            <img src="/zieltakt-logo.png" alt="ZielTakt" width="1082" height="229" className="h-7 md:h-8 w-auto group-hover:opacity-90 transition-opacity duration-300" />
          </a>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={href(link.id)}
                className="text-datagrey text-sm font-medium tracking-wide hover:text-titanium transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 start-0 w-0 h-px bg-neon group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href={href('contact')}
              className="glass rounded-full px-6 py-2.5 text-sm font-medium text-neon hover:glow-blue transition-all duration-500 border border-neon/20 hover:border-neon/50"
            >
              {t('nav.cta')}
            </a>
          </div>

          {/* Mobile: language switch stays visible next to the menu button */}
          <div className="md:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <button
              onClick={() => setOpen(true)}
              aria-label={t('nav.openMenu')}
              className="text-titanium p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label={t('nav.closeMenu')}
              className="absolute top-6 end-6 text-titanium p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={href(link.id)}
                  onClick={() => setOpen(false)}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="font-heading font-bold text-3xl text-titanium hover:text-neon transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={href('contact')}
                onClick={() => setOpen(false)}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-4 glass rounded-full px-8 py-3 text-neon font-medium glow-blue"
              >
                {t('nav.cta')}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
