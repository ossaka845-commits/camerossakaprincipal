import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlantedFrame from '../components/SlantedFrame';

gsap.registerPlugin(ScrollTrigger);

export default function ReliableSection() {
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
          { x: '-70vw', opacity: 0, scale: 0.97 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo(frame, 
          { rotate: -22, opacity: 0, x: '-12vw' }, 
          { rotate: -12, opacity: 0.9, x: 0, ease: 'power2.out' }, 
          0.08
        )
        .fromTo(textElements[0], 
          { x: '40vw', opacity: 0 }, 
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
        .fromTo(image, 
          { x: 0, opacity: 1 }, 
          { x: '-10vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(textElements, 
          { x: 0, opacity: 1 }, 
          { x: '10vw', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        )
        .fromTo(frame, 
          { rotate: -12, opacity: 0.9 }, 
          { rotate: -4, opacity: 0, ease: 'power2.in' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-[70] bg-white"
    >
      {/* Left Image Card */}
      <div
        ref={imageRef}
        className="image-card absolute"
        style={{
          left: '6vw',
          top: '18vh',
          width: '40vw',
          height: '54vh',
        }}
      >
        <img
          src="/images/reliable_team_meeting.jpg"
          alt="Team meeting"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slanted Frame */}
      <div ref={frameRef}>
        <SlantedFrame
          style={{
            left: '2vw',
            top: '12vh',
            width: '48vw',
            height: '62vh',
          }}
        />
      </div>

      {/* Right Text Group */}
      <div ref={textGroupRef} className="absolute" style={{ left: '56vw', top: '22vh' }}>
        <h2 className="heading-display text-[clamp(48px,7vw,96px)] text-[#F7F8FB] mb-6">
          RELIABLE
        </h2>
        <p className="text-[#666666] text-lg leading-relaxed max-w-[36vw] mb-8">
          Safety-first operations, clear reporting, and teams that stay accountable from kickoff to warranty.
        </p>
        <a href="#team" className="cta-link text-lg">
          Meet the team
        </a>
      </div>
    </section>
  );
}
