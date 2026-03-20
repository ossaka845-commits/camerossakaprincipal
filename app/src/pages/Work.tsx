import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Maximize2, Facebook, Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  location: string;
  country: 'cameroon' | 'africa' | 'europe';
  type: 'infrastructure' | 'building' | 'industrial';
  year: number;
  surface: string;
  budget: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'R+2 a',
    location: 'Yaoundé',
    country: 'cameroon',
    type: 'infrastructure',
    year: 2022,
    surface: '45,000 m²',
    budget: '55,7 Mds FCFA',
    image: '/images/build_concrete_structure.jpg',
    description: 'Rénovation complète du stade emblématique du Cameroun, capacité 40,000 spectateurs.'
  },
  {
    id: 2,
    title: 'Centre Commercial Douala Grand Mall',
    location: 'Douala',
    country: 'cameroon',
    type: 'building',
    year: 2023,
    surface: '28,000 m²',
    budget: '27,5 Mds FCFA',
    image: '/images/build_steel_beams.jpg',
    description: 'Complexe commercial moderne avec 120 boutiques, restaurants et cinéma.'
  },
  {
    id: 3,
    title: 'Autoroute Lagos-Abidjan - Section Ouest',
    location: 'Nigeria / Côte d\'Ivoire',
    country: 'africa',
    type: 'infrastructure',
    year: 2021,
    surface: '180 km',
    budget: '209,9 Mds FCFA',
    image: '/images/deliver_crane_skyline.jpg',
    description: 'Construction de 180 km d\'autoroute moderne reliant deux capitales économiques.'
  },
  {
    id: 4,
    title: 'Siège Social CamerOssaka Europe',
    location: 'Berlin',
    country: 'europe',
    type: 'building',
    year: 2023,
    surface: '12,000 m²',
    budget: '18,4 Mds FCFA',
    image: '/images/modern_concrete_wall.jpg',
    description: 'Bâtiment HQE certifié LEED Platinum, symbole de notre expansion européenne.'
  },
  {
    id: 5,
    title: 'Hôpital Universitaire de Yaoundé',
    location: 'Yaoundé',
    country: 'cameroon',
    type: 'building',
    year: 2020,
    surface: '35,000 m²',
    budget: '42,6 Mds FCFA',
    image: '/images/create_blueprint_table.jpg',
    description: 'Centre hospitalier universitaire de dernière génération, 500 lits.'
  },
  {
    id: 6,
    title: 'Usine de Transformation Cacao',
    location: 'San-Pédro',
    country: 'africa',
    type: 'industrial',
    year: 2022,
    surface: '52,000 m²',
    budget: '62,3 Mds FCFA',
    image: '/images/reliable_team_meeting.jpg',
    description: 'Unité industrielle de transformation du cacao, capacité 50,000 tonnes/an.'
  },
];

export default function Work() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      cameroon: '🇨🇲',
      africa: '🌍',
      europe: '🇪🇺',
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 lg:px-[4vw] mb-12">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#007A5E]/20 border border-[#007A5E]/40 rounded-full mb-6">
            <span className="text-sm text-[#007A5E] label-mono">PORTFOLIO</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-white mb-4">
            {t('work.title')}
          </h1>
          <p className="text-xl text-[#A6AFBF]">{t('work.subtitle')}</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="px-4 lg:px-[4vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group bg-[#1A2744] rounded-sm overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4">
                  <span className="text-2xl">{getCountryFlag(project.country)}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-sm text-[#A6AFBF] mb-2">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <h3 className="text-lg font-semibold text-white font-['Sora'] line-clamp-2">
                    {project.title}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-[#A6AFBF]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-4 h-4" />
                    {project.surface}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#2A3441]">
                  <span className="text-[#D4A03A] font-semibold">{project.budget}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F17]/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-[#1A2744] rounded-sm max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#0B0F17]/80 text-white rounded-full flex items-center justify-center hover:bg-[#0B0F17] transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{getCountryFlag(selectedProject.country)}</span>
                <span className="text-[#A6AFBF]">{selectedProject.location}</span>
              </div>
              <h2 className="heading-display text-3xl text-white mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-[#A6AFBF] mb-6 leading-relaxed">
                {selectedProject.description}
              </p>
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-[#2A3441]">
                <div>
                  <div className="text-sm text-[#A6AFBF] mb-1">Année</div>
                  <div className="text-white font-semibold">{selectedProject.year}</div>
                </div>
                <div>
                  <div className="text-sm text-[#A6AFBF] mb-1">Surface</div>
                  <div className="text-white font-semibold">{selectedProject.surface}</div>
                </div>
                <div>
                  <div className="text-sm text-[#A6AFBF] mb-1">Budget</div>
                  <div className="text-[#D4A03A] font-semibold">{selectedProject.budget}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
