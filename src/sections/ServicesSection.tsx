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
      className="relative z-[80] bg-[#F4F6FA] py-24 lg:py-32"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="heading-display text-[clamp(32px,4vw,56px)] text-[#0B0F17] mb-6"
        >
          SERVICES & EXPERTISE
        </h2>

        {/* Intro */}
        <p
          ref={introRef}
          className="text-lg text-[#4A5568] max-w-[52vw] mb-16 leading-relaxed"
        >
          We manage complexity—so you can focus on outcomes.
        </p>

        {/* Services Grid */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <service.icon 
                className="w-10 h-10 text-[#D4A03A] mb-6 transition-transform duration-300 group-hover:scale-110" 
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-semibold text-[#0B0F17] mb-3 font-['Sora']">
                {service.title}
              </h3>
              <p className="text-[#4A5568] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Industries */}
        <div>
          <h3 className="label-mono text-[#4A5568] mb-6">INDUSTRIES</h3>
          <div ref={industriesRef} className="flex flex-wrap gap-4">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-6 py-3 border-2 border-[#D4A03A] text-[#0B0F17] font-medium rounded-full hover:bg-[#D4A03A] hover:text-white transition-colors duration-300"
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
