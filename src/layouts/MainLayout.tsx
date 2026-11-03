import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Facebook, Instagram, Youtube } from 'lucide-react';
import { languages } from '@/i18n';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function MainLayout() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.work'), href: '/projects' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.about'), href: '/a-propos' },
    { label: t('nav.team'), href: '/equipe' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md py-3 border-b border-[#E5E5E5] shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Barre de progression de lecture — tricolore Cameroun */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent">
          <div
            className="h-full transition-[width] duration-150 ease-out"
            style={{
              width: `${scrollProgress}%`,
              background: 'linear-gradient(90deg, #CE1126 0%, #CE1126 100%)',
            }}
          />
        </div>
        <div className="px-4 lg:px-[4vw] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div
              className={`rounded-md overflow-hidden ring-1 ring-[#E5E5E5] shadow-sm bg-white transition-all duration-500 ${
                isScrolled ? 'h-11 w-11' : 'h-14 w-14'
              }`}
            >
              <img 
                src="/images/ossaka_logo.jpeg" 
                alt="Camer-Ossaka Connexion Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>
            <span className="font-['Sora'] font-bold text-xl tracking-tight text-[#000000] leading-none">
              Camer-Ossaka Connexion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link text-base font-bold transition-colors duration-300 label-mono tracking-wide ${
                  location.pathname === link.href
                    ? 'nav-link-active text-[#CE1126]'
                    : 'text-[#000000] hover:text-[#CE1126]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#111111] hover:text-[#CE1126] transition-colors"
              >
                <img src={currentLang.flag} alt={currentLang.name} className="w-5 h-4 object-cover rounded-sm" />
                <span className="uppercase">{currentLang.code}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-sm shadow-xl border border-[#E5E5E5] overflow-hidden min-w-[150px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center gap-3 w-full px-5 py-3 text-left hover:bg-[#F5F5F5] transition-colors whitespace-nowrap ${
                        i18n.language === lang.code ? 'text-[#CE1126]' : 'text-[#111111]'
                      }`}
                    >
                      <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Devis */}
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-[#CE1126] hover:bg-[#A50E20] text-white text-sm font-semibold px-5 py-2.5 rounded-sm transition-all duration-300 hover:shadow-[0_6px_20px_rgba(206,17,38,0.30)] hover:-translate-y-0.5"
            >
              {t('nav.quote')}
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#111111]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}  
            aria-label={isMobileMenuOpen ? t('common.closeMenu') : t('common.openMenu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-navigation"
        role="navigation"
        aria-label={t('common.primaryNavigation')}
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
        className={`fixed inset-0 z-40 bg-[#FFFFFF] transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full px-6 py-20">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-bold font-['Sora'] ${
                  location.pathname === link.href
                    ? 'text-[#CE1126]'
                    : 'text-[#111111] hover:text-[#CE1126]'
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            {/* CTA Devis Mobile */}
            <Link
              to="/devis"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center bg-[#CE1126] hover:bg-[#A50E20] text-white font-semibold px-6 py-4 rounded-sm transition-colors"
            >
              {t('nav.quote')}
            </Link>

            {/* Language Selector Mobile */}
            <div className="flex gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-sm border ${
                    i18n.language === lang.code
                      ? 'border-[#CE1126] text-[#CE1126]'
                      : 'border-[#E5E5E5] text-[#111111]'
                  }`}
                >
                  <img src={lang.flag} alt={lang.name} className="w-6 h-5 object-cover rounded-sm" />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E5E5] py-16 relative">
        {/* Liseré rouge / noir */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#CE1126]" />
          <div className="flex-1 bg-[#111111]" />
        </div>
        <div className="px-4 lg:px-[4vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-6">
                <div className="h-14 w-14 rounded-md overflow-hidden ring-1 ring-[#E5E5E5] bg-white">
                  <img 
                    src="/images/ossaka_logo.jpeg" 
                    alt="Camer-Ossaka Connexion Logo"
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <span className="font-['Sora'] font-bold text-xl tracking-tight text-[#111111] leading-none">
                  Camer-Ossaka Connexion
                </span>
              </Link>
              <p className="text-[#666666] leading-relaxed">
                {t('footer.slogan')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[#111111] font-semibold mb-6 font-['Sora']">{t('footer.links')}</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-[#666666] hover:text-[#CE1126] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[#111111] font-semibold mb-6 font-['Sora']">{t('nav.services')}</h4>
              <ul className="space-y-3">
                <li><Link to="/services" className="text-[#666666] hover:text-[#CE1126] transition-colors">{t('services.grosOeuvre.title')}</Link></li>
                <li><Link to="/services" className="text-[#666666] hover:text-[#CE1126] transition-colors">{t('services.genieCivil.title')}</Link></li>
                <li><Link to="/services" className="text-[#666666] hover:text-[#CE1126] transition-colors">{t('services.industriel.title')}</Link></li>
                <li><Link to="/services" className="text-[#666666] hover:text-[#CE1126] transition-colors">{t('services.etudes.title')}</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[#111111] font-semibold mb-6 font-['Sora']">{t('footer.legal')}</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-[#666666] hover:text-[#CE1126] transition-colors">{t('footer.privacy')}</Link></li>
                <li><Link to="#" className="text-[#666666] hover:text-[#CE1126] transition-colors">{t('footer.terms')}</Link></li>
              </ul>

              {/* Social Media */}
              <h4 className="text-[#111111] font-semibold mb-4 mt-8 font-['Sora']">Réseaux Sociaux</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100064047309007"
                  aria-label={t('common.socialFacebook')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#666666] hover:bg-[#CE1126] hover:border-[#CE1126] hover:text-white transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/camerossak/"
                  aria-label={t('common.socialInstagram')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#666666] hover:bg-[#CE1126] hover:border-[#CE1126] hover:text-white transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@camerossaka"
                  aria-label={t('common.socialTikTok')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#666666] hover:bg-[#CE1126] hover:border-[#CE1126] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@Camer-ossakaConstruction-ol8nl"
                  aria-label={t('common.socialYoutube')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-[#666666] hover:bg-[#CE1126] hover:border-[#CE1126] hover:text-white transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E5E5E5] text-center">
            <p className="text-[#999999] text-sm">© {new Date().getFullYear()} {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
