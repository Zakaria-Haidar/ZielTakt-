import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import { getRoute } from '@/routes'
// Self-hosted fonts: no request to Google's servers (GDPR-safe in Germany).
import '@fontsource-variable/inter'
import '@fontsource-variable/inter-tight'
import '@/index.css'

const container = document.getElementById('root')
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// Production pages are prerendered (scripts/prerender.js): attach to that HTML.
// Render from scratch when there is none (dev server) or when it belongs to a
// different route (e.g. a server answering an unknown URL with the homepage).
if (container.dataset.prerendered === getRoute(window.location.pathname).path) {
  ReactDOM.hydrateRoot(container, app)
} else {
  container.replaceChildren()
  ReactDOM.createRoot(container).render(app)
}
