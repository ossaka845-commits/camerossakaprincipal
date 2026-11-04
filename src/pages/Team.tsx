import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const leadership = [
  {
    id: 'jeanMarie',
    name: 'Jean-Marie Ondoua, M.Sc.',
  },
  {
    id: 'livine',
    name: 'Livine Diana Pouako, M.Sc.',
  },
  {
    id: 'yannick',
    name: 'Yannick Moumbe Lambo,M.Sc.',
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
    <div className="min-h-screen bg-[#F8F8F8] pt-24 pb-16">
      {/* Header */}
      <section className="page-container mb-12 lg:mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-5 bg-[#CE1126]" />
              <span className="text-[10px] text-[#CE1126] label-mono">{t('team.badge')}</span>
            </div>
            <h1 className="heading-display text-[clamp(36px,5vw,56px)] text-[#111111] leading-[1.08]">
              {t('team.title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section ref={teamRef} className="page-container mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-[18px]">
          {leadership.map((person) => (
            <article
              key={person.name}
              className="team-card relative flex min-h-[310px] flex-col border border-[#E5E5E5] bg-white px-6 py-6 lg:px-[30px] lg:py-[28px] transition-colors duration-300 hover:border-[#CE1126]/50"
            >
              <div className="relative z-10">
                <h3 className="max-w-[90%] text-xl lg:text-[21px] font-semibold leading-[1.3] tracking-[-0.04em] text-[#111111] font-['Sora'] mb-2">
                  {person.name}
                </h3>
                <p className="text-[#CE1126] text-[12px] font-semibold leading-relaxed mb-4">{t(`team.members.${person.id}.role`)}</p>
                <p className="label-mono text-[#999999] text-[9px] mb-2">{t('team.profileLabel')}</p>
                <p className="text-[#666666] text-[13px] leading-[1.65]">{t(`team.members.${person.id}.bio`)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="px-4 py-20">
        <div className="page-container bg-[#CE1126] p-8 md:p-12 text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-white mb-4">
            {t('team.joinTitle')}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {t('team.joinDesc')}
          </p>
          <Link
            to="/btp-connexion"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#CE1126] border border-[#CE1126] font-semibold rounded-full hover:bg-[#CE1126] hover:text-white transition-colors"
          >
            {t('btpConnexion.jobs.title')}
          </Link>
        </div>
      </section>
    </div>
  );
}
