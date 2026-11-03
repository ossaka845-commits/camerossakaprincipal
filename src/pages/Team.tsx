import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const leadership = [
  {
    name: 'Jean-Marie Ondoua, M.Sc.',
    role: 'Fondateur de Camer-Ossaka Connexion  Ingénieur civil & Entrepreneur',
    bio: "Ingénieur civil et entrepreneur, titulaire d'une licence en génie civil de l'Université de Buea au Cameroun et d'un Master of Science obtenu en Allemagne. Spécialisé en infrastructures et ingénierie environnementale, il exerce actuellement comme surveillant de chantier en Allemagne. Fort de son expertise technique et de son expérience internationale, il ambitionne, à travers Camer-Ossaka Connexion, de promouvoir le développement des infrastructures, les investissements stratégiques et les partenariats internationaux, particulièrement en Afrique.",
  },
  {
    name: 'Livine Diana Pouako, M.Sc.',
    role: 'Co-fondatrice | Ingénieure civile & Entrepreneure',
    bio: "Ingénieure civile et titulaire d'un Master en génie civil, elle possède une expertise technique et une vision entrepreneuriale orientée vers l'innovation et le développement durable. En tant que co-fondatrice de Camer-Ossaka Connexion, elle contribue à la définition des orientations stratégiques, au développement des projets et au rayonnement de l'entreprise. Son engagement, son savoir-faire et son esprit d'initiative participent à la construction d'une organisation ambitieuse, tournée vers l'excellence, les partenariats et la création de valeur.",
  },
  {
    name: 'Yannick Moumbe Lambo,M.Sc.',
    role: 'Ingénieur en informatique & Entrepreneur',
    bio: "Ingénieur en informatique et entrepreneur, titulaire d'une Licence et d'un Master en intelligence artificielle et automatisation obtenus en Allemagne. Il exerce actuellement en tant qu'ingénieur en intelligence artificielle , où il met son expertise au service du développement de solutions intelligentes et de l'automatisation des processus. Son parcours académique et professionnel associe technologies numériques, intelligence artificielle et systèmes intelligents. Au sein de Camer-Ossaka Connexion, il contribue à l'innovation technologique, au développement de solutions numériques avancées et à la réalisation des ambitions stratégiques de l'entreprise.",
  },
];

export default function Team() {
  const { t } = useTranslation();
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
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
    });
    return () => media.revert();
  }, []);

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 lg:px-[4vw] mb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CE1126]/10 border border-[#CE1126]/40 rounded-full mb-6">
            <span className="text-sm text-[#CE1126] label-mono">{t('team.badge')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#111111] mb-4">
            {t('team.title')}
          </h1>
          <p className="text-xl text-[#666666]">{t('team.subtitle')}</p>
        </div>
      </section>

      {/* Leadership */}
      <section ref={teamRef} className="px-4 lg:px-[4vw] mb-20">
        <h2 className="heading-display text-2xl text-[#111111] mb-8">{t('team.direction')}</h2>
        <div className="max-w-6xl mx-auto">
          {leadership.map((person) => (
            <article key={person.name} className="team-card grid grid-cols-1 md:grid-cols-[minmax(240px,0.8fr)_2fr] gap-6 md:gap-12 items-start border-b border-[#D8D8D8] py-8 md:py-10 first:border-t">
              <div>
                <h3 className="text-2xl font-semibold text-[#111111] font-['Sora'] mb-2">{person.name}</h3>
                <p className="text-[#CE1126] text-sm leading-relaxed">{person.role}</p>
              </div>
              <div>
                <p className="label-mono text-[#CE1126] text-[11px] mb-4">Parcours &amp; ambition</p>
                <p className="text-[#555555] text-base leading-relaxed">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="px-4 lg:px-[4vw] py-20">
        <div className="bg-gradient-to-r from-[#CE1126] to-[#A50E20] rounded-sm p-12 text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-white mb-4">
            REJOIGNEZ L'ÉQUIPE
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Vous souhaitez faire partie de l'aventure Camer-Ossaka Connexion ? Découvrez nos offres d'emploi.
          </p>
          <a
            href="/btp-connexion"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#CE1126] font-semibold rounded-sm hover:bg-[#F5F5F5] transition-colors"
          >
            Voir les offres
          </a>
          
          {/* Social Media */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">Suivez-nous sur les réseaux sociaux</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064047309007"
                aria-label={t('common.socialFacebook')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#CE1126] transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/camerossak/"
                aria-label={t('common.socialInstagram')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#CE1126] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@camerossaka"
                aria-label={t('common.socialTikTok')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#CE1126] transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@Camer-ossakaConstruction-ol8nl"
                aria-label={t('common.socialYoutube')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#CE1126] transition-all"
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
