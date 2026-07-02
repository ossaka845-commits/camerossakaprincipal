import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Facebook, Instagram, Youtube } from 'lucide-react';
import { languages } from '@/i18n';

export default function MainLayout() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.work'), href: '/work' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.team'), href: '/equipe' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="min-h-screen bg-[#0B0F17]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0F17]/95 backdrop-blur-md py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="px-4 lg:px-[4vw] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/images/co_logo.png" 
              alt="CamerOssaka Logo" 
              className="w-16 h-16 rounded-sm object-cover"
            />
            <span className="text-xl font-bold tracking-tight font-['Sora'] text-white">
              Camer-<span className="text-[#D4A03A]">Ossaka</span> Construction
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-colors duration-300 label-mono ${
                  location.pathname === link.href
                    ? 'text-[#D4A03A]'
                    : 'text-[#A6AFBF] hover:text-white'
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
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#A6AFBF] hover:text-white transition-colors"
              >
                <img src={currentLang.flag} alt={currentLang.name} className="w-5 h-4 object-cover rounded-sm" />
                <span className="uppercase">{currentLang.code}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-[#1A2744] rounded-sm shadow-xl border border-[#2A3441] overflow-hidden min-w-[150px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center gap-3 w-full px-5 py-3 text-left hover:bg-[#2A3441] transition-colors whitespace-nowrap ${
                        i18n.language === lang.code ? 'text-[#D4A03A]' : 'text-white'
                      }`}
                    >
                      <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded-sm" />
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <Link
              to="/devis"
              className="px-4 py-2 bg-[#007A5E] text-white text-sm font-medium rounded-sm hover:bg-[#006B52] transition-colors"
            >
              {t('nav.quote')}
            </Link>
            <Link
              to="/btp-connexion"
              className="px-4 py-2 border border-[#D4A03A] text-[#D4A03A] text-sm font-medium rounded-sm hover:bg-[#D4A03A] hover:text-[#0B0F17] transition-colors"
            >
              {t('nav.btpConnexion')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B0F17] transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full px-6 py-20">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-2xl font-bold font-['Sora'] ${
                  location.pathname === link.href
                    ? 'text-[#D4A03A]'
                    : 'text-white hover:text-[#D4A03A]'
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            {/* Language Selector Mobile */}
            <div className="flex gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-sm border ${
                    i18n.language === lang.code
                      ? 'border-[#D4A03A] text-[#D4A03A]'
                      : 'border-[#2A3441] text-white'
                  }`}
                >
                  <img src={lang.flag} alt={lang.name} className="w-6 h-5 object-cover rounded-sm" />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>

            <Link
              to="/devis"
              className="block w-full px-6 py-4 bg-[#007A5E] text-white text-center font-semibold rounded-sm"
            >
              {t('nav.quote')}
            </Link>
            <Link
              to="/btp-connexion"
              className="block w-full px-6 py-4 border border-[#D4A03A] text-[#D4A03A] text-center font-semibold rounded-sm"
            >
              {t('nav.btpConnexion')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#1A2744] py-16">
        <div className="px-4 lg:px-[4vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <img 
                  src="/images/co_logo.png" 
                  alt="CamerOssaka Logo" 
                  className="w-16 h-16 rounded-sm object-cover"
                />
                <span className="text-xl font-bold tracking-tight font-['Sora'] text-white">
                  Camer-<span className="text-[#D4A03A]">Ossaka</span> Construction
                </span>
              </Link>
              <p className="text-[#A6AFBF] leading-relaxed">
                {t('footer.slogan')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-6 font-['Sora']">{t('footer.links')}</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-[#A6AFBF] hover:text-[#D4A03A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-6 font-['Sora']">{t('nav.services')}</h4>
              <ul className="space-y-3">
                <li><Link to="/services" className="text-[#A6AFBF] hover:text-[#D4A03A] transition-colors">{t('services.grosOeuvre.title')}</Link></li>
                <li><Link to="/services" className="text-[#A6AFBF] hover:text-[#D4A03A] transition-colors">{t('services.genieCivil.title')}</Link></li>
                <li><Link to="/services" className="text-[#A6AFBF] hover:text-[#D4A03A] transition-colors">{t('services.industriel.title')}</Link></li>
                <li><Link to="/services" className="text-[#A6AFBF] hover:text-[#D4A03A] transition-colors">{t('services.etudes.title')}</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-6 font-['Sora']">{t('footer.legal')}</h4>
              <ul className="space-y-3">
                <li><Link to="#" className="text-[#A6AFBF] hover:text-[#D4A03A] transition-colors">{t('footer.privacy')}</Link></li>
                <li><Link to="#" className="text-[#A6AFBF] hover:text-[#D4A03A] transition-colors">{t('footer.terms')}</Link></li>
              </ul>

              {/* Social Media */}
              <h4 className="text-white font-semibold mb-4 mt-8 font-['Sora']">Réseaux Sociaux</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100064047309007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2A3441] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/camerossak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2A3441] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@camerossaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2A3441] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@Camer-ossakaConstruction-ol8nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#2A3441] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#2A3441] text-center">
            <p className="text-[#4A5568] text-sm">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
