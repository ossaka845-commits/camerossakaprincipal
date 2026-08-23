import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlantedFrame from '../components/SlantedFrame';
import { Facebook, Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const squareCapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const frame = frameRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const squareCap = squareCapRef.current;

    if (!section || !bg || !frame || !headline || !subheadline || !cta || !squareCap) return;

    const ctx = gsap.context(() => {
      // Initial states (hidden)
      gsap.set(bg, { scale: 1.08, opacity: 0 });
      gsap.set(frame, { rotate: -20, opacity: 0, scale: 0.96 });
      gsap.set(squareCap, { opacity: 0, scale: 0.8 });
      gsap.set(headline.children, { x: '-12vw', opacity: 0 });
      gsap.set([subheadline, cta], { y: 24, opacity: 0 });

      // Auto-play entrance animation
      const entranceTl = gsap.timeline({ delay: 0.3 });

      entranceTl
        .to(bg, { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' })
        .to(frame, { rotate: -12, opacity: 0.9, scale: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6')
        .to(squareCap, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '-=0.5')
        .to(headline.children, { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out' }, '-=0.4')
        .to([subheadline, cta], { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.3');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible state when scrolling back to top
            gsap.to(bg, { scale: 1, y: 0, duration: 0.3 });
            gsap.to(headline.children, { x: 0, opacity: 1, duration: 0.3 });
            gsap.to(frame, { x: 0, rotate: -12, opacity: 0.9, duration: 0.3 });
            gsap.to([subheadline, cta], { opacity: 1, duration: 0.3 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(headline.children, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        )
        .fromTo(frame, 
          { x: 0, rotate: -12, opacity: 0.9 }, 
          { x: '-10vw', rotate: -18, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(squareCap, 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.75
        )
        .fromTo([subheadline, cta], 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.75
        )
        .fromTo(bg, 
          { scale: 1, y: 0 }, 
          { scale: 1.06, y: '-4vh', ease: 'none' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/images/hero_construction_site.jpg"
          alt="Construction site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/40 via-[#0D0D0D]/20 to-[#0D0D0D]/80" />
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 grid-blueprint opacity-60" />
      </div>

      {/* Gold Square Cap */}
      <div
        ref={squareCapRef}
        className="gold-square-cap"
        style={{ left: '8vw', top: '14vh' }}
      />

      {/* Slanted Frame */}
      <div ref={frameRef}>
        <SlantedFrame
          style={{
            left: '6vw',
            top: '18vh',
            width: '62vw',
            height: '56vh',
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-[10vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <h1 className="heading-display text-[clamp(44px,6vw,84px)] text-[#F7F8FB]">
            BUILDING THE
          </h1>
          <h1 className="heading-display text-[clamp(44px,6vw,84px)] text-[#CC1A1A]">
            FUTURE
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-lg md:text-xl text-[#666666] max-w-[34vw] mb-8 leading-relaxed"
        >
          General contracting and construction management for complex infrastructure.
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#work"
          className="cta-link text-lg"
        >
          Explore our work
        </a>

        {/* Social Media */}
        <div className="flex gap-4 mt-8">
          <a
            href="https://www.facebook.com/profile.php?id=100064047309007"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-sm bg-white/8 border border-[#CC1A1A]/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#CC1A1A]/20 hover:border-[#CC1A1A]/60 transition-all"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/camerossak/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-sm bg-white/8 border border-[#CC1A1A]/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#CC1A1A]/20 hover:border-[#CC1A1A]/60 transition-all"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.tiktok.com/@camerossaka"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-sm bg-white/8 border border-[#CC1A1A]/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#CC1A1A]/20 hover:border-[#CC1A1A]/60 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@Camer-ossakaConstruction-ol8nl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-sm bg-white/8 border border-[#CC1A1A]/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#CC1A1A]/20 hover:border-[#CC1A1A]/60 transition-all"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
