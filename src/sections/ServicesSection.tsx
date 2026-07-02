import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, ClipboardList, Lightbulb, Calendar, Wrench, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: HardHat, title: 'General Contracting', description: 'Full-service construction delivery with single-point accountability.' },
  { icon: ClipboardList, title: 'Construction Management', description: 'Expert oversight of schedules, budgets, and trade coordination.' },
  { icon: Lightbulb, title: 'Design-Build', description: 'Integrated design and construction for faster delivery.' },
  { icon: Calendar, title: 'Preconstruction & Planning', description: 'Feasibility, estimating, and scheduling before breaking ground.' },
  { icon: Wrench, title: 'Self-Perform Trades', description: 'Direct control of critical trades for quality and schedule.' },
  { icon: Leaf, title: 'Sustainability & Compliance', description: 'Green building certifications and regulatory adherence.' },
];

const industries = ['Commercial', 'Industrial', 'Healthcare', 'Education', 'Infrastructure'];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const intro = introRef.current;
    const servicesEl = servicesRef.current;
    const industriesEl = industriesRef.current;

    if (!section || !headline || !intro || !servicesEl || !industriesEl) return;

    const serviceItems = servicesEl.children;
    const industryItems = industriesEl.children;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline, 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
          }
        }
      );

      // Intro animation
      gsap.fromTo(intro, 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: intro,
            start: 'top 80%',
          }
        }
      );

      // Services animation
      gsap.fromTo(serviceItems, 
        { y: 60, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesEl,
            start: 'top 75%',
          }
        }
      );

      // Industries animation
      gsap.fromTo(industryItems, 
        { scale: 0.98, opacity: 0 }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: industriesEl,
            start: 'top 85%',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative z-[80] bg-white py-28 lg:py-36 overflow-hidden"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 grid-blueprint" />
      {/* Faint radial gradient to focus center */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-[#0D0D0D]/70 pointer-events-none" />

      <div className="relative px-6 lg:px-[6vw]">
        {/* Top label */}
        <div className="tech-label mb-6">EXPERTISE & CAPACITÉS</div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="heading-display text-[clamp(32px,4vw,56px)] text-[#F7F8FB] mb-6"
        >
          SERVICES &amp; EXPERTISE
        </h2>

        {/* Intro */}
        <p
          ref={introRef}
          className="text-lg text-[#666666] max-w-[52vw] mb-20 leading-relaxed"
        >
          We manage complexity—so you can focus on outcomes.
        </p>

        {/* Services Grid */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#EBEBEB]/60 mb-20 border border-[#EBEBEB]/60"
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group p-8 bg-white hover:bg-[#0f1a27] transition-colors duration-300 relative"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#CC1A1A]/30 group-hover:border-[#CC1A1A]/70 transition-colors duration-300" />
              {/* Index */}
              <span className="label-mono text-[#3e5261] mb-6 block">{String(i + 1).padStart(2, '0')}</span>
              <service.icon
                className="w-8 h-8 text-[#CC1A1A] mb-6 transition-transform duration-300 group-hover:scale-105"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-semibold text-[#F7F8FB] mb-3 font-['Space_Grotesk'] tracking-tight">
                {service.title}
              </h3>
              <p className="text-[#666666] leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Industries */}
        <div>
          <h3 className="label-mono text-[#3e5261] mb-6">SECTORS</h3>
          <div ref={industriesRef} className="flex flex-wrap gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-5 py-2.5 border border-[#CC1A1A]/30 text-[#CC1A1A] text-sm font-medium hover:bg-[#CC1A1A]/10 hover:border-[#CC1A1A]/60 transition-all duration-300 rounded-sm cursor-default tracking-wide"
                style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.15em' }}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
