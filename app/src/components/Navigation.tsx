import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0F17]/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="px-6 lg:px-[6vw] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight font-['Sora']">
            Camer<span className="text-[#D4A03A]">Ossaka</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#A6AFBF] hover:text-[#F7F8FB] transition-colors duration-300 label-mono"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F7F8FB]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#0B0F17] transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full px-6 py-6">
          <div className="flex items-center justify-between mb-16">
            <span className="text-xl font-bold tracking-tight font-['Sora']">
              Camer<span className="text-[#D4A03A]">Ossaka</span>
            </span>
            <button
              className="text-[#F7F8FB]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-3xl font-bold text-[#F7F8FB] hover:text-[#D4A03A] transition-colors duration-300 font-['Sora']"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto">
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-[#D4A03A] text-[#0B0F17] font-semibold rounded-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
