import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlantedFrame from '../components/SlantedFrame';

gsap.registerPlugin(ScrollTrigger);

export default function ModernSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const frame = frameRef.current;
    const textGroup = textGroupRef.current;

    if (!section || !image || !frame || !textGroup) return;

    const textElements = textGroup.children;

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
        .fromTo(image, 
          { x: '70vw', opacity: 0, scale: 0.97 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo(frame, 
          { rotate: -22, opacity: 0, x: '12vw' }, 
          { rotate: -12, opacity: 0.9, x: 0, ease: 'power2.out' }, 
          0.08
        )
        .fromTo(textElements[0], 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0.06
        )
        .fromTo([textElements[1], textElements[2]], 
          { y: '8vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.04 }, 
          0.14
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(textElements, 
          { x: 0, opacity: 1 }, 
          { x: '-10vw', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        )
        .fromTo(image, 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(frame, 
          { rotate: -12, opacity: 0.9 }, 
          { rotate: -6, opacity: 0, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-[60] bg-[#0B0F17]"
    >
      {/* Right Image Card */}
      <div
        ref={imageRef}
        className="image-card absolute"
        style={{
          left: '54vw',
          top: '18vh',
          width: '40vw',
          height: '54vh',
        }}
      >
        <img
          src="/images/modern_concrete_wall.jpg"
          alt="Modern concrete"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slanted Frame */}
      <div ref={frameRef}>
        <SlantedFrame
          style={{
            left: '50vw',
            top: '12vh',
            width: '48vw',
            height: '62vh',
          }}
        />
      </div>

      {/* Left Text Group */}
      <div ref={textGroupRef} className="absolute" style={{ left: '10vw', top: '22vh' }}>
        <h2 className="heading-display text-[clamp(48px,7vw,96px)] text-[#F7F8FB] mb-6">
          MODERN
        </h2>
        <p className="text-[#A6AFBF] text-lg leading-relaxed max-w-[36vw] mb-8">
          BIM, prefabrication, and sustainable materials—built for performance and compliance.
        </p>
        <a href="#innovation" className="cta-link text-lg">
          Explore innovation
        </a>
      </div>
    </section>
  );
}
