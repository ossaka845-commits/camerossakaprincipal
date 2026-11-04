import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Shield, Lightbulb, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { key: 'excellence', icon: Award,     accent: '#111111', accentLight: 'rgba(0,0,0,0.10)' },
  { key: 'integrity',  icon: Shield,    accent: '#CE1126', accentLight: 'rgba(206,17,38,0.08)' },
  { key: 'innovation', icon: Lightbulb, accent: '#111111', accentLight: 'rgba(0,0,0,0.10)' },
  { key: 'solidarity', icon: Heart,     accent: '#CE1126', accentLight: 'rgba(206,17,38,0.06)' },
];

export default function About() {
  const { t } = useTranslation();

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo('.value-card',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.values-section',
              start: 'top 80%',
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
            <span className="label-mono text-[#111111] text-[11px]">{t('about.badge')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#111111] mb-4">
            {t('about.title')}
          </h1>
        </div>
      </section>

      {/* History Section */}
      <section className="page-container mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <h2 className="heading-display text-3xl text-[#111111] mb-6">
              {t('about.history.title')}
            </h2>
            <div className="space-y-4 text-[#666666] leading-relaxed text-sm">
              <p>{t('about.history.p1')}</p>
              <p>{t('about.history.p2')}</p>
              <p>{t('about.history.p3')}</p>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { num: '5+', label: t('about.yearsExp'), accent: '#CE1126' },
              { num: '100+', label: t('about.projectsDone'), accent: '#111111' },
            ].map((stat) => (
              <div
                key={stat.num}
                className="min-h-[150px] p-6"
                style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderTop: `2px solid ${stat.accent}` }}
              >
                <div className="text-4xl font-bold mb-1" style={{ color: stat.accent, fontFamily: "'Sora', sans-serif" }}>
                  {stat.num}
                </div>
                <div className="text-[#666666] text-xs label-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative values-section py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#F8F8F8]" />
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div className="divider-gradient absolute bottom-0 left-0 right-0" />

        <div className="page-container relative">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#111111]" />
            <span className="label-mono text-[#111111] text-[11px]">{t('about.values.title')}</span>
            <div className="w-8 h-px bg-[#111111]" />
          </div>
          <h2 className="heading-display text-[clamp(28px,5vw,48px)] text-[#111111] mb-16 text-center">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#E5E5E5]">
            {values.map((value) => (
              <div
                key={value.key}
                className="value-card group relative min-h-[220px] border-r border-b border-[#E5E5E5] bg-white p-7 overflow-hidden transition-all duration-300 hover:bg-[#F8F8F8] hover:-translate-y-1"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: value.accentLight }} />
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: value.accent }} />
                <div className="relative z-10">
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-6"
                    style={{ background: `${value.accent}18`, border: `1px solid ${value.accent}35` }}
                  >
                    <value.icon className="w-5 h-5" style={{ color: value.accent }} />
                  </div>
                  <h3 className="font-['Sora'] font-semibold text-lg text-[#111111] tracking-tight">
                    {t(`about.values.${value.key}`)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
