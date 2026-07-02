import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

gsap.registerPlugin(ScrollTrigger);

const PAGE_TITLES: Record<string, string> = {
  '/': "CamerOssaka — Construction d'Excellence | BTP Cameroun",
  '/work': 'Nos Réalisations | CamerOssaka',
  '/services': 'Nos Services BTP | CamerOssaka',
  '/about': 'À Propos | CamerOssaka',
  '/equipe': 'Notre Équipe | CamerOssaka',
  '/contact': 'Contact | CamerOssaka',
  '/devis': 'Demande de Devis | CamerOssaka',
  '/soumettre': 'Demande de Devis | CamerOssaka',
  '/btp-connexion': 'BTP Connexion | CamerOssaka',
};

function ScrollAndTitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[pathname] ?? "CamerOssaka — Construction d'Excellence";
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="Chargement">
      <div className="w-10 h-10 border-4 border-[#1A2744]/20 border-t-[#1A2744] rounded-full animate-spin" />
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
            <Route path="work" element={<Work />} />
            <Route path="services" element={<Services />} />
            <Route path="about" element={<About />} />
            <Route path="equipe" element={<Team />} />
            <Route path="contact" element={<Contact />} />
            <Route path="devis" element={<Devis />} />
            <Route path="soumettre" element={<Devis />} />
            <Route path="Submit" element={<Devis />} />
            <Route path="btp-connexion" element={<BTPConnexion />} />
            <Route path="Register" element={<BTPConnexion />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
