import { useEffect, useState } from 'react';
import Footer from '@/components/landing/Footer';
import usePageMeta from '@/hooks/usePageMeta';

export default function PageNotFound() {
  usePageMeta('/404');
  // dist/404.html is prerendered once and served for every unknown URL, so the
  // real path is only known in the browser. Read it after hydration to avoid a mismatch.
  const [pageName, setPageName] = useState('');
  useEffect(() => {
    setPageName(window.location.pathname.substring(1));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-void">
      <div className="flex-1 flex items-center justify-center p-6 py-24">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-7xl font-heading font-light text-neon">404</h1>
            <div className="h-0.5 w-16 bg-border mx-auto"></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-medium text-titanium">
              Seite nicht gefunden
            </h2>
            <p className="text-datagrey leading-relaxed">
              {pageName ? (
                <>Die Seite <span className="font-medium text-titanium">"{pageName}"</span> konnte nicht gefunden werden.</>
              ) : (
                'Die Seite konnte nicht gefunden werden.'
              )}
            </p>
          </div>
          <div className="pt-6">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-titanium glass rounded-full hover:glow-blue transition-all duration-500"
            >
              Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
