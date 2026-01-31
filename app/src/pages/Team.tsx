import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const leadership = [
  {
    name: 'Jean-Pierre Ossaka',
    role: 'CEO & Fondateur',
    bio: 'Ingénieur civil de formation, 25 ans d\'expérience dans le BTP. Visionnaire passionné par le développement de l\'Afrique.',
    image: '/images/reliable_team_meeting.jpg',
  },
  {
    name: 'Marie-Claire Nkolo',
    role: 'Directrice Financière',
    bio: 'Expertise en finance internationale, ancienne directrice chez Deloitte Afrique.',
    image: '/images/build_concrete_structure.jpg',
  },
  {
    name: 'Dr. Klaus Müller',
    role: 'Directeur Europe',
    bio: 'Docteur en génie civil, 20 ans d\'expérience dans la construction en Allemagne.',
    image: '/images/deliver_crane_skyline.jpg',
  },
  {
    name: 'Sophie Abena',
    role: 'Directrice des Opérations',
    bio: 'Spécialiste en gestion de projet, certifiée PMP, 15 ans dans le BTP africain.',
    image: '/images/create_blueprint_table.jpg',
  },
];

export default function Team() {
  const { t } = useTranslation();
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-card', 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: teamRef.current,
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
            <span className="text-sm text-[#007A5E] label-mono">NOTRE ÉQUIPE</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-white mb-4">
            {t('team.title')}
          </h1>
          <p className="text-xl text-[#A6AFBF]">{t('team.subtitle')}</p>
        </div>
      </section>

      {/* Leadership */}
      <section ref={teamRef} className="px-4 lg:px-[4vw] mb-20">
        <h2 className="heading-display text-2xl text-white mb-8">{t('team.direction')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((person, index) => (
            <div key={index} className="team-card bg-[#1A2744] rounded-sm overflow-hidden group">
              <div className="aspect-square overflow-hidden">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white font-['Sora'] mb-1">{person.name}</h3>
                <p className="text-[#D4A03A] text-sm mb-3">{person.role}</p>
                <p className="text-[#A6AFBF] text-sm leading-relaxed mb-4">{person.bio}</p>
                <div className="flex gap-3">
                  <a href="#" className="text-[#A6AFBF] hover:text-[#007A5E] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-[#A6AFBF] hover:text-[#007A5E] transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="px-4 lg:px-[4vw] py-20">
        <div className="bg-gradient-to-r from-[#007A5E] to-[#006B52] rounded-sm p-12 text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-white mb-4">
            REJOIGNEZ L'ÉQUIPE
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Vous souhaitez faire partie de l'aventure CamerOssaka ? Découvrez nos offres d'emploi.
          </p>
          <a
            href="/btp-connexion"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#007A5E] font-semibold rounded-sm hover:bg-[#F5F5F0] transition-colors"
          >
            Voir les offres
          </a>
          
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
