import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Users, Award, Facebook, Instagram, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
 '/images/3persone.png',
    '/images/image8.png',
     '/images/image4.png',
  '/images/1772988529.png',
  '/images/image6.png',

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

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.hero-title', 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo('.hero-subtitle', 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo('.hero-cta', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.7, stagger: 0.1 }
      );

      // Stats animation
      gsap.fromTo('.stat-item', 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          }
        }
      );

      // Pillars animation
      gsap.fromTo('.pillar-card', 
        { y: 60, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.15,
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 75%',
          }
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current, 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '15+', label: t('stats.years'), icon: Award },
    { value: '500+', label: t('stats.projects'), icon: Building2 },
    { value: '98%', label: t('stats.satisfaction'), icon: Users },
  ];

  const pillars = [
    { key: 'build', color: '#007A5E' },
    { key: 'create', color: '#D4A03A' },
    { key: 'deliver', color: '#CE1126' },
    { key: 'modern', color: '#FCD116', textDark: true },
    { key: 'reliable', color: '#1A2744', border: true },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background carousel */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/90 via-[#0B0F17]/70 to-[#007A5E]/30" />
        </div>

        {/* Slide arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-[#007A5E] transition-colors backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-[#007A5E] transition-colors backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-[#D4A03A] w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Decorative African pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
          <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
            <path fill="#FCD116" d="M0,60 Q360,120 720,60 T1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="hero-title heading-display text-[clamp(48px,10vw,96px)] text-white mb-6">
            {t('hero.title')}
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-[#A6AFBF] mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/devis"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#007A5E] text-white font-semibold rounded-sm hover:bg-[#006B52] transition-colors"
            >
              {t('hero.ctaQuote')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/btp-connexion"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#D4A03A] text-[#D4A03A] font-semibold rounded-sm hover:bg-[#D4A03A] hover:text-[#0B0F17] transition-colors"
            >
              {t('hero.ctaJoin')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={statsRef} className="bg-[#1A2744] py-12">
        <div className="px-4 lg:px-[4vw]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#D4A03A]" />
                <div className="text-4xl md:text-5xl font-bold text-white font-['Sora'] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#A6AFBF] label-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section ref={pillarsRef} className="py-24 bg-[#0B0F17]">
        <div className="px-4 lg:px-[4vw]">
          <div className="text-center mb-16">
            <h2 className="heading-display text-[clamp(32px,5vw,56px)] text-white mb-4">
              {t('home.pillarsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className={`pillar-card p-8 rounded-sm ${
                  pillar.border ? 'border-2 border-[#D4A03A]' : ''
                }`}
                style={{ backgroundColor: pillar.color }}
              >
                <h3 className={`heading-display text-3xl mb-4 ${
                  pillar.textDark ? 'text-[#0B0F17]' : 'text-white'
                }`}>
                  {t(`pillars.${pillar.key}.title`)}
                </h3>
                <p className={`leading-relaxed ${
                  pillar.textDark ? 'text-[#0B0F17]/80' : 'text-white/80'
                }`}>
                  {t(`pillars.${pillar.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 bg-[#1A2744]">
        <div className="px-4 lg:px-[4vw]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="heading-display text-[clamp(32px,5vw,56px)] text-white mb-4">
                {t('work.title')}
              </h2>
              <p className="text-lg text-[#A6AFBF]">{t('work.subtitle')}</p>
            </div>
            <Link
              to="/work"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#D4A03A] hover:text-white transition-colors"
            >
              {t('common.seeAllProjects')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
            { img: '/images/build_concrete_structure.jpg', title: t('work.projects.p1.title'), loc: t('work.projects.p1.loc') },
              { img: '/images/image6.png', title: t('work.projects.p2.title'), loc: t('work.projects.p2.loc') },
              { img: '/images/modern_concrete_wall.jpg', title: t('work.projects.p3.title'), loc: t('work.projects.p3.loc') },
            ].map((project, index) => (
              <Link
                key={index}
                to="/work"
                className="group relative aspect-[4/3] overflow-hidden rounded-sm"
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-[#007A5E] rounded-full" />
                    <span className="text-sm text-[#A6AFBF]">{project.loc}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white font-['Sora']">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 bg-gradient-to-br from-[#007A5E]/20 to-[#1A2744]">
        <div className="px-4 lg:px-[4vw] text-center">
          <h2 className="heading-display text-[clamp(32px,5vw,56px)] text-white mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-lg text-[#A6AFBF] mb-10 max-w-2xl mx-auto">
            {t('home.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/devis"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#007A5E] text-white font-semibold rounded-sm hover:bg-[#006B52] transition-colors"
            >
              {t('hero.ctaQuote')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-[#0B0F17] transition-colors"
            >
              {t('common.contactUs')}
            </Link>
          </div>
          
          {/* Social Media */}
          <div className="mt-12">
            <p className="text-[#A6AFBF] mb-4">{t('common.followUsSocial')}</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064047309007"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1A2744] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/camerossak/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1A2744] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@camerossaka"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1A2744] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Camer-ossakaConstruction-ol8nl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1A2744] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
