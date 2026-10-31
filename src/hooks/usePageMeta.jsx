import { useEffect } from 'react';
import { getHead, getRoute } from '@/routes';

function setTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (value == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key, name) => () => {
  const m = document.createElement('meta');
  m.setAttribute(key, name);
  return m;
};

// Applies the route's <head> data from routes.js. The prerendered HTML already
// contains the same tags; this keeps them right after client-side navigation.
export default function usePageMeta(path) {
  useEffect(() => {
    const head = getHead(getRoute(path));
    document.documentElement.lang = head.lang;
    document.title = head.title;
    setTag('meta[name="description"]', meta('name', 'description'), 'content', head.description);
    setTag('meta[name="robots"]', meta('name', 'robots'), 'content', head.robots);
    setTag('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    }, 'href', head.canonical);
    setTag('meta[property="og:title"]', meta('property', 'og:title'), 'content', head.ogTitle);
    setTag('meta[property="og:description"]', meta('property', 'og:description'), 'content', head.ogDescription);
    setTag('meta[property="og:url"]', meta('property', 'og:url'), 'content', head.ogUrl);
    setTag('meta[property="og:locale"]', meta('property', 'og:locale'), 'content', head.ogLocale);
    setTag('meta[name="twitter:title"]', meta('name', 'twitter:title'), 'content', head.ogTitle);
    setTag('meta[name="twitter:description"]', meta('name', 'twitter:description'), 'content', head.ogDescription);

    document.head.querySelectorAll('script[data-route-jsonld]').forEach((s) => s.remove());
    head.jsonLd.forEach((data) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-route-jsonld', '');
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    });
  }, [path]);
}
