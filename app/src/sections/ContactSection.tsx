import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your inquiry! We will respond within two business days.');
    setFormData({ name: '', email: '', details: '' });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subcopy = subcopyRef.current;
    const form = formRef.current;
    const contactInfo = contactInfoRef.current;

    if (!section || !headline || !subcopy || !form || !contactInfo) return;

    const formFields = form.children;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline, 
        { y: 30, opacity: 0 }, 
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

      // Subcopy animation
      gsap.fromTo(subcopy, 
        { y: 30, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subcopy,
            start: 'top 80%',
          }
        }
      );

      // Form fields animation
      gsap.fromTo(formFields, 
        { y: 20, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
          }
        }
      );

      // Contact info animation
      gsap.fromTo(contactInfo, 
        { x: 40, opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactInfo,
            start: 'top 75%',
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-[90] bg-[#0B0F17] py-24 lg:py-32"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="heading-display text-[clamp(38px,5vw,72px)] text-[#F7F8FB] mb-4"
        >
          READY TO START?
        </h2>

        {/* Subcopy */}
        <p
          ref={subcopyRef}
          className="text-lg text-[#A6AFBF] max-w-[50vw] mb-12 leading-relaxed"
        >
          Tell us what you're building. We'll respond within two business days.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label-mono text-[#A6AFBF] mb-2 block">NAME</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#1A1F2A] border-[#2A3441] text-[#F7F8FB] placeholder:text-[#4A5568] h-12"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="label-mono text-[#A6AFBF] mb-2 block">EMAIL</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#1A1F2A] border-[#2A3441] text-[#F7F8FB] placeholder:text-[#4A5568] h-12"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="label-mono text-[#A6AFBF] mb-2 block">PROJECT DETAILS</label>
              <Textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="bg-[#1A1F2A] border-[#2A3441] text-[#F7F8FB] placeholder:text-[#4A5568] min-h-[140px] resize-none"
                placeholder="Tell us about your project..."
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-[#D4A03A] hover:bg-[#B88A2F] text-[#0B0F17] font-semibold px-8 py-6 h-auto text-base"
            >
              <Send className="w-5 h-5 mr-2" />
              Send inquiry
            </Button>
          </form>

          {/* Contact Info */}
          <div ref={contactInfoRef} className="space-y-8 lg:pl-8">
            <div>
              <h3 className="label-mono text-[#A6AFBF] mb-4">CONTACT</h3>
              <div className="space-y-4">
                <a
                  href="mailto:hello@camerossaka.com"
                  className="flex items-center gap-4 text-[#F7F8FB] hover:text-[#D4A03A] transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-[#D4A03A]" />
                  hello@camerossaka.com
                </a>
                <a
                  href="tel:+15550142200"
                  className="flex items-center gap-4 text-[#F7F8FB] hover:text-[#D4A03A] transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-[#D4A03A]" />
                  +1 (555) 014-2200
                </a>
              </div>
            </div>

            <div>
              <h3 className="label-mono text-[#A6AFBF] mb-4">MAIN OFFICE</h3>
              <div className="flex items-start gap-4 text-[#F7F8FB]">
                <MapPin className="w-5 h-5 text-[#D4A03A] mt-1 flex-shrink-0" />
                <span>4420 Industrial Parkway, Suite 800<br />Houston, TX 77032</span>
              </div>
            </div>

            <div>
              <h3 className="label-mono text-[#A6AFBF] mb-4">FOLLOW US</h3>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[#F7F8FB] hover:text-[#D4A03A] transition-colors duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-[#1A1F2A]">
        <div className="px-6 lg:px-[6vw] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#4A5568] text-sm">
            © 2024 CamerOssaka. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#4A5568] hover:text-[#F7F8FB] text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-[#4A5568] hover:text-[#F7F8FB] text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
