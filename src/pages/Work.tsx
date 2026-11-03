import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

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
  const projectTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedProject === null) projectTriggerRef.current?.focus();
  }, [selectedProject]);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
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
    });
    return () => media.revert();
  }, []);

  return (
    <Dialog open={selectedProject !== null} onOpenChange={(open) => { if (!open) setSelectedProject(null); }}>
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 lg:px-[4vw] mb-12">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3B1F8A]/10 border border-[#3B1F8A]/40 rounded-full mb-6">
            <span className="text-sm text-[#3B1F8A] label-mono">{t('work.badge')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#2C2834] mb-4">
            {t('work.title')}
          </h1>
          <p className="text-xl text-[#68636E]">{t('work.subtitle')}</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="px-4 lg:px-[4vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                className="project-card group block w-full bg-white border border-[#E8E4DE] shadow-sm rounded-2xl overflow-hidden text-left cursor-pointer hover:border-[#CE1126] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#CE1126] transition-shadow"
                onClick={(event) => {
                  projectTriggerRef.current = event.currentTarget;
                  setSelectedProject(project);
                }}
                aria-haspopup="dialog"
              >
              <span className="relative block aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-4 left-4 right-4">
                  <span className="flex items-center gap-2 text-sm text-white/80 mb-2">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    {project.location}
                  </span>
                  <span className="block text-lg font-semibold text-white font-['Sora'] line-clamp-2">
                    {project.title}
                  </span>
                </span>
              </span>
              </button>
          ))}
        </div>
      </section>

      {selectedProject && (
        <DialogContent aria-modal="true" className="max-w-3xl max-h-[90vh] overflow-auto rounded-xl bg-white p-0" showCloseButton={false}>
          <div className="relative aspect-video">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                type="button"
                aria-label={t('common.close')}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 text-[#CE1126] border border-[#CE1126] text-xl rounded-full flex items-center justify-center hover:bg-[#CE1126] hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#68636E]">{selectedProject.location}</span>
              </div>
              <DialogTitle className="heading-display text-3xl text-[#2C2834] mb-4">
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="text-[#68636E] mb-6 leading-relaxed">
                {selectedProject.description}
              </DialogDescription>
            </div>
        </DialogContent>
      )}
    </div>
    </Dialog>
  );
}
