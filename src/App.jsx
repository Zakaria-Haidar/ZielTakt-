import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import { staedte } from './data/staedte';

const Impressum = lazy(() => import('./pages/Impressum'));
const Datenschutz = lazy(() => import('./pages/Datenschutz'));
const TownPage = lazy(() => import('./pages/TownPage'));

// The router itself is supplied by the entry: BrowserRouter in main.jsx,
// StaticRouter in entry-server.jsx (prerendering).
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          {staedte.map((stadt) => (
            <Route key={stadt.slug} path={`/${stadt.slug}`} element={<TownPage stadt={stadt} />} />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  )
}

export default App
