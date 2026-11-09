// SSR entry used only at build time by scripts/prerender.js.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from '@/App.jsx'
import i18n from '@/i18n'
import { langFromPath } from '@/i18n/languages'

export { routes, notFoundRoute, getHead } from '@/routes'

// "<!--$!-->" marks a Suspense boundary that rendered its fallback because a
// lazy() chunk was still loading.
const PENDING = '<!--$!-->'

// renderToString instead of renderToPipeableStream: React 18's stream writer can
// emit stray NUL bytes next to multi-byte characters (ä, ß, Arabic …). renderToString
// doesn't wait for lazy() chunks, so render repeatedly: each pass starts the
// pending imports, and once they resolve the next pass renders them inline.
export async function render(url) {
  // The URL decides the language: "/ar" -> Arabic, everything else -> German.
  await i18n.changeLanguage(langFromPath(url))
  const app = (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
  for (let pass = 0; pass < 10; pass++) {
    const html = renderToString(app)
    if (!html.includes(PENDING)) return html
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  throw new Error(`Prerender of ${url} still has unresolved lazy() chunks`)
}
