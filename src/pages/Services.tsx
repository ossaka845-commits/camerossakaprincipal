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
  { key: 'grosOeuvre',  icon: Building2,     accent: '#CE1126', accentLight: 'rgba(206,17,38,0.10)' },
  { key: 'genieCivil', icon: Landmark,      accent: '#111111', accentLight: 'rgba(0,0,0,0.10)' },
  { key: 'industriel', icon: Factory,       accent: '#CE1126', accentLight: 'rgba(206,17,38,0.08)' },
  { key: 'tertiaire',  icon: Briefcase,     accent: '#0A0A0A', accentLight: 'rgba(0,0,0,0.08)' },
  { key: 'renovation', icon: Hammer,        accent: '#111111', accentLight: 'rgba(0,0,0,0.08)' },
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
            <div className="w-8 h-px bg-[#CE1126]" />
            <span className="label-mono text-[#CE1126] text-[11px]">{t('services.badge')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#111111] mb-4">
            {t('services.title')}
          </h1>
          <p className="text-lg text-[#666666] max-w-xl">{t('services.subtitle')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="px-4 lg:px-[4vw] mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesList.map((service) => (
            <div
              key={service.key}
              className="service-card group relative p-8 overflow-hidden hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
              style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}
            >
              {/* Hover fill */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: service.accentLight }} />
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: service.accent }} />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6"
                  style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}35` }}
                >
                  <service.icon className="w-5 h-5" style={{ color: service.accent }} />
                </div>
                <h3 className="heading-display text-xl text-[#111111] mb-3">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-[#777777] text-sm leading-relaxed group-hover:text-[#666666] transition-colors">
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
              <div className="w-8 h-px bg-[#111111]" />
              <span className="label-mono text-[#111111] text-[11px]">NOTRE MÉTHODE</span>
              <div className="w-8 h-px bg-[#111111]" />
            </div>
            <h2 className="heading-display text-[clamp(28px,5vw,48px)] text-[#111111] mb-4">
              {t('services.processTitle')}
            </h2>
            <p className="text-[#666666] max-w-xl mx-auto text-sm">
              {t('services.processSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: t('services.process.step1.title'), desc: t('services.process.step1.desc'), accent: '#CE1126' },
              { step: '02', title: t('services.process.step2.title'), desc: t('services.process.step2.desc'), accent: '#111111' },
              { step: '03', title: t('services.process.step3.title'), desc: t('services.process.step3.desc'), accent: '#0A0A0A' },
              { step: '04', title: t('services.process.step4.title'), desc: t('services.process.step4.desc'), accent: '#CE1126' },
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-5 left-[60%] w-[90%] h-px bg-gradient-to-r from-[#CCCCCC] to-transparent" />
                )}
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5"
                  style={{ border: `1px solid ${item.accent}`, color: item.accent }}
                >
                  <span className="label-mono text-[11px] font-bold">{item.step}</span>
                </div>
                <h3 className="text-base font-semibold text-[#111111] mb-2 font-['Sora']">{item.title}</h3>
                <p className="text-[#777777] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 lg:px-[4vw] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#F5F5F5]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(206,17,38,0.14) 0%, transparent 70%)' }} />
        <div className="divider-gradient absolute top-0 left-0 right-0" />

        <div className="relative max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#CE1126]" />
            <span className="label-mono text-[#CE1126] text-[11px]">COMMENÇONS</span>
          </div>
          <h2 className="heading-display text-[clamp(28px,5vw,48px)] text-[#111111] mb-4">
            {t('services.ctaTitle')}
          </h2>
          <p className="text-[#666666] mb-10 leading-relaxed">
            {t('services.ctaDesc')}
          </p>
          <Link
            to="/Submit"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#CE1126] text-white font-semibold hover:bg-[#A50E20] transition-all duration-300 text-sm tracking-wide"
          >
            Nous soumettre un projet
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
