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
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { key: 'grosOeuvre', icon: Building2, color: '#007A5E' },
  { key: 'genieCivil', icon: Landmark, color: '#D4A03A' },
  { key: 'industriel', icon: Factory, color: '#CE1126' },
  { key: 'tertiaire', icon: Briefcase, color: '#FCD116', darkText: true },
  { key: 'renovation', icon: Hammer, color: '#1A2744', border: true },
  { key: 'etudes', icon: ClipboardList, color: '#007A5E' },
];

export default function Services() {
  const { t } = useTranslation();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 lg:px-[4vw] mb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#007A5E]/20 border border-[#007A5E]/40 rounded-full mb-6">
            <span className="text-sm text-[#007A5E] label-mono">EXPERTISE</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-white mb-4">
            {t('services.title')}
          </h1>
          <p className="text-xl text-[#A6AFBF]">{t('services.subtitle')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="px-4 lg:px-[4vw] mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => (
            <div
              key={service.key}
              className={`service-card group p-8 rounded-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                service.border ? 'border-2 border-[#D4A03A]' : ''
              }`}
              style={{ backgroundColor: service.color }}
            >
              <service.icon 
                className={`w-12 h-12 mb-6 ${service.darkText ? 'text-[#0B0F17]' : 'text-white'}`} 
              />
              <h3 className={`heading-display text-2xl mb-4 ${
                service.darkText ? 'text-[#0B0F17]' : 'text-white'
              }`}>
                {t(`services.${service.key}.title`)}
              </h3>
              <p className={`leading-relaxed mb-6 ${
                service.darkText ? 'text-[#0B0F17]/80' : 'text-white/80'
              }`}>
                {t(`services.${service.key}.desc`)}
              </p>
              <Link
                to="/devis"
                className={`inline-flex items-center gap-2 font-medium ${
                  service.darkText 
                    ? 'text-[#0B0F17] hover:text-[#0B0F17]/70' 
                    : 'text-white hover:text-white/70'
                } transition-colors`}
              >
                Demander un devis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="px-4 lg:px-[4vw] py-20 bg-[#1A2744]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="heading-display text-[clamp(28px,5vw,48px)] text-white mb-4">
            NOTRE PROCESSUS
          </h2>
          <p className="text-lg text-[#A6AFBF]">
            De l'étude à la livraison, nous vous accompagnons à chaque étape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Étude', desc: 'Analyse du projet, faisabilité, budget prévisionnel' },
            { step: '02', title: 'Conception', desc: 'Plans, BIM, choix des matériaux et méthodes' },
            { step: '03', title: 'Réalisation', desc: 'Construction avec suivi rigoureux et reporting' },
            { step: '04', title: 'Livraison', desc: 'Réception, formation et maintenance' },
          ].map((item, index) => (
            <div key={index} className="relative text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[#007A5E] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">{item.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-['Sora']">{item.title}</h3>
              <p className="text-[#A6AFBF] text-sm">{item.desc}</p>
              {index < 3 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#2A3441]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 lg:px-[4vw] py-20">
        <div className="bg-gradient-to-r from-[#007A5E] to-[#006B52] rounded-sm p-12 text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-white mb-4">
            BESOIN D'UN DEVIS ?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et obtenir une estimation détaillée.
          </p>
          <Link
            to="/devis"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#007A5E] font-semibold rounded-sm hover:bg-[#F5F5F0] transition-colors"
          >
            Demander un devis
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          {/* Social Media */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">Suivez-nous sur les réseaux sociaux</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064047309007"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#007A5E] transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/camerossak/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#007A5E] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@camerossaka"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#007A5E] transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Camer-ossakaConstruction-ol8nl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#007A5E] transition-all"
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
