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
  { key: 'grosOeuvre',  icon: Building2,     accent: '#CE1126', accentLight: 'rgba(206,17,38,0.08)' },
  { key: 'genieCivil', icon: Landmark,      accent: '#111111', accentLight: 'rgba(0,0,0,0.10)' },
  { key: 'industriel', icon: Factory,       accent: '#CE1126', accentLight: 'rgba(206,17,38,0.06)' },
  { key: 'tertiaire',  icon: Briefcase,     accent: '#111111', accentLight: 'rgba(0,0,0,0.08)' },
  { key: 'renovation', icon: Hammer,        accent: '#111111', accentLight: 'rgba(0,0,0,0.08)' },
  { key: 'etudes',     icon: ClipboardList, accent: '#CE1126', accentLight: 'rgba(206,17,38,0.10)' },
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
      <section className="page-container relative mb-20 pt-8">
        <div className="absolute inset-0 -top-24 grid-blueprint opacity-20 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#CE1126]" />
            <span className="label-mono text-[#CE1126] text-[11px]">{t('services.badge')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#111111] mb-4">
            {t('services.title')}
          </h1>
          <p className="text-lg text-[#666666] max-w-xl">{t('services.subtitle')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="page-container mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E5E5E5]">
          {servicesList.map((service) => (
            <div
              key={service.key}
              className="service-card group relative min-h-[260px] border-r border-b border-[#E5E5E5] bg-white p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F8F8] hover:shadow-[0_18px_35px_rgba(0,0,0,0.06)]"
            >
              {/* Hover fill */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: service.accentLight }} />
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: service.accent }} />

              <div className="relative z-10">
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6"
                  style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}35` }}
                >
                  <service.icon className="w-5 h-5" style={{ color: service.accent }} />
                </div>
                <h3 className="font-['Sora'] font-semibold text-xl text-[#111111] mb-3 tracking-tight">
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
      <section className="relative bg-[#CE1126] px-4 py-20 lg:py-28 overflow-hidden">
        <div className="page-container relative text-white">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-white" />
                <span className="label-mono text-white/90 text-[11px]">{t('services.methodLabel')}</span>
              </div>
              <h2 className="heading-display text-[clamp(28px,5vw,48px)] text-white mb-0">
                {t('services.processTitle')}
              </h2>
            </div>
            <p className="text-white/90 max-w-xl text-sm leading-relaxed">
              {t('services.processSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-t border-l border-white/30">
            {[
              { step: '01', title: t('services.process.step1.title'), desc: t('services.process.step1.desc') },
              { step: '02', title: t('services.process.step2.title'), desc: t('services.process.step2.desc') },
              { step: '03', title: t('services.process.step3.title'), desc: t('services.process.step3.desc') },
              { step: '04', title: t('services.process.step4.title'), desc: t('services.process.step4.desc') },
            ].map((item) => (
              <div key={item.step} className="min-h-[210px] border-r border-b border-white/30 p-6 lg:p-8">
                <span className="label-mono text-white/85 text-[11px] block mb-10">{item.step} / 04</span>
                <h3 className="text-lg font-semibold text-white mb-3 font-['Sora']">{item.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#F8F8F8]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(206,17,38,0.14) 0%, transparent 70%)' }} />
        <div className="divider-gradient absolute top-0 left-0 right-0" />

        <div className="page-container relative max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#CE1126]" />
            <span className="label-mono text-[#CE1126] text-[11px]">{t('services.startLabel')}</span>
          </div>
          <h2 className="heading-display text-[clamp(28px,5vw,48px)] text-[#111111] mb-4">
            {t('services.ctaTitle')}
          </h2>
          <p className="text-[#666666] mb-10 leading-relaxed">
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
