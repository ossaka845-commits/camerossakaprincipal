import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  location: string;
  country: 'cameroon' | 'africa' | 'europe';
  type: 'infrastructure' | 'building' | 'industrial';
  image: string;
  description: string;
}

export default function Work() {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      id: 1,
      title: t('work.projects.p1.title'),
      location: t('work.projects.p1.location'),
      country: 'cameroon',
      type: 'infrastructure',
      image: '/images/build_concrete_structure.jpg',
      description: t('work.projects.p1.description')
    },
    {
      id: 2,
      title: t('work.projects.p2.title'),
      location: t('work.projects.p2.location'),
      country: 'africa',
      type: 'infrastructure',
      image: '/images/image6.webp',
      description: t('work.projects.p2.description')
    },
    {
      id: 3,
      title: t('work.projects.p3.title'),
      location: t('work.projects.p3.location'),
      country: 'africa',
      type: 'building',
      image: '/images/modern_concrete_wall.jpg',
      description: t('work.projects.p3.description')
    },
    {
      id: 4,
      title: t('work.projects.p4.title'),
      location: t('work.projects.p4.location'),
      country: 'africa',
      type: 'building',
      image: '/images/3persone.webp',
      description: t('work.projects.p4.description')
    },
    {
      id: 5,
      title: t('work.projects.p5.title'),
      location: t('work.projects.p5.location'),
      country: 'africa',
      type: 'building',
      image: '/images/image8.webp',
      description: t('work.projects.p5.description')
    },
    {
      id: 6,
      title: t('work.projects.p6.title'),
      location: t('work.projects.p6.location'),
      country: 'africa',
      type: 'industrial',
      image: '/images/image4.webp',
      description: t('work.projects.p6.description')
    },
  ];
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

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 lg:px-[4vw] mb-12">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CE1126]/10 border border-[#CE1126]/40 rounded-full mb-6">
            <span className="text-sm text-[#CE1126] label-mono">{t('work.badge')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#111111] mb-4">
            {t('work.title')}
          </h1>
          <p className="text-xl text-[#666666]">{t('work.subtitle')}</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="px-4 lg:px-[4vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group bg-white border border-[#E5E5E5] shadow-sm rounded-sm overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <h3 className="text-lg font-semibold text-white font-['Sora'] line-clamp-2">
                    {project.title}
                  </h3>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-auto"
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
                aria-label="Fermer"
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 text-[#111111] text-xl rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#666666]">{selectedProject.location}</span>
              </div>
              <h2 className="heading-display text-3xl text-[#111111] mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-[#666666] mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
