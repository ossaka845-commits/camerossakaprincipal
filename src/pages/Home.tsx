import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Users, Award, Facebook, Instagram, Youtube, ChevronLeft, ChevronRight, Hammer, Lightbulb, PackageCheck, Cpu, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  '/images/3persone.webp',
  '/images/image8.webp',
  '/images/image4.webp',
  '/images/1772988529.webp',
  '/images/image6.webp',
];

export default function Home() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.hero-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 });
      gsap.fromTo('.hero-subtitle', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.65 });
      gsap.fromTo('.hero-cta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.85, stagger: 0.12 });
      gsap.fromTo('.hero-stat', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1.1, stagger: 0.1 });

      gsap.fromTo('.stat-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12,
          scrollTrigger: { trigger: statsRef.current, start: 'top 82%' }
        }
      );

      gsap.fromTo('.pillar-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1,
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 78%' }
        }
      );

      gsap.fromTo('.project-card',
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.12,
          scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' }
        }
      );

      gsap.fromTo(ctaRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' }
        }
      );
    });
    return () => ctx.revert();
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
              src={slide}
              alt={`CamerOssaka — chantier ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/92 via-[#060606]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/80 via-transparent to-[#060606]/30" />
          {/* Subtle blueprint grid */}
          <div className="absolute inset-0 grid-blueprint opacity-30" />
        </div>

        {/* Accent bar — left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
          <div className="flex-1 bg-[#CE1126]" />
          <div className="flex-1 bg-white" />
        </div>

        {/* Slide nav arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 md:left-10 bottom-12 z-20 w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:border-[#111111] hover:text-[#111111] transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute left-20 md:left-24 bottom-12 z-20 w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:border-[#111111] hover:text-[#111111] transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide counter */}
        <div className="absolute left-[4vw] bottom-14 z-20 flex items-center gap-3 ml-[100px] md:ml-[110px]">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 h-0.5 bg-[#111111]'
                  : 'w-3 h-0.5 bg-white/35 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          <span className="text-white/40 text-xs ml-2 label-mono">
            {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
          </span>
        </div>

        {/* Hero content â€” left aligned */}
        <div className="relative z-10 px-[5vw] lg:px-[8vw] max-w-4xl">
          {/* Main headline */}
          <h1 className="hero-title heading-display text-[clamp(52px,9vw,96px)] text-white leading-[0.9] mb-8">
            {t('hero.title')}
          </h1>

          {/* Divider */}
          <div className="hero-subtitle w-16 h-0.5 bg-[#CE1126] mb-6" />

          {/* Subtitle */}
          <p className="hero-subtitle text-lg md:text-xl text-white/90 font-medium max-w-lg mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <Link
              to="/Submit"
              className="hero-cta group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#CE1126] text-white font-semibold hover:bg-[#A50E20] transition-all duration-300 text-sm tracking-wide"
            >
              {t('hero.ctaQuote')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/Register"
              className="hero-cta group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 border border-white/40 text-white font-semibold hover:bg-white hover:text-[#111111] backdrop-blur-sm transition-all duration-300 text-sm tracking-wide"
            >
              {t('hero.ctaJoin')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right-side floating stats â€” desktop only */}
        <div className="absolute right-[4vw] bottom-16 hidden lg:flex flex-col gap-4 z-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="hero-stat flex items-center gap-4 px-5 py-3 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.85)', borderLeft: `2px solid ${stat.accent}`, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
            >
              <div className="text-2xl font-bold text-[#111111] font-['Sora']">{stat.value}</div>
              <div className="text-[11px] text-[#666666] label-mono leading-tight max-w-[100px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          STATS BAR â€” Glass accent cards
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={statsRef} className="relative py-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#FFFFFF]" />
        <div className="absolute inset-0 ambient-glow-green pointer-events-none" />
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div className="divider-gradient absolute bottom-0 left-0 right-0" />

        <div className="relative px-4 lg:px-[4vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card group relative overflow-hidden p-8 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
              >
                {/* Colored top border accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: stat.accent }} />

                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-5xl font-bold font-['Sora'] mb-2" style={{ color: stat.accent }}>
                      {stat.value}
                    </div>
                    <div className="label-mono text-[#666666] text-[11px]">{stat.label}</div>
                  </div>
                  <stat.icon className="w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity" style={{ color: stat.accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          PILLARS â€” Dark glass cards with icon accents
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={pillarsRef} className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#F5F5F5]" />
        <div className="absolute inset-0 grid-dots opacity-40 pointer-events-none" />

        <div className="relative px-4 lg:px-[4vw]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className="pillar-card group relative p-7 overflow-hidden cursor-default shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                }}
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
                    className="w-12 h-12 flex items-center justify-center mb-6 rounded-sm"
                    style={{ background: `${pillar.accent}18`, border: `1px solid ${pillar.accent}35` }}
                  >
                    <pillar.icon className="w-5 h-5" style={{ color: pillar.accent }} />
                  </div>

                  <h3 className="heading-display text-xl text-[#111111] mb-3">
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
          FEATURED PROJECTS
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#F5F5F5]" />
        <div className="divider-gradient absolute top-0 left-0 right-0" />

        <div className="relative px-4 lg:px-[4vw]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#111111]" />
                <span className="label-mono text-[#111111] text-[11px]">{t('work.badge')}</span>
              </div>
              <h2 className="heading-display text-[clamp(32px,5vw,56px)] text-[#111111]">
                {t('work.title')}
              </h2>
            </div>
            <Link
              to="/work"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm text-[#CE1126] hover:text-[#A50E20] transition-colors group"
            >
              {t('common.seeAllProjects')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="projects-grid grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Large featured card */}
            <Link
              to="/work"
              className="project-card group md:col-span-7 relative aspect-[16/10] overflow-hidden"
            >
              <img
                src="/images/build_concrete_structure.jpg"
                alt={t('work.projects.p1.title')}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="capsule capsule-white mb-3">{t('work.projects.p1.loc')}</div>
                <h3 className="text-2xl font-semibold text-white font-['Sora'] mb-2">
                  {t('work.projects.p1.title')}
                </h3>
                <div className="flex items-center gap-2 text-[#111111] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>{t('common.viewProject')}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Right column â€” 2 stacked cards */}
            <div className="md:col-span-5 flex flex-col gap-4">
              {[
                { img: '/images/image6.webp', title: t('work.projects.p2.title'), loc: t('work.projects.p2.loc') },
                { img: '/images/modern_concrete_wall.jpg', title: t('work.projects.p3.title'), loc: t('work.projects.p3.loc') },
              ].map((project, index) => (
                <Link
                  key={index}
                  to="/work"
                  className="project-card group relative overflow-hidden"
                  style={{ aspectRatio: '16/9' }}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="capsule capsule-white mb-3">{project.loc}</div>
                    <h3 className="text-2xl font-semibold text-white font-['Sora']">{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          CTA â€” Immersive green-tinted section
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section ref={ctaRef} className="relative py-32 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#FFFFFF]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(206,17,38,0.14) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 grid-blueprint-subtle opacity-50 pointer-events-none" />
        {/* Decorative geometric accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #CE1126 0, #CE1126 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="divider-gradient absolute top-0 left-0 right-0" />

        <div className="relative px-4 lg:px-[4vw] max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#CE1126]" />
            <span className="label-mono text-[#CE1126] text-[11px]">TRAVAILLONS ENSEMBLE</span>
          </div>

          <h2 className="heading-display text-[clamp(36px,6vw,64px)] text-[#111111] mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-lg text-[#666666] mb-12 leading-relaxed max-w-xl">
            {t('home.ctaDesc')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap mb-16">
            <Link
              to="/Submit"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#CE1126] text-white font-semibold hover:bg-[#A50E20] transition-all duration-300 text-sm tracking-wide"
            >
              {t('hero.ctaQuote')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/Register"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#111111] text-[#111111] font-semibold hover:bg-[#111111] hover:text-white transition-all duration-300 text-sm tracking-wide"
            >
              {t('hero.ctaJoin')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Social row */}
          <div className="flex items-center gap-5">
            <span className="label-mono text-[#999999] text-[10px]">{t('common.followUsSocial')}</span>
            <div className="w-8 h-px bg-[#E5E5E5]" />
            {[
              { href: 'https://www.facebook.com/profile.php?id=100064047309007', icon: Facebook },
              { href: 'https://www.instagram.com/camerossak/', icon: Instagram },
              { href: 'https://www.youtube.com/@Camer-ossakaConstruction-ol8nl', icon: Youtube },
              { href: 'https://www.tiktok.com/@camerossaka', icon: null },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] text-[#999999] hover:border-[#CE1126] hover:text-[#CE1126] transition-all duration-300"
              >
                {s.icon ? (
                  <s.icon className="w-4 h-4" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
