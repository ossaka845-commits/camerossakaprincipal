import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Shield, Lightbulb, Heart, Facebook, Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { key: 'excellence', icon: Award,     accent: '#2C2834', accentLight: 'rgba(0,0,0,0.10)' },
  { key: 'integrity',  icon: Shield,    accent: '#3B1F8A', accentLight: 'rgba(59,31,138,0.08)' },
  { key: 'innovation', icon: Lightbulb, accent: '#2C2834', accentLight: 'rgba(0,0,0,0.10)' },
  { key: 'solidarity', icon: Heart,     accent: '#3B1F8A', accentLight: 'rgba(59,31,138,0.06)' },
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
      <section className="relative px-4 lg:px-[4vw] mb-20 pt-8">
        <div className="absolute inset-0 -top-24 grid-blueprint opacity-20 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#2C2834]" />
            <span className="label-mono text-[#2C2834] text-[11px]">{t('about.badge')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#2C2834] mb-4">
            {t('about.title')}
          </h1>
        </div>
      </section>

      {/* History Section */}
      <section className="px-4 lg:px-[4vw] mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <h2 className="heading-display text-3xl text-[#2C2834] mb-6">
              {t('about.history.title')}
            </h2>
            <div className="space-y-4 text-[#68636E] leading-relaxed text-sm">
              <p>{t('about.history.p1')}</p>
              <p>{t('about.history.p2')}</p>
              <p>{t('about.history.p3')}</p>
            </div>
          </div>
          <div className="lg:col-span-5 flex gap-4">
            {[
              { num: '15+', label: t('about.yearsExp'), accent: '#3B1F8A' },
              { num: '200+', label: t('about.projectsDone') ?? 'Projets réalisés', accent: '#2C2834' },
            ].map((stat) => (
              <div
                key={stat.num}
                className="flex-1 p-6 rounded-2xl shadow-sm"
                style={{ background: '#FFFFFF', border: '1px solid #E8E4DE', borderTop: `3px solid ${stat.accent}` }}
              >
                <div className="text-4xl font-bold mb-1" style={{ color: stat.accent, fontFamily: "'Sora', sans-serif" }}>
                  {stat.num}
                </div>
                <div className="text-[#68636E] text-xs label-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative values-section px-4 lg:px-[4vw] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#FFFFFF]" />
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div className="divider-gradient absolute bottom-0 left-0 right-0" />

        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#2C2834]" />
            <span className="label-mono text-[#2C2834] text-[11px]">{t('about.values.title')}</span>
            <div className="w-8 h-px bg-[#2C2834]" />
          </div>
          <h2 className="heading-display text-[clamp(28px,5vw,48px)] text-[#2C2834] mb-16 text-center">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value) => (
              <div
                key={value.key}
                className="value-card surface-card group relative p-8 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: value.accentLight }} />
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: value.accent }} />
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6 rounded-xl"
                    style={{ background: `${value.accent}18`, border: `1px solid ${value.accent}35` }}
                  >
                    <value.icon className="w-5 h-5" style={{ color: value.accent }} />
                  </div>
                  <h3 className="font-['Sora'] font-semibold text-lg text-[#2C2834] tracking-tight">
                    {t(`about.values.${value.key}`)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="px-4 lg:px-[4vw] py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#7A8A9C]" />
          <span className="label-mono text-[#68636E] text-[11px]">{t('common.followUs')}</span>
        </div>
        <div className="flex gap-3">
          {[
            { href: 'https://www.facebook.com/profile.php?id=100064047309007', icon: <Facebook className="w-4 h-4" /> },
            { href: 'https://www.instagram.com/camerossak/', icon: <Instagram className="w-4 h-4" /> },
            { href: 'https://www.youtube.com/@Camer-ossakaConstruction-ol8nl', icon: <Youtube className="w-4 h-4" /> },
          ].map(({ href, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#68636E] hover:text-[#CE1126] hover:border-[#CE1126] transition-all"
              style={{ border: '1px solid #E8E4DE' }}
            >
              {icon}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
