import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Users, Award, ChevronLeft, ChevronRight, Hammer, Lightbulb, PackageCheck, Cpu, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  { image: '/images/3persone.webp', translationKey: 'home.heroSlides.slide1' },
  { image: '/images/image8.webp', translationKey: 'home.heroSlides.slide2' },
  { image: '/images/image4.webp', translationKey: 'home.heroSlides.slide3' },
  { image: '/images/1772988529.webp', translationKey: 'home.heroSlides.slide4' },
  { image: '/images/image6.webp', translationKey: 'home.heroSlides.slide5' },
];

export default function Home() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const requestSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setTimerResetKey((key) => key + 1);
  }, []);

  const goToSlide = useCallback((index: number) => {
    requestSlide(index);
  }, [requestSlide]);

  const prevSlide = useCallback(() => {
    requestSlide((currentSlide + heroSlides.length - 1) % heroSlides.length);
  }, [currentSlide, requestSlide]);

  const nextSlide = useCallback(() => {
    requestSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, requestSlide]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;

    const scheduleNextSlide = () => {
      window.clearTimeout(timer);
      if (document.hidden || reducedMotion.matches) return;
      timer = window.setTimeout(() => {
        setCurrentSlide((slide) => (slide + 1) % heroSlides.length);
      }, 5500);
    };

    document.addEventListener('visibilitychange', scheduleNextSlide);
    reducedMotion.addEventListener('change', scheduleNextSlide);
    scheduleNextSlide();

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', scheduleNextSlide);
      reducedMotion.removeEventListener('change', scheduleNextSlide);
    };
  }, [currentSlide, timerResetKey]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const title = titleRef.current;
    const description = descriptionRef.current;
    if (!title || !description) return;
    gsap.fromTo(
      [title, description],
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', clearProps: 'transform' },
    );
  }, [currentSlide]);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo('.hero-eyebrow, .hero-cta, .hero-stat',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
        );
        gsap.fromTo('.stat-card',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08,
            scrollTrigger: { trigger: statsRef.current, start: 'top 82%' }
          }
        );
        gsap.fromTo('.pillar-card',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08,
            scrollTrigger: { trigger: pillarsRef.current, start: 'top 78%' }
          }
        );
        gsap.fromTo(ctaRef.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6,
            scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' }
          }
        );
      });
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  const stats = [
    { value: '15+', label: t('stats.years'), icon: Award, accent: '#CE1126' },
    { value: '500+', label: t('stats.projects'), icon: Building2, accent: '#111111' },
    { value: '98%', label: t('stats.satisfaction'), icon: Users, accent: '#CE1126' },
  ];

  const pillars = [
    { key: 'build',    icon: Hammer,       accent: '#CE1126', accentLight: 'rgba(206,17,38,0.10)' },
    { key: 'create',   icon: Lightbulb,    accent: '#111111', accentLight: 'rgba(0,0,0,0.12)' },
    { key: 'deliver',  icon: PackageCheck, accent: '#CE1126', accentLight: 'rgba(206,17,38,0.10)' },
    { key: 'modern',   icon: Cpu,          accent: '#0A0A0A', accentLight: 'rgba(0,0,0,0.08)' },
    { key: 'reliable', icon: ShieldCheck,  accent: '#111111', accentLight: 'rgba(0,0,0,0.10)' },
  ];

  return (
    <div className="pt-20">

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          HERO â€” Full-viewport cinematic carousel
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section
        ref={heroRef}
        className="relative min-h-[95vh] flex items-center overflow-hidden"
      >
        {/* Background slides */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Camer-Ossaka Connexion — chantier ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              className={`absolute inset-0 w-full h-full object-cover ${
                index === currentSlide ? 'opacity-100 scale-[1.035]' : 'opacity-0 scale-[1.08]'
              }`}
              style={{ transition: 'opacity 700ms ease, transform 6000ms ease-out' }}
            />
          ))}
          {/* Multi-layer overlay for depth */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, #060606 0%, rgba(6,6,6,0.84) 29%, rgba(6,6,6,0.36) 65%, rgba(6,6,6,0.14) 100%)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(6,6,6,0.6), transparent 32%)' }} />
          {/* Subtle blueprint grid */}
          <div className="absolute inset-0 grid-blueprint opacity-15" />
        </div>

        {/* Accent bar — left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
          <div className="flex-1 bg-[#CE1126]" />
          <div className="flex-1 bg-white" />
        </div>

        {/* Slide nav arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 md:left-10 bottom-8 z-20 w-11 h-11 rounded-full flex items-center justify-center border border-white/40 text-white hover:border-[#CE1126] hover:bg-[#CE1126] transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute left-20 md:left-24 bottom-8 z-20 w-11 h-11 rounded-full flex items-center justify-center border border-white/40 text-white hover:border-[#CE1126] hover:bg-[#CE1126] transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide controls */}
        <div className="absolute left-[4vw] right-[4vw] bottom-0 z-20 flex items-center gap-3 ml-[100px] md:ml-[110px] border-t border-white/25 py-6">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-12 h-[3px] bg-[#CE1126]'
                  : 'w-5 h-[3px] bg-white/40 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero content â€” left aligned */}
        <div className="page-container relative z-10 max-w-4xl !mx-[5vw] lg:!mx-[8vw]">
          {/* Main headline */}
          <div className="hero-eyebrow flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#CE1126]" />
            <span className="label-mono text-white/80 text-[11px]">{t('home.eyebrow')}</span>
          </div>
          <h1 ref={titleRef} className="hero-title heading-display text-[clamp(40px,7.5vw,84px)] text-white leading-[1.02] mb-8 min-h-[2.04em]">
            <span className="block">
              {t(`${heroSlides[currentSlide].translationKey}.line1`)}
              {t(`${heroSlides[currentSlide].translationKey}.line1End`) && (
                <span className="text-[#CE1126]">{t(`${heroSlides[currentSlide].translationKey}.line1End`)}</span>
              )}
            </span>
            <span className="block">
              {t(`${heroSlides[currentSlide].translationKey}.line2`)}
              {t(`${heroSlides[currentSlide].translationKey}.line2End`) && (
                <span className="text-[#CE1126]">{t(`${heroSlides[currentSlide].translationKey}.line2End`)}</span>
              )}
            </span>
          </h1>

          {/* Divider */}
          <div className="hero-subtitle w-16 h-0.5 bg-[#CE1126] mb-6" />

          {/* Subtitle */}
          <p ref={descriptionRef} className="text-lg md:text-xl text-white/90 font-medium max-w-lg mb-10 leading-relaxed min-h-[6rem]">
            {t(`${heroSlides[currentSlide].translationKey}.description`)}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <Link to="/Submit" className="hero-cta btn-primary">
              {t('hero.ctaQuote')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/Register" className="hero-cta btn-secondary-light">
              {t('hero.ctaJoin')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right-side floating stats â€” desktop only */}
        <div className="absolute right-[4vw] bottom-16 hidden lg:flex flex-col gap-4 z-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="hero-stat flex items-center gap-4 px-5 py-3 rounded-xl backdrop-blur-sm"
              style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderLeft: `3px solid ${stat.accent}` }}
            >
              <div className="text-2xl font-bold text-[#111111] font-['Sora']">{stat.value}</div>
              <div className="text-[11px] text-[#666666] label-mono leading-tight max-w-[100px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section ref={statsRef} className="relative py-14 lg:hidden overflow-hidden bg-white">
        <div className="relative px-4 grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card text-center py-4">
              <div className="text-2xl font-bold font-['Sora'] text-[#CE1126]">{stat.value}</div>
              <div className="label-mono text-[#666666] text-[9px] mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          PILLARS â€” Dark glass cards with icon accents
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={pillarsRef} className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#F8F8F8]" />
        <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />

        <div className="page-container relative">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#CE1126]" />
                <span className="label-mono text-[#CE1126] text-[11px]">{t('home.valuesLabel')}</span>
              </div>
              <h2 className="heading-display text-[clamp(32px,5vw,56px)] text-[#111111]">
                {t('home.pillarsTitle')}
              </h2>
            </div>
            <p className="text-[#777777] max-w-xs mt-4 lg:mt-0 text-sm leading-relaxed">
              {t('home.valuesDesc')}
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 border-t border-l border-[#E5E5E5]">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className="pillar-card group relative min-h-[260px] border-r border-b border-[#E5E5E5] bg-white p-7 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F8F8] hover:shadow-[0_18px_35px_rgba(0,0,0,0.06)]"
              >
                {/* Hover background fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: pillar.accentLight }}
                />
                {/* Colored left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 group-hover:w-1 transition-all duration-300"
                  style={{ background: pillar.accent }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-6"
                    style={{ background: `${pillar.accent}18`, border: `1px solid ${pillar.accent}35` }}
                  >
                    <pillar.icon className="w-5 h-5" style={{ color: pillar.accent }} />
                  </div>

                  <h3 className="font-['Sora'] font-semibold text-xl text-[#111111] mb-3 tracking-tight">
                    {t(`pillars.${pillar.key}.title`)}
                  </h3>
                  <p className="text-[#777777] text-sm leading-relaxed group-hover:text-[#666666] transition-colors">
                    {t(`pillars.${pillar.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          CTA â€” Immersive green-tinted section
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={ctaRef} className="relative py-20 lg:py-28 overflow-hidden bg-[#F8F8F8]">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#F8F8F8]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(206,17,38,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 grid-blueprint-subtle opacity-50 pointer-events-none" />
        {/* Decorative geometric accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #CE1126 0, #CE1126 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="divider-gradient absolute top-0 left-0 right-0" />

        <div className="page-container relative max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#CE1126]" />
            <span className="label-mono text-[#CE1126] text-[11px]">{t('home.ctaKicker')}</span>
          </div>

          <h2 className="heading-display text-[clamp(36px,6vw,64px)] text-[#111111] mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-lg text-[#666666] mb-12 leading-relaxed max-w-xl">
            {t('home.ctaDesc')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap mb-16">
            <Link to="/Submit" className="btn-primary">
              {t('hero.ctaQuote')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/Register" className="btn-secondary">
              {t('hero.ctaJoin')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
