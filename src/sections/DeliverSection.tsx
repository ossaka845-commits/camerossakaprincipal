import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SlantedFrame from '../components/SlantedFrame';

gsap.registerPlugin(ScrollTrigger);

export default function DeliverSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const textGroup = textGroupRef.current;
    const image = imageRef.current;
    const frame = frameRef.current;
    const milestones = milestonesRef.current;

    if (!section || !textGroup || !image || !frame || !milestones) return;

    const textElements = textGroup.children;
    const milestoneItems = milestones.children;

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
        .fromTo(textElements, 
          { x: '-50vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'power2.out', stagger: 0.04 }, 
          0
        )
        .fromTo(image, 
          { x: '60vw', opacity: 0, scale: 0.98 }, 
          { x: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 
          0.06
        )
        .fromTo(frame, 
          { rotate: -22, opacity: 0, x: '10vw' }, 
          { rotate: -12, opacity: 0.9, x: 0, ease: 'power2.out' }, 
          0.1
        )
        .fromTo(milestoneItems, 
          { y: '6vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.03 }, 
          0.16
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(textElements, 
          { x: 0, opacity: 1 }, 
          { x: '-8vw', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        )
        .fromTo(image, 
          { x: 0, opacity: 1 }, 
          { x: '8vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(frame, 
          { opacity: 0.9 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(milestoneItems, 
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
      className="section-pinned z-50 bg-white"
    >
      {/* Left Text Block */}
      <div ref={textGroupRef} className="absolute" style={{ left: '10vw', top: '18vh' }}>
        <h2 className="heading-display text-[clamp(48px,7vw,96px)] text-[#F7F8FB] mb-6">
          DELIVER
        </h2>
        <p className="text-[#666666] text-lg leading-relaxed max-w-[34vw] mb-8">
          Scheduling, logistics, and field coordination—delivered on time and within scope.
        </p>
        <a href="#process" className="cta-link text-lg">
          View our process
        </a>
      </div>

      {/* Right Blueprint Image */}
      <div
        ref={imageRef}
        className="image-card absolute"
        style={{
          left: '52vw',
          top: '18vh',
          width: '42vw',
          height: '56vh',
        }}
      >
        <img
          src="/images/deliver_crane_skyline.jpg"
          alt="Crane skyline"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slanted Frame */}
      <div ref={frameRef}>
        <SlantedFrame
          style={{
            left: '62vw',
            top: '8vh',
            width: '34vw',
            height: '44vh',
          }}
        />
      </div>

      {/* Milestones */}
      <div
        ref={milestonesRef}
        className="absolute flex gap-8"
        style={{ left: '52vw', top: '78vh', width: '42vw' }}
      >
        {['Planning', 'Procurement', 'Handover'].map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <span className="text-[#CC1A1A] label-mono">0{index + 1}</span>
            <span className="text-[#F7F8FB] font-medium">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
