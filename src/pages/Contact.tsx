import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateAndSendForm } from '@/lib/formMailer';

gsap.registerPlugin(ScrollTrigger);

const offices = [
 
  {
    city: 'Douala',
    country: 'Cameroun',
    address: 'Logpom',
    phone: '+237 6 92 83 13 34',
    email: 'contact@co-connexion.com',
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
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
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
    });
    return () => media.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await generateAndSendForm({
        title: 'FORMULAIRE DE CONTACT',
        senderName: formData.name,
        senderEmail: formData.email,
        fields: [
          { label: 'Nom', value: formData.name },
          { label: 'Email', value: formData.email },
          { label: 'Téléphone', value: formData.phone },
          { label: 'Sujet', value: formData.subject },
          { label: 'Message', value: formData.message },
        ],
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Erreur:', err);
      setError(t('contact.form.sendError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Offices */}
      <section className="offices-section page-container mb-20">
        <h2 className="heading-display text-2xl text-[#111111] mb-8">{t('contact.addresses.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E5E5E5]">
          {offices.map((office, index) => (
            <div key={index} className="office-card border-r border-b border-[#E5E5E5] bg-white p-6 hover:bg-[#F8F8F8] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#111111] font-['Sora']">{office.city}</h3>
                  <p className="text-[#666666] text-sm">{office.country}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-[#666666]">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#CE1126]" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center gap-3 text-[#666666]">
                  <Phone className="w-5 h-5 flex-shrink-0 text-[#CE1126]" />
                  <a href={`tel:${office.phone}`} className="hover:text-[#111111] transition-colors">
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#666666]">
                  <Mail className="w-5 h-5 flex-shrink-0 text-[#CE1126]" />
                  <a href={`mailto:${office.email}`} className="hover:text-[#111111] transition-colors">
                    {office.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-[#666666]">
                  <Clock className="w-5 h-5 flex-shrink-0 text-[#CE1126]" />
                  <span>{office.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Google Maps */}
      <section className="page-container mb-20">
        <h2 className="heading-display text-2xl text-[#111111] mb-8">{t('contact.findUs')}</h2>
        <div className="overflow-hidden h-[400px] border border-[#E5E5E5]">
          <iframe
            src="https://www.google.com/maps?q=Logpom%2C%20Douala%2C%20Cameroun&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation Camer-Ossaka Connexion - Logpom, Douala, Cameroun"
          ></iframe>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[#F8F8F8]">
        <div className="page-container max-w-2xl">
          <h2 className="heading-display text-2xl text-[#111111] mb-8 text-center">
            {t('contact.sendMessage')}
          </h2>
          
          {isSubmitted ? (
            <div role="status" aria-live="polite" className="bg-[#CE1126]/10 border border-[#CE1126] p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#CE1126] rounded-full flex items-center justify-center">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#111111] mb-2">{t('contact.messageSent')}</h3>
              <p className="text-[#666666]">{t('contact.messageReply')}</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div role="alert" className="bg-[#CE1126]/10 border border-[#CE1126] rounded-xl p-4 text-[#CE1126] text-sm">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="label-mono text-[#666666] mb-2 block">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white border-[#E5E5E5] text-[#111111] placeholder:text-[#999999] h-12"
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="label-mono text-[#666666] mb-2 block">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white border-[#E5E5E5] text-[#111111] placeholder:text-[#999999] h-12"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-phone" className="label-mono text-[#666666] mb-2 block">
                  {t('contact.form.phone')}
                </label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white border-[#E5E5E5] text-[#111111] placeholder:text-[#999999] h-12"
                  placeholder={t('contact.form.phonePlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="label-mono text-[#666666] mb-2 block">
                  {t('contact.form.subject')}
                </label>
                <Input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-white border-[#E5E5E5] text-[#111111] placeholder:text-[#999999] h-12"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="label-mono text-[#666666] mb-2 block">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white border-[#E5E5E5] text-[#111111] placeholder:text-[#999999] min-h-[150px] resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary font-semibold py-6 h-auto rounded-full"
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t('common.sending')}</>
                ) : (
                  <><Send className="w-5 h-5 mr-2" />{t('contact.form.send')}</>
                )}
              </Button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
