import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import { getRoute } from '@/routes'
import i18n from '@/i18n'
import { DEFAULT_LANG, LANGUAGES, langFromPath, readStoredLang } from '@/i18n/languages'
// Self-hosted fonts: no request to Google's servers (GDPR-safe in Germany).
import '@fontsource-variable/inter'
import '@fontsource-variable/inter-tight'
// Arabic: only the Arabic-script subset, 3 weights. The browser downloads these
// files only on pages that actually use the font (the Arabic page), never on German ones.
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css'
import '@fontsource/ibm-plex-sans-arabic/arabic-700.css'
import '@/index.css'

const { pathname, search, hash } = window.location
const stored = readStoredLang()

// Remembered language: someone who switched to Arabic and later opens zieltakt.de
// lands on /ar. Only the bare home page redirects; a shared link to a German page
// (or a visitor without a stored choice, e.g. Google) is never redirected.
if (pathname === '/' && stored && stored !== DEFAULT_LANG) {
  window.location.replace(`${LANGUAGES[stored].path}${search}${hash}`)
} else {
  i18n.changeLanguage(langFromPath(pathname))

  const container = document.getElementById('root')
  const app = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  // Production pages are prerendered (scripts/prerender.js): attach to that HTML.
  // Render from scratch when there is none (dev server) or when it belongs to a
  // different route (e.g. a server answering an unknown URL with the homepage).
  if (container.dataset.prerendered === getRoute(pathname).path) {
    ReactDOM.hydrateRoot(container, app)
  } else {
    container.replaceChildren()
    ReactDOM.createRoot(container).render(app)
  }
}
