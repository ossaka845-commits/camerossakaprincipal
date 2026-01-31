import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const offices = [
 
  {
    city: 'Douala',
    country: 'Cameroun',
    flag: '🇨🇲',
    address: 'Akwa',
    phone: '+237 233 45 67 89',
    email: 'camerossaka@gmail.com',
    hours: 'Lun-Ven: 8h00 - 17h00',
  },
 
];

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.office-card', 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.offices-section',
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 lg:px-[4vw] mb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#007A5E]/20 border border-[#007A5E]/40 rounded-full mb-6">
            <span className="text-sm text-[#007A5E] label-mono">CONTACT</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-[#A6AFBF]">{t('contact.subtitle')}</p>
        </div>
      </section>

      {/* Offices */}
      <section className="offices-section px-4 lg:px-[4vw] mb-20">
        <h2 className="heading-display text-2xl text-white mb-8">{t('contact.addresses.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office, index) => (
            <div key={index} className="office-card bg-[#1A2744] p-6 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{office.flag}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white font-['Sora']">{office.city}</h3>
                  <p className="text-[#A6AFBF] text-sm">{office.country}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-[#A6AFBF]">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#007A5E]" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center gap-3 text-[#A6AFBF]">
                  <Phone className="w-5 h-5 flex-shrink-0 text-[#007A5E]" />
                  <a href={`tel:${office.phone}`} className="hover:text-[#D4A03A] transition-colors">
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#A6AFBF]">
                  <Mail className="w-5 h-5 flex-shrink-0 text-[#007A5E]" />
                  <a href={`mailto:${office.email}`} className="hover:text-[#D4A03A] transition-colors">
                    {office.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#A6AFBF]">
                  <Clock className="w-5 h-5 flex-shrink-0 text-[#007A5E]" />
                  <span>{office.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Google Maps */}
      <section className="px-4 lg:px-[4vw] mb-20">
        <h2 className="heading-display text-2xl text-white mb-8">Nous localiser</h2>
        <div className="rounded-sm overflow-hidden h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15918.881762814756!2d9.6945!3d4.0435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128f9c9e5c9d%3A0x9c8f6c3a4b0c7d8e!2sAkwa%2C%20Douala%2C%20Cameroun!5e0!3m2!1sfr!2sfr!4v1706700000000!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation CamerOssaka - Akwa, Douala, Cameroun"
          ></iframe>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 lg:px-[4vw] py-20 bg-[#1A2744]">
        <div className="max-w-2xl mx-auto">
          <h2 className="heading-display text-2xl text-white mb-8 text-center">
            Envoyez-nous un message
          </h2>
          
          {isSubmitted ? (
            <div className="bg-[#007A5E]/20 border border-[#007A5E] rounded-sm p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#007A5E] rounded-full flex items-center justify-center">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Message envoyé !</h3>
              <p className="text-[#A6AFBF]">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label-mono text-[#A6AFBF] mb-2 block">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#0B0F17] border-[#2A3441] text-white placeholder:text-[#4A5568] h-12"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="label-mono text-[#A6AFBF] mb-2 block">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#0B0F17] border-[#2A3441] text-white placeholder:text-[#4A5568] h-12"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label-mono text-[#A6AFBF] mb-2 block">
                  Téléphone
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-[#0B0F17] border-[#2A3441] text-white placeholder:text-[#4A5568] h-12"
                  placeholder="+237 6XX XXX XXX"
                />
              </div>
              <div>
                <label className="label-mono text-[#A6AFBF] mb-2 block">
                  {t('contact.form.subject')}
                </label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-[#0B0F17] border-[#2A3441] text-white placeholder:text-[#4A5568] h-12"
                  placeholder="Sujet de votre message"
                  required
                />
              </div>
              <div>
                <label className="label-mono text-[#A6AFBF] mb-2 block">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-[#0B0F17] border-[#2A3441] text-white placeholder:text-[#4A5568] min-h-[150px] resize-none"
                  placeholder="Votre message..."
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#007A5E] hover:bg-[#006B52] text-white font-semibold py-6 h-auto"
              >
                <Send className="w-5 h-5 mr-2" />
                {t('contact.form.send')}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Social Media */}
      <section className="px-4 lg:px-[4vw] py-16 bg-[#1A2744]">
        <div className="text-center">
          <h2 className="heading-display text-2xl text-white mb-6">Suivez-nous</h2>
          <div className="flex justify-center gap-6">
            <a 
              href="https://www.facebook.com/profile.php?id=100064047309007" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#0B0F17] rounded-full flex items-center justify-center text-[#A6AFBF] hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-all duration-300"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="https://www.instagram.com/camerossak/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#0B0F17] rounded-full flex items-center justify-center text-[#A6AFBF] hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-all duration-300"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://www.tiktok.com/@camerossaka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#0B0F17] rounded-full flex items-center justify-center text-[#A6AFBF] hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@Camer-ossakaConstruction-ol8nl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#0B0F17] rounded-full flex items-center justify-center text-[#A6AFBF] hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-all duration-300"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
