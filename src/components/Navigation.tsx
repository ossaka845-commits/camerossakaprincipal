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
            ? 'bg-[#0b141f]/95 backdrop-blur-md border-b border-[#1e2d3d] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="px-6 lg:px-[6vw] flex items-center justify-between">
          {/* Logo */}
        <a href="#" className="group flex items-center gap-1 text-xl font-bold tracking-tight font-['Space_Grotesk']">
            <span className="text-[#F7F8FB]">Camer</span><span className="text-[#79d8b7] group-hover:text-[#a8e8d4] transition-colors">Ossaka</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#666666] hover:text-[#79d8b7] transition-colors duration-300 label-mono"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-5 py-2 text-sm font-medium text-[#0b141f] bg-[#79d8b7] hover:bg-[#a8e8d4] transition-colors duration-300 rounded-sm label-mono"
            >
              CONTACT
            </a>
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
            <span className="text-xl font-bold tracking-tight font-['Space_Grotesk']">
              Camer<span className="text-[#79d8b7]">Ossaka</span>
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
                className="text-3xl font-bold text-[#F7F8FB] hover:text-[#79d8b7] transition-colors duration-300 font-['Space_Grotesk']"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto">
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-[#79d8b7] text-[#0b141f] font-semibold rounded-sm"
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
