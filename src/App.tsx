import { useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './i18n';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import './App.css';

const Work = lazy(() => import('./pages/Work'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));
const Devis = lazy(() => import('./pages/Devis'));
const BTPConnexion = lazy(() => import('./pages/BTPConnexion'));
const Legal = lazy(() => import('./pages/Legal'));

gsap.registerPlugin(ScrollTrigger);

const PAGE_TITLE_KEYS: Record<string, string> = {
  '/': 'pageTitles.home',
  '/projects': 'pageTitles.work',
  '/service': 'pageTitles.services',
  '/a-propos': 'pageTitles.about',
  '/equipe': 'pageTitles.team',
  '/contact': 'pageTitles.contact',
  '/devis': 'pageTitles.quote',
  '/soumettre': 'pageTitles.quote',
  '/btp-connexion': 'pageTitles.btpConnexion',
  '/informations-legales': 'pageTitles.legal',
};

function ScrollAndTitleManager() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = t(PAGE_TITLE_KEYS[pathname] ?? 'pageTitles.default');
    ScrollTrigger.refresh();
  }, [pathname, t, i18n.resolvedLanguage]);

  return null;
}

function PageLoader() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label={t('common.loading')}>
      <div className="w-10 h-10 border-4 border-black/20 border-t-black rounded-full animate-spin" />
    </div>
  );
}

function App() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollAndTitleManager />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Work />} />
            <Route path="work" element={<Navigate to="/projects" replace />} />
            <Route path="service" element={<Services />} />
            <Route path="services" element={<Navigate to="/service" replace />} />
            <Route path="a-propos" element={<About />} />
            <Route path="about" element={<Navigate to="/a-propos" replace />} />
            <Route path="equipe" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="devis" element={<Devis />} />
            <Route path="soumettre" element={<Devis />} />
            <Route path="Submit" element={<Devis />} />
            <Route path="btp-connexion" element={<BTPConnexion />} />
            <Route path="Register" element={<BTPConnexion />} />
            <Route path="informations-legales" element={<Legal />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
