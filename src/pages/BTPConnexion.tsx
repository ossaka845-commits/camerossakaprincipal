import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  Clock,
  Upload,
  Send,
  CheckCircle,
  HardHat,
  Zap,
  Droplets,
  Truck,
  UserCog,
  Cpu,
  PenTool,
  ClipboardList,
  Shield,
  Compass,
  Flame,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateAndSendForm } from '@/lib/formMailer';

gsap.registerPlugin(ScrollTrigger);

const jobOffers = [
  {
    id: 1,
    title: 'Secrétaire BTP (Bénévolat – 100 % en ligne)',
    location: 'Yaoundé, Cameroun',
    type: 'cdi',
    contract: 'Contrat à long terme',
    description: 'Capacité à prendre des notes claires et structurées lors des réunions en ligne, Sens de l\'organisation , Motivé(e) et esprit d’entreprise',
    requirements: ['Débutant(e) accepté(e)', 'Bac', 'Leadership'],
  },
];

const trades = [
  { key: 'mason', icon: Building2 },
  { key: 'carpenter', icon: PenTool },
  { key: 'electrician', icon: Zap },
  { key: 'plumber', icon: Droplets },
  { key: 'operator', icon: Truck },
  { key: 'foreman', icon: UserCog },
  { key: 'engineer', icon: Cpu },
  { key: 'architect', icon: Building2 },
  { key: 'projectManager', icon: ClipboardList },
  { key: 'safety', icon: Shield },
  { key: 'survey', icon: Compass },
  { key: 'welder', icon: Flame },
];

const testimonials = [
  {
    text: 'btpConnexion.testimonials.p1',
    author: 'Pierre K.',
    role: 'Chef de chantier',
    location: 'Cameroun',
  },
  {
    text: 'btpConnexion.testimonials.p2',
    author: 'Marie D.',
    role: 'Ingénieure',
    location: 'Allemagne',
  },
];

