import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !body || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(headline, 
          { y: '18vh', opacity: 0, scale: 0.98 }, 
          { y: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 
          0.05
        )
        .fromTo(body, 
          { y: '10vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.12
        )
        .fromTo(cta, 
          { y: '6vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.18
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headline, 
          { y: 0, opacity: 1 }, 
          { y: '-10vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(body, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(cta, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.74
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned z-20 bg-white flex items-center justify-center"
    >
      {/* Vignette */}
      <div className="vignette" />
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 grid-blueprint" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[72vw]">
        <h2
          ref={headlineRef}
          className="heading-display text-[clamp(38px,5vw,72px)] text-[#F7F8FB] mb-8"
        >
          CONSTRUCTION SOLUTIONS
        </h2>

        <p
          ref={bodyRef}
          className="text-lg md:text-xl text-[#666666] max-w-[44vw] mx-auto mb-10 leading-relaxed"
        >
          From preconstruction planning to closeout, we coordinate trades, timelines, and budgets—so your project hits mark.
        </p>

        <a
          ref={ctaRef}
          href="#work"
          className="cta-link text-lg"
        >
          See how we work
        </a>
      </div>
    </section>
  );
}
