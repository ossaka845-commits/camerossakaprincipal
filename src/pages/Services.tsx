import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  Landmark,
  Factory, 
  Briefcase, 
  Hammer, 
  ClipboardList,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { key: 'grosOeuvre',  icon: Building2,     accent: '#3B1F8A', accentLight: 'rgba(59,31,138,0.08)' },
  { key: 'genieCivil', icon: Landmark,      accent: '#2C2834', accentLight: 'rgba(0,0,0,0.10)' },
  { key: 'industriel', icon: Factory,       accent: '#3B1F8A', accentLight: 'rgba(59,31,138,0.06)' },
  { key: 'tertiaire',  icon: Briefcase,     accent: '#0A0A0A', accentLight: 'rgba(0,0,0,0.08)' },
  { key: 'renovation', icon: Hammer,        accent: '#2C2834', accentLight: 'rgba(0,0,0,0.08)' },
  { key: 'etudes',     icon: ClipboardList, accent: '#C4956A', accentLight: 'rgba(196,149,106,0.10)' },
];

export default function Services() {
  const { t } = useTranslation();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo('.service-card',
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 75%',
            }
          }
        );
      });
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="relative px-4 lg:px-[4vw] mb-20 pt-8">
        <div className="absolute inset-0 -top-24 grid-blueprint opacity-20 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#3B1F8A]" />
            <span className="label-mono text-[#3B1F8A] text-[11px]">{t('services.badge')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#2C2834] mb-4">
            {t('services.title')}
          </h1>
          <p className="text-lg text-[#68636E] max-w-xl">{t('services.subtitle')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="px-4 lg:px-[4vw] mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesList.map((service) => (
            <div
              key={service.key}
              className="service-card surface-card group relative p-8 overflow-hidden"
            >
              {/* Hover fill */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: service.accentLight }} />
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: service.accent }} />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6 rounded-xl"
                  style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}35` }}
                >
                  <service.icon className="w-5 h-5" style={{ color: service.accent }} />
                </div>
                <h3 className="font-['Sora'] font-semibold text-xl text-[#2C2834] mb-3 tracking-tight">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-[#777777] text-sm leading-relaxed group-hover:text-[#68636E] transition-colors">
                  {t(`services.${service.key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="relative px-4 lg:px-[4vw] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#FFFFFF]" />
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div className="divider-gradient absolute bottom-0 left-0 right-0" />

        <div className="relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#2C2834]" />
              <span className="label-mono text-[#2C2834] text-[11px]">{t('services.methodLabel')}</span>
              <div className="w-8 h-px bg-[#2C2834]" />
            </div>
            <h2 className="heading-display text-[clamp(28px,5vw,48px)] text-[#2C2834] mb-4">
              {t('services.processTitle')}
            </h2>
            <p className="text-[#68636E] max-w-xl mx-auto text-sm">
              {t('services.processSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: t('services.process.step1.title'), desc: t('services.process.step1.desc'), accent: '#3B1F8A' },
              { step: '02', title: t('services.process.step2.title'), desc: t('services.process.step2.desc'), accent: '#2C2834' },
              { step: '03', title: t('services.process.step3.title'), desc: t('services.process.step3.desc'), accent: '#0A0A0A' },
              { step: '04', title: t('services.process.step4.title'), desc: t('services.process.step4.desc'), accent: '#3B1F8A' },
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-5 left-[60%] w-[90%] h-px bg-gradient-to-r from-[#CCCCCC] to-transparent" />
                )}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
                  style={{ border: `1px solid ${item.accent}`, color: item.accent }}
                >
                  <span className="label-mono text-[11px] font-bold">{item.step}</span>
                </div>
                <h3 className="text-base font-semibold text-[#2C2834] mb-2 font-['Sora']">{item.title}</h3>
                <p className="text-[#777777] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 lg:px-[4vw] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#F7F5F2]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(206,17,38,0.14) 0%, transparent 70%)' }} />
        <div className="divider-gradient absolute top-0 left-0 right-0" />

        <div className="relative max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#3B1F8A]" />
            <span className="label-mono text-[#3B1F8A] text-[11px]">{t('services.startLabel')}</span>
          </div>
          <h2 className="heading-display text-[clamp(28px,5vw,48px)] text-[#2C2834] mb-4">
            {t('services.ctaTitle')}
          </h2>
          <p className="text-[#68636E] mb-10 leading-relaxed">
            {t('services.ctaDesc')}
          </p>
          <Link to="/Submit" className="btn-primary">
            {t('services.ctaButton')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
