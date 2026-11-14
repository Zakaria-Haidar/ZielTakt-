import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import useLang from '@/i18n/useLang';

// Phones only: shows a section's opening (eyebrow, heading, first lines) with a fade
// and a "show more" button, so the page isn't 30 screens long. The full content stays
// in the HTML (SEO) and in the accessibility tree; focusing anything inside, following
// a link to the section (menu, #hash) or tapping the button opens it. From 768px up the
// section renders normally (see .zt-fold in index.css).
export default function MobileFold({ id, children }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openIfTarget = () => { if (window.location.hash === `#${id}`) setOpen(true); };
    const onClick = (e) => {
      const a = e.target.closest?.('a[href*="#"]');
      if (a && a.hash === `#${id}`) setOpen(true);
    };
    openIfTarget();
    window.addEventListener('hashchange', openIfTarget);
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('hashchange', openIfTarget);
      document.removeEventListener('click', onClick, true);
    };
  }, [id]);

  return (
    <div className={`zt-fold relative${open ? ' is-open' : ''}`} onFocusCapture={() => setOpen(true)}>
      <div className="zt-fold-body">{children}</div>
      {!open && (
        <div className="md:hidden relative -mt-6 pb-10 flex justify-center bg-void">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded="false"
            className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-6 py-3 text-sm font-medium text-neon-ink shadow-[0_0_24px_-8px_rgb(0_224_255/0.5)] active:scale-95 transition-transform"
          >
            {t('common.showMore')}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
