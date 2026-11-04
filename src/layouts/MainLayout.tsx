import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ArrowUpRight, Facebook, Instagram, Youtube } from 'lucide-react';
import { languages } from '@/i18n';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function MainLayout() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsStorageError, setTermsStorageError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    try {
      setHasAcceptedTerms(window.localStorage.getItem('camer-ossaka-terms-v1') === 'accepted');
    } catch {
      setTermsStorageError(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hasAcceptedTerms) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasAcceptedTerms]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const acceptTerms = () => {
    try {
      window.localStorage.setItem('camer-ossaka-terms-v1', 'accepted');
      setHasAcceptedTerms(true);
    } catch {
      setTermsStorageError(true);
    }
  };

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.work'), href: '/projects' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.about'), href: '/a-propos' },
    { label: t('nav.team'), href: '/equipe' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const activeLanguage = (i18n.resolvedLanguage || i18n.language).split('-')[0];

  return (
    <>
    <div
      className="min-h-screen bg-[#FFFFFF]"
      inert={!hasAcceptedTerms}
      aria-hidden={!hasAcceptedTerms}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'h-[80px] bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-[0_2px_16px_rgba(0,0,0,0.06)]'
            : 'h-[80px] bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E5E5]'
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
        <div className="page-container h-full grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 xl:gap-8">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="h-12 w-12 shrink-0 overflow-hidden bg-white">
              <img
                src="/images/ossaka_logo.jpeg"
                alt="Camer-Ossaka Connexion"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="min-w-0 flex flex-col leading-tight">
              <span className="font-['Sora'] font-bold text-[12px] md:text-[13px] tracking-[-0.03em] text-[#111111] uppercase whitespace-nowrap">
                Camer-Ossaka
              </span>
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#CE1126]">
                Connexion
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-self-center gap-3 xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`whitespace-nowrap text-[11px] xl:text-[12px] font-semibold transition-colors duration-200 ${
                  location.pathname === link.href ? 'text-[#111111]' : 'text-[#333333] hover:text-[#CE1126]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {/* Language Selector */}
            <div className="flex items-center rounded-full border border-[#E5E5E5] p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  aria-label={lang.name}
                  aria-pressed={activeLanguage === lang.code}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase transition-colors ${
                    activeLanguage === lang.code
                      ? 'bg-[#F5F5F5] text-[#111111]'
                      : 'text-[#666666] hover:bg-[#F8F8F8]'
                  }`}
                >
                  <img src={lang.flag} alt="" className="h-3 w-4 object-cover" />
                  {lang.code}
                </button>
              ))}
            </div>

            {/* CTA Devis */}
            <Link
              to="/devis"
              className="btn-primary !gap-2 !px-4 xl:!px-6 !py-3 text-[11px] xl:text-[12px] whitespace-nowrap shadow-none"
            >
              {t('nav.quote')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden justify-self-end text-[#CE1126] hover:text-[#A50E20]"
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
                className={`text-sm font-medium font-['Inter'] tracking-normal ${
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
              className="btn-primary w-full py-4"
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
                      ? 'border-[#CE1126] bg-[#CE1126] text-white'
                      : 'border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126]/10'
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
      <footer className="bg-white border-t border-[#E5E5E5] py-14 md:py-16 relative">
        <div className="page-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr] gap-10 lg:gap-14 pb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-5">
                <div className="h-14 w-14 shrink-0 overflow-hidden bg-white">
                  <img
                    src="/images/ossaka_logo.jpeg"
                    alt="Camer-Ossaka Connexion"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="flex flex-col leading-tight">
                  <span className="font-['Sora'] font-bold text-[15px] leading-tight tracking-[-0.03em] text-[#111111] uppercase">
                    CAMER-OSSAKA
                  </span>
                  <span className="text-[12px] font-bold tracking-[-0.02em] uppercase text-[#CE1126]">
                    Connexion
                  </span>
                </span>
              </Link>
              <p className="max-w-sm text-[13px] text-[#666666] leading-[1.8]">{t('footer.slogan')}</p>
              <div className="mt-7">
                <h4 className="flex items-center gap-3 label-mono text-[10px] text-[#666666] mb-5">
                  <span className="h-px w-8 bg-[#CE1126]" />
                  {t('footer.social')}
                </h4>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/profile.php?id=100064047309007" aria-label={t('common.socialFacebook')} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#666666] transition-colors hover:border-[#CE1126] hover:text-[#CE1126]">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href="https://www.instagram.com/camerossak/" aria-label={t('common.socialInstagram')} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#666666] transition-colors hover:border-[#CE1126] hover:text-[#CE1126]">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href="https://www.tiktok.com/@camerossaka" aria-label={t('common.socialTikTok')} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#666666] transition-colors hover:border-[#CE1126] hover:text-[#CE1126]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@Camer-ossakaConstruction-ol8nl" aria-label={t('common.socialYoutube')} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E5E5] text-[#666666] transition-colors hover:border-[#CE1126] hover:text-[#CE1126]">
                    <Youtube className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="label-mono text-[10px] text-[#CE1126] mb-5">{t('footer.explore')}</h4>
              <ul className="space-y-2.5">
                {[
                  { label: t('nav.work'), href: '/projects' },
                  { label: t('nav.services'), href: '/services' },
                  { label: t('nav.about'), href: '/a-propos' },
                  { label: t('nav.team'), href: '/equipe' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-[#666666] hover:text-[#CE1126] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-mono text-[10px] text-[#CE1126] mb-5">{t('footer.joinUs')}</h4>
              <ul className="space-y-2.5">
                <li><Link to="/btp-connexion" className="text-[13px] text-[#666666] hover:text-[#CE1126] transition-colors">{t('nav.btpConnexion')}</Link></li>
                <li><Link to="/devis" className="text-[13px] text-[#666666] hover:text-[#CE1126] transition-colors">{t('footer.requestQuote')}</Link></li>
                <li><a href="mailto:contact@co-connexion.com" className="text-[13px] text-[#666666] hover:text-[#CE1126] transition-colors">contact@co-connexion.com</a></li>
              </ul>
            </div>

            <div>
              <h4 className="label-mono text-[10px] text-[#CE1126] mb-5">{t('footer.office')}</h4>
              <address className="not-italic space-y-2.5 text-[13px] text-[#666666] leading-relaxed">
                <p>{t('footer.address')}</p>
                <a href="tel:+237692831334" className="block hover:text-[#CE1126] transition-colors">
                  +237 6 92 83 13 34
                </a>
                <p>{t('footer.hours')}</p>
              </address>

            </div>

          </div>

          <div className="flex flex-col gap-4 border-t border-[#E5E5E5] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <nav
              aria-label={t('legalPage.contents')}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:order-2 sm:justify-end sm:gap-x-6"
            >
              {[
                { label: t('footer.terms'), href: '/informations-legales#conditions' },
                { label: t('footer.privacy'), href: '/informations-legales#confidentialite' },
                { label: t('footer.legal'), href: '/informations-legales#mentions-legales' },
                { label: t('footer.cookies'), href: '/informations-legales#cookies' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="whitespace-nowrap text-xs text-[#666666] transition-colors hover:text-[#CE1126]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <p className="text-xs text-[#999999] sm:order-1">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>

      {!hasAcceptedTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-dialog-title"
            aria-describedby="terms-dialog-intro"
            className="my-auto max-h-[min(90vh,760px)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-9"
          >
            <div className="mb-6 flex justify-end gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  aria-label={lang.name}
                  aria-pressed={activeLanguage === lang.code}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                    activeLanguage === lang.code
                      ? 'bg-[#CE1126] text-white'
                      : 'bg-[#F5F5F5] text-[#333333] hover:bg-[#EAEAEA]'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="label-mono mb-3 text-[10px] text-[#CE1126]">{t('termsAcceptance.eyebrow')}</p>
            <h2 id="terms-dialog-title" className="mb-3 text-3xl font-semibold text-[#111111]">
              {t('termsAcceptance.title')}
            </h2>
            <p id="terms-dialog-intro" className="mb-6 text-sm leading-relaxed text-[#666666]">
              {t('termsAcceptance.intro')}
            </p>

            <div className="space-y-4 text-sm leading-relaxed text-[#444444]">
              {['use', 'requests', 'content', 'availability'].map((section) => (
                <div key={section}>
                  <h3 className="mb-1 font-semibold text-[#111111]">
                    {t(`termsAcceptance.sections.${section}.title`)}
                  </h3>
                  <p>{t(`termsAcceptance.sections.${section}.text`)}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[#777777]">
              {t('termsAcceptance.notice')}
            </p>

            <label className="mt-6 flex cursor-pointer items-start gap-3 border-t border-[#E5E5E5] pt-5 text-sm leading-relaxed text-[#333333]">
              <input
                type="checkbox"
                autoFocus
                checked={termsChecked}
                onChange={(event) => setTermsChecked(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[#CE1126]"
              />
              <span>{t('termsAcceptance.checkbox')}</span>
            </label>

            {termsStorageError && (
              <p role="alert" className="mt-3 text-sm text-[#CE1126]">
                {t('termsAcceptance.storageError')}
              </p>
            )}

            <button
              type="button"
              onClick={acceptTerms}
              disabled={!termsChecked}
              className="btn-primary mt-5 w-full justify-center rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('termsAcceptance.accept')}
            </button>
          </section>
        </div>
      )}
    </>
  );
}
