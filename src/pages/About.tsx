import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Shield, Lightbulb, Heart, Facebook, Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { key: 'excellence', icon: Award, color: '#D4A03A' },
  { key: 'integrity', icon: Shield, color: '#007A5E' },
  { key: 'innovation', icon: Lightbulb, color: '#FCD116', darkText: true },
  { key: 'solidarity', icon: Heart, color: '#CE1126' },
];

export default function About() {
  const { t } = useTranslation();

  useEffect(() => {
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
  }, []);

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 lg:px-[4vw] mb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#007A5E]/20 border border-[#007A5E]/40 rounded-full mb-6">
            <span className="text-sm text-[#007A5E] label-mono">{t('about.badge')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-white mb-4">
            {t('about.title')}
          </h1>
        </div>
      </section>

      {/* History Section */}
      <section className="px-4 lg:px-[4vw] mb-20">
        <div className="max-w-3xl">
          <h2 className="heading-display text-3xl text-white mb-6">
            {t('about.history.title')}
          </h2>
          <div className="space-y-4 text-[#A6AFBF] leading-relaxed">
            <p>{t('about.history.p1')}</p>
            <p>{t('about.history.p2')}</p>
            <p>{t('about.history.p3')}</p>
          </div>
          <div className="mt-8 inline-block bg-[#007A5E] p-6 rounded-sm">
            <div className="text-4xl font-bold text-white font-['Sora']">15+</div>
              <div className="text-white/80 text-sm">{t('about.yearsExp')}</div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section px-4 lg:px-[4vw] py-20">
        <h2 className="heading-display text-3xl text-white mb-12 text-center">
          {t('about.values.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.key}
              className="value-card p-8 rounded-sm text-center"
              style={{ backgroundColor: value.color }}
            >
              <value.icon className={`w-12 h-12 mx-auto mb-4 ${
                value.darkText ? 'text-[#0B0F17]' : 'text-white'
              }`} />
              <h3 className={`heading-display text-xl ${
                value.darkText ? 'text-[#0B0F17]' : 'text-white'
              }`}>
                {t(`about.values.${value.key}`)}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="px-4 lg:px-[4vw] py-12">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-6 font-['Sora']">{t('common.followUs')}</h3>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100064047309007"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#1A2744] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/camerossak/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#1A2744] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@camerossaka"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#1A2744] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@Camer-ossakaConstruction-ol8nl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#1A2744] flex items-center justify-center text-[#A6AFBF] hover:bg-[#D4A03A] hover:text-white transition-all"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
