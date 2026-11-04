import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

const PAGE_TITLES: Record<string, string> = {
  '/': "Camer-Ossaka Connexion — Construction d'Excellence | BTP Cameroun",
  '/projects': 'Nos Réalisations | Camer-Ossaka Connexion',
  '/services': 'Nos Services BTP | Camer-Ossaka Connexion',
  '/a-propos': 'À Propos | Camer-Ossaka Connexion',
  '/equipe': 'Notre Équipe | Camer-Ossaka Connexion',
  '/contact': 'Contact | Camer-Ossaka Connexion',
  '/devis': 'Demande de Devis | Camer-Ossaka Connexion',
  '/soumettre': 'Demande de Devis | Camer-Ossaka Connexion',
  '/btp-connexion': 'BTP Connexion | Camer-Ossaka Connexion',
  '/informations-legales': 'Informations légales | Camer-Ossaka Connexion',
};

function ScrollAndTitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[pathname] ?? "Camer-Ossaka Connexion — Construction d'Excellence";
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="Chargement">
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
            <Route path="services" element={<Services />} />
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
