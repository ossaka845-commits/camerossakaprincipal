import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlantedFrame from '../components/SlantedFrame';

gsap.registerPlugin(ScrollTrigger);

export default function BuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftImage = leftImageRef.current;
    const rightImage = rightImageRef.current;
    const frame = frameRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const label = labelRef.current;

    if (!section || !leftImage || !rightImage || !frame || !headline || !body || !label) return;

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
        .fromTo(leftImage, 
          { x: '-60vw', opacity: 0, scale: 0.96 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo(rightImage, 
          { x: '60vw', opacity: 0, scale: 0.96 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 
          0.06
        )
        .fromTo(frame, 
          { rotate: -22, opacity: 0, x: '-10vw' }, 
          { rotate: -12, opacity: 0.9, x: 0, ease: 'power2.out' }, 
          0.08
        )
        .fromTo(headline, 
          { y: '18vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.12
        )
        .fromTo([body, label], 
          { y: '6vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.03 }, 
          0.18
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(leftImage, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(rightImage, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(frame, 
          { rotate: -12, opacity: 0.9 }, 
          { rotate: -6, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([headline, body, label], 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.72
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-pinned z-30 bg-[#0B0F17]"
    >
      {/* Left Image Card */}
      <div
        ref={leftImageRef}
        className="image-card absolute"
        style={{
          left: '6vw',
          top: '18vh',
          width: '46vw',
          height: '56vh',
        }}
      >
        <img
          src="/images/build_concrete_structure.jpg"
          alt="Concrete structure"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Image Card */}
      <div
        ref={rightImageRef}
        className="image-card absolute"
        style={{
          left: '62vw',
          top: '34vh',
          width: '32vw',
          height: '34vh',
        }}
      >
        <img
          src="/images/build_steel_beams.jpg"
          alt="Steel beams"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slanted Frame */}
      <div ref={frameRef}>
        <SlantedFrame
          style={{
            left: '2vw',
            top: '10vh',
            width: '54vw',
            height: '64vh',
          }}
        />
      </div>

      {/* Headline */}
      <h2
        ref={headlineRef}
        className="heading-display absolute text-[clamp(48px,7vw,96px)] text-[#F7F8FB]"
        style={{ left: '10vw', top: '72vh' }}
      >
        BUILD
      </h2>

      {/* Body */}
      <p
        ref={bodyRef}
        className="absolute text-[#A6AFBF] text-lg leading-relaxed"
        style={{ left: '10vw', top: '82vh', width: '40vw' }}
      >
        Foundations, structures, and envelopes—engineered for longevity.
      </p>

      {/* Micro Label */}
      <span
        ref={labelRef}
        className="label-mono absolute text-[#D4A03A]"
        style={{ left: '78vw', top: '74vh' }}
      >
        01 / BUILD
      </span>
    </section>
  );
}