export default function BTPConnexion() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'jobs' | 'spontaneous'>('jobs');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [spontaneousCvFileName, setSpontaneousCvFileName] = useState<string | null>(null);
  const [portfolioFileName, setPortfolioFileName] = useState<string | null>(null);
  const [spontaneousData, setSpontaneousData] = useState({
    civility: 'mr',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country: '',
    trade: '',
    experience: '',
    education: '',
    coverLetter: '',
  });

  const jobsRef = useRef<HTMLDivElement>(null);
  const tradesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.job-card', 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: jobsRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.trade-card', 
        { scale: 0.9, opacity: 0 }, 
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.05,
          scrollTrigger: {
            trigger: tradesRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleApplyClick = (jobId: number) => {
    setSelectedJob(jobId);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const job = jobOffers.find(j => j.id === selectedJob);
      await generateAndSendForm({
        title: `CANDIDATURE - ${job?.title || 'Offre d\'emploi'}`,
        senderName: `${applicationData.firstname} ${applicationData.lastname}`,
        senderEmail: applicationData.email,
        fields: [
          { label: 'Poste', value: job?.title || '' },
          { label: 'Localisation du poste', value: job?.location || '' },
          { label: 'Prénom', value: applicationData.firstname },
          { label: 'Nom', value: applicationData.lastname },
          { label: 'Email', value: applicationData.email },
          { label: 'Téléphone', value: applicationData.phone },
          { label: 'Message / Motivation', value: applicationData.message },
          ...(cvFileName ? [{ label: 'CV joint', value: cvFileName }] : []),
        ],
      });

      setApplicationSubmitted(true);
      setTimeout(() => {
        setShowApplicationModal(false);
        setApplicationSubmitted(false);
        setApplicationData({ firstname: '', lastname: '', email: '', phone: '', message: '' });
        setCvFileName(null);
        setSelectedJob(null);
      }, 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setApplicationSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpontaneousSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await generateAndSendForm({
        title: 'CANDIDATURE SPONTANÉE - BTP CONNEXION',
        senderName: `${spontaneousData.firstname} ${spontaneousData.lastname}`,
        senderEmail: spontaneousData.email,
        fields: [
          { label: 'Civilité', value: spontaneousData.civility === 'mr' ? 'Monsieur' : spontaneousData.civility === 'mrs' ? 'Madame' : 'Mademoiselle' },
          { label: 'Prénom', value: spontaneousData.firstname },
          { label: 'Nom', value: spontaneousData.lastname },
          { label: 'Email', value: spontaneousData.email },
          { label: 'Téléphone', value: spontaneousData.phone },
          { label: 'Pays', value: spontaneousData.country },
          { label: 'Métier / Spécialité', value: spontaneousData.trade },
          { label: 'Expérience', value: spontaneousData.experience },
          { label: 'Niveau d\'études', value: spontaneousData.education },
          { label: 'Lettre de motivation', value: spontaneousData.coverLetter },
          ...(spontaneousCvFileName ? [{ label: 'CV joint', value: spontaneousCvFileName }] : []),
          ...(portfolioFileName ? [{ label: 'Portfolio joint', value: portfolioFileName }] : []),
        ],
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur:', error);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#007A5E] rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="heading-display text-3xl md:text-4xl text-white mb-4">
            Candidature envoyée !
          </h1>
          <p className="text-[#A6AFBF] mb-8">
            Notre équipe RH étudiera votre profil et vous contactera si votre candidature est retenue.
          </p>
          <a
            href="/btp-connexion"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#007A5E] text-white font-semibold rounded-sm hover:bg-[#006B52] transition-colors"
          >
            Retour à BTP Connexion
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 lg:px-[4vw] mb-16">
        <div className="bg-gradient-to-r from-[#007A5E] to-[#006B52] rounded-sm p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
              <HardHat className="w-5 h-5 text-white" />
              <span className="text-sm text-white label-mono">BTP CONNEXION</span>
            </div>
            <h1 className="heading-display text-[clamp(32px,6vw,56px)] text-white mb-4">
              {t('btpConnexion.hero.title')}
            </h1>
            <p className="text-lg text-white/80 mb-8">
              {t('btpConnexion.hero.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 lg:px-[4vw] mb-12">
        <div className="flex gap-4 border-b border-[#2A3441]">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'text-[#007A5E] border-b-2 border-[#007A5E]'
                : 'text-[#A6AFBF] hover:text-white'
            }`}
          >
            {t('btpConnexion.jobs.title')}
          </button>
          <button
            onClick={() => setActiveTab('spontaneous')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'spontaneous'
                ? 'text-[#007A5E] border-b-2 border-[#007A5E]'
                : 'text-[#A6AFBF] hover:text-white'
            }`}
          >
            {t('btpConnexion.spontaneous.title')}
          </button>
        </div>
      </section>

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <>
          <section ref={jobsRef} className="px-4 lg:px-[4vw] mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobOffers.map((job) => (
                <div
                  key={job.id}
                  className="job-card bg-[#1A2744] p-6 rounded-sm hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white font-['Sora'] mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-[#A6AFBF]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.contract}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#007A5E]/20 text-[#007A5E] text-xs font-medium rounded-full">
                      {t(`btpConnexion.jobs.${job.type}`)}
                    </span>
                  </div>
                  
                  <p className="text-[#A6AFBF] text-sm mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#0B0F17] text-[#A6AFBF] text-xs rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  {selectedJob === job.id && (
                    <div className="mt-6 pt-6 border-t border-[#2A3441]">
                      <Button 
                        className="w-full bg-[#007A5E] hover:bg-[#006B52] text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyClick(job.id);
                        }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {t('btpConnexion.jobs.apply')}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Trades */}
          <section ref={tradesRef} className="px-4 lg:px-[4vw] py-20 bg-[#1A2744]">
            <h2 className="heading-display text-2xl text-white mb-8 text-center">
              {t('btpConnexion.trades.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trades.map((trade) => (
                <div
                  key={trade.key}
                  className="trade-card flex items-center gap-3 p-4 bg-[#0B0F17] rounded-sm hover:bg-[#007A5E]/20 transition-colors cursor-pointer"
                >
                  <trade.icon className="w-6 h-6 text-[#D4A03A]" />
                  <span className="text-white text-sm">{t(`btpConnexion.trades.${trade.key}`)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="px-4 lg:px-[4vw] py-20">
            <h2 className="heading-display text-2xl text-white mb-8 text-center">
              {t('btpConnexion.testimonials.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-[#1A2744] p-8 rounded-sm">
                  <p className="text-[#A6AFBF] mb-6 italic">"{t(testimonial.text)}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#007A5E] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{testimonial.author}</div>
                      <div className="text-[#A6AFBF] text-sm">{testimonial.role} • {testimonial.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Spontaneous Application Tab */}
      {activeTab === 'spontaneous' && (
        <section className="px-4 lg:px-[4vw]">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1A2744] p-8 rounded-sm mb-8">
              <h2 className="heading-display text-2xl text-white mb-2">
                {t('btpConnexion.spontaneous.title')}
              </h2>
              <p className="text-[#A6AFBF]">{t('btpConnexion.spontaneous.subtitle')}</p>
            </div>

            <form onSubmit={handleSpontaneousSubmit} className="space-y-8">
              <div className="bg-[#1A2744] p-8 rounded-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">
                      {t('btpConnexion.spontaneous.civility')}
                    </Label>
                    <RadioGroup
                      value={spontaneousData.civility}
                      onValueChange={(value) => setSpontaneousData({ ...spontaneousData, civility: value })}
                      className="flex gap-4"
                    >
                      {[
                        { key: 'mr', label: t('btpConnexion.spontaneous.mr') },
                        { key: 'mrs', label: t('btpConnexion.spontaneous.mrs') },
                        { key: 'ms', label: t('btpConnexion.spontaneous.ms') },
                      ].map((civ) => (
                        <div key={civ.key} className="flex items-center space-x-2">
                          <RadioGroupItem value={civ.key} id={civ.key} className="border-[#007A5E]" />
                          <Label htmlFor={civ.key} className="text-white cursor-pointer">{civ.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">
                      {t('btpConnexion.spontaneous.firstname')}
                    </Label>
                    <Input
                      value={spontaneousData.firstname}
                      onChange={(e) => setSpontaneousData({ ...spontaneousData, firstname: e.target.value })}
                      className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">
                      {t('btpConnexion.spontaneous.lastname')}
                    </Label>
                    <Input
                      value={spontaneousData.lastname}
                      onChange={(e) => setSpontaneousData({ ...spontaneousData, lastname: e.target.value })}
                      className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">
                      {t('btpConnexion.spontaneous.email')}
                    </Label>
                    <Input
                      type="email"
                      value={spontaneousData.email}
                      onChange={(e) => setSpontaneousData({ ...spontaneousData, email: e.target.value })}
                      className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">
                      {t('btpConnexion.spontaneous.phone')}
                    </Label>
                    <Input
                      type="tel"
                      value={spontaneousData.phone}
                      onChange={(e) => setSpontaneousData({ ...spontaneousData, phone: e.target.value })}
                      className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">
                      {t('btpConnexion.spontaneous.country')}
                    </Label>
                    <Input
                      value={spontaneousData.country}
                      onChange={(e) => setSpontaneousData({ ...spontaneousData, country: e.target.value })}
                      className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">
                      {t('btpConnexion.spontaneous.trade')}
                    </Label>
                    <Select
                      value={spontaneousData.trade}
                      onValueChange={(value) => setSpontaneousData({ ...spontaneousData, trade: value })}
                    >
                      <SelectTrigger className="bg-[#0B0F17] border-[#2A3441] text-white h-12">
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A2744] border-[#2A3441]">
                        {trades.map((trade) => (
                          <SelectItem key={trade.key} value={trade.key} className="text-white">
                            {t(`btpConnexion.trades.${trade.key}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">
                      {t('btpConnexion.spontaneous.experience')}
                    </Label>
                    <Select
                      value={spontaneousData.experience}
                      onValueChange={(value) => setSpontaneousData({ ...spontaneousData, experience: value })}
                    >
                      <SelectTrigger className="bg-[#0B0F17] border-[#2A3441] text-white h-12">
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A2744] border-[#2A3441]">
                        {['Débutant (0-2 ans)', 'Confirmé (3-5 ans)', 'Expérimenté (5-10 ans)', 'Senior (10+ ans)'].map((exp) => (
                          <SelectItem key={exp} value={exp} className="text-white">
                            {exp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">
                      {t('btpConnexion.spontaneous.education')}
                    </Label>
                    <Select
                      value={spontaneousData.education}
                      onValueChange={(value) => setSpontaneousData({ ...spontaneousData, education: value })}
                    >
                      <SelectTrigger className="bg-[#0B0F17] border-[#2A3441] text-white h-12">
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A2744] border-[#2A3441]">
                        {['CAP/BEPC', 'Bac', 'Bac Pro', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5',].map((edu) => (
                          <SelectItem key={edu} value={edu} className="text-white">
                            {edu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6">
                  <Label className="label-mono text-[#A6AFBF] mb-2 block">
                    {t('btpConnexion.spontaneous.coverLetter')}
                  </Label>
                  <Textarea
                    value={spontaneousData.coverLetter}
                    onChange={(e) => setSpontaneousData({ ...spontaneousData, coverLetter: e.target.value })}
                    className="bg-[#0B0F17] border-[#2A3441] text-white min-h-[120px] resize-none"
                    placeholder="Présentez-vous et expliquez pourquoi vous souhaitez rejoindre CamerOssaka..."
                  />
                </div>

                <div className="mt-6">
                  <Label className="label-mono text-[#A6AFBF] mb-2 block">
                    {t('btpConnexion.spontaneous.cv')}
                  </Label>
                  <label className="border-2 border-dashed border-[#2A3441] rounded-sm p-8 text-center hover:border-[#007A5E] transition-colors cursor-pointer block">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSpontaneousCvFileName(file.name);
                        }
                      }}
                    />
                    <Upload className="w-8 h-8 mx-auto mb-3 text-[#A6AFBF]" />
                    {spontaneousCvFileName ? (
                      <p className="text-[#007A5E] text-sm font-medium">✅ {spontaneousCvFileName}</p>
                    ) : (
                      <>
                        <p className="text-[#A6AFBF] text-sm">
                          Glissez-déposez votre CV ou cliquez pour parcourir
                        </p>
                        <p className="text-[#4A5568] text-xs mt-2">
                          PDF uniquement, max 5 Mo
                        </p>
                      </>
                    )}
                  </label>
                </div>

                <div className="mt-6">
                  <Label className="label-mono text-[#A6AFBF] mb-2 block">
                    {t('btpConnexion.spontaneous.portfolio')}
                  </Label>
                  <label className="border-2 border-dashed border-[#2A3441] rounded-sm p-8 text-center hover:border-[#007A5E] transition-colors cursor-pointer block">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPortfolioFileName(file.name);
                        }
                      }}
                    />
                    <Upload className="w-8 h-8 mx-auto mb-3 text-[#A6AFBF]" />
                    {portfolioFileName ? (
                      <p className="text-[#007A5E] text-sm font-medium">✅ {portfolioFileName}</p>
                    ) : (
                      <p className="text-[#A6AFBF] text-sm">
                        Documents supplémentaires (optionnel)
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#007A5E] hover:bg-[#006B52] text-white py-6 h-auto"
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t('common.sending')}</>
                ) : (
                  <><Send className="w-5 h-5 mr-2" />{t('btpConnexion.spontaneous.submit')}</>
                )}
              </Button>
            </form>
          </div>
        </section>
      )}

      {/* Application Modal */}
      {showApplicationModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F17]/90 backdrop-blur-sm"
          onClick={() => setShowApplicationModal(false)}
        >
          <div 
            className="bg-[#1A2744] rounded-sm max-w-lg w-full max-h-[90vh] overflow-auto p-8"
            onClick={e => e.stopPropagation()}
          >
            {applicationSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#007A5E] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('btpConnexion.applicationSent')}</h3>
                <p className="text-[#A6AFBF]">{t('btpConnexion.applicationReply')}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-display text-xl text-white">{t('btpConnexion.jobs.apply')}</h2>
                  <button
                    onClick={() => setShowApplicationModal(false)}
                    className="w-8 h-8 bg-[#0B0F17] text-white rounded-full flex items-center justify-center hover:bg-[#2A3441] transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mb-6 p-4 bg-[#0B0F17] rounded-sm">
                  <p className="text-white font-semibold">{jobOffers.find(j => j.id === selectedJob)?.title}</p>
                  <p className="text-[#A6AFBF] text-sm">{jobOffers.find(j => j.id === selectedJob)?.location}</p>
                </div>

                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">{t('btpConnexion.spontaneous.firstname')}</Label>
                      <Input
                        type="text"
                        value={applicationData.firstname}
                        onChange={(e) => setApplicationData({ ...applicationData, firstname: e.target.value })}
                        className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">Nom</Label>
                      <Input
                        type="text"
                        value={applicationData.lastname}
                        onChange={(e) => setApplicationData({ ...applicationData, lastname: e.target.value })}
                        className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">Email</Label>
                    <Input
                      type="email"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                      className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">{t('btpConnexion.spontaneous.phone')}</Label>
                    <Input
                      type="tel"
                      value={applicationData.phone}
                      onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                      className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                      placeholder="+237 6XX XXX XXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">{t('btpConnexion.spontaneous.messageLabel')}</Label>
                    <Textarea
                      value={applicationData.message}
                      onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
                      className="bg-[#0B0F17] border-[#2A3441] text-white min-h-[120px] resize-none"
                      placeholder="Présentez-vous brièvement et expliquez votre motivation..."
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="label-mono text-[#A6AFBF] mb-2 block">{t('btpConnexion.spontaneous.cvLabel')}</Label>
                    <label className="border-2 border-dashed border-[#2A3441] rounded-sm p-4 text-center hover:border-[#007A5E] transition-colors cursor-pointer block">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setCvFileName(file.name);
                          }
                        }}
                      />
                      <Upload className="w-6 h-6 mx-auto mb-2 text-[#A6AFBF]" />
                      {cvFileName ? (
                        <p className="text-[#007A5E] text-sm font-medium">✅ {cvFileName}</p>
                      ) : (
                        <p className="text-[#A6AFBF] text-sm">{t('btpConnexion.spontaneous.cvClick')}</p>
                      )}
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#007A5E] hover:bg-[#006B52] text-white py-4 h-auto mt-6"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t('common.sending')}</>
                    ) : (
                      <><Send className="w-5 h-5 mr-2" />{t('btpConnexion.spontaneous.submit')}</>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
