import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlantedFrame from '../components/SlantedFrame';

gsap.registerPlugin(ScrollTrigger);

export default function CreateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const frame = frameRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const stats = statsRef.current;

    if (!section || !image || !frame || !headline || !body || !stats) return;

    const statItems = stats.children;

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
          { x: '-70vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo(frame, 
          { rotate: -22, opacity: 0, x: '-8vw' }, 
          { rotate: -12, opacity: 0.9, x: 0, ease: 'power2.out' }, 
          0.08
        )
        .fromTo(headline, 
          { x: '40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out' }, 
          0.06
        )
        .fromTo(body, 
          { y: '8vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out' }, 
          0.14
        )
        .fromTo(statItems, 
          { y: '6vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.04 }, 
          0.18
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(image, 
          { y: 0, opacity: 1 }, 
          { y: '-10vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([headline, body], 
          { x: 0, opacity: 1 }, 
          { x: '10vw', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        )
        .fromTo(frame, 
          { rotate: -12, opacity: 0.9 }, 
          { rotate: -6, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(statItems, 
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
      className="section-pinned z-40 bg-[#0B0F17]"
    >
      {/* Left Image Block */}
      <div
        ref={imageRef}
        className="image-card absolute"
        style={{
          left: '6vw',
          top: '18vh',
          width: '40vw',
          height: '52vh',
        }}
      >
        <img
          src="/images/create_blueprint_table.jpg"
          alt="Blueprints"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slanted Frame */}
      <div ref={frameRef}>
        <SlantedFrame
          style={{
            left: '3vw',
            top: '12vh',
            width: '46vw',
            height: '60vh',
          }}
        />
      </div>

      {/* Right Headline */}
      <h2
        ref={headlineRef}
        className="heading-display absolute text-[clamp(48px,7vw,96px)] text-[#F7F8FB]"
        style={{ left: '56vw', top: '20vh' }}
      >
        CREATE
      </h2>

      {/* Right Body */}
      <p
        ref={bodyRef}
        className="absolute text-[#A6AFBF] text-lg leading-relaxed"
        style={{ left: '56vw', top: '34vh', width: '36vw' }}
      >
        Design-build, value engineering, and constructability reviews that reduce risk before ground breaks.
      </p>

      {/* Stats Row */}
      <div
        ref={statsRef}
        className="absolute flex gap-12"
        style={{ left: '56vw', top: '58vh' }}
      >
        <div className="stat-item">
          <div className="stat-number">120+</div>
          <div className="stat-label">Projects</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">18</div>
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">98%</div>
          <div className="stat-label">On-time</div>
        </div>
      </div>
    </section>
  );
}
