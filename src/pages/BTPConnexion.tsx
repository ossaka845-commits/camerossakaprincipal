import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Send, CheckCircle, HardHat, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateAndSendForm } from '@/lib/formMailer';

const companyDomainTranslations: Record<string, string> = {
  BTP: 'btpConnexion.form.domains.btp',
  Routes: 'btpConnexion.form.domains.roads',
  Batiment: 'btpConnexion.form.domains.building',
  'Genie civil': 'btpConnexion.form.domains.civilEngineering',
  'Travaux publics': 'btpConnexion.form.domains.publicWorks',
  Construction: 'btpConnexion.form.domains.construction',
  Autre: 'btpConnexion.form.domains.other',
};

const tradeTranslations: Record<string, string> = {
  Manoeuvre: 'btpConnexion.form.trades.laborer',
  Macon: 'btpConnexion.form.trades.mason',
  Technicien: 'btpConnexion.form.trades.technician',
  Ingenieur: 'btpConnexion.form.trades.engineer',
  Plombier: 'btpConnexion.form.trades.plumber',
  Electricien: 'btpConnexion.form.trades.electrician',
};

const experienceTranslations: Record<string, string> = {
  '0-2 ans': 'btpConnexion.form.experienceRanges.0to2',
  '3-5 ans': 'btpConnexion.form.experienceRanges.3to5',
  '5-10 ans': 'btpConnexion.form.experienceRanges.5to10',
  '10+ ans': 'btpConnexion.form.experienceRanges.10plus',
};

export default function BTPConnexion() {
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState<'findwork' | 'entreprise'>('findwork');
  const [findworkCvFileName, setFindworkCvFileName] = useState<string | null>(null);
  const [findworkSubmitted, setFindworkSubmitted] = useState(false);
  const [findworkLoading, setFindworkLoading] = useState(false);
  const [findworkData, setFindworkData] = useState({
    lastname: '',
    firstname: '',
    pays: '',
    ville: '',
    metier: '',
    experience: '',
    disponibilite: '',
    contact: '',
    competences: '',
  });

  const [entrepriseSubmitted, setEntrepriseSubmitted] = useState(false);
  const [entrepriseLoading, setEntrepriseLoading] = useState(false);
  const [entrepriseData, setEntrepriseData] = useState({
    nom: '',
    domaine: '',
    localisation: '',
    email: '',
    telephone: '',
    admin: '',
  });

  const handleEntrepriseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEntrepriseLoading(true);
    try {
      await generateAndSendForm({
        title: t('btpConnexion.form.companyRegistrationTitle'),
        language: (i18n.resolvedLanguage || i18n.language).startsWith('en') ? 'en' : 'fr',
        senderName: entrepriseData.nom,
        senderEmail: entrepriseData.email || 'noreply@camerossaka.com',
        fields: [
          { label: t('btpConnexion.form.companyName'), value: entrepriseData.nom },
          {
            label: t('btpConnexion.form.domain'),
            value: companyDomainTranslations[entrepriseData.domaine]
              ? t(companyDomainTranslations[entrepriseData.domaine])
              : entrepriseData.domaine,
          },
          { label: t('btpConnexion.form.location'), value: entrepriseData.localisation },
          { label: t('contact.form.email'), value: entrepriseData.email },
          { label: t('btpConnexion.form.telephone'), value: entrepriseData.telephone },
          { label: t('btpConnexion.form.adminEmail'), value: entrepriseData.admin },
        ],
      });
      setEntrepriseSubmitted(true);
    } catch (error) {
      console.error('Erreur:', error);
      setEntrepriseSubmitted(true);
    } finally {
      setEntrepriseLoading(false);
    }
  };

  const handleFindworkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFindworkLoading(true);
    try {
      await generateAndSendForm({
        title: t('btpConnexion.form.individualRegistrationTitle'),
        language: (i18n.resolvedLanguage || i18n.language).startsWith('en') ? 'en' : 'fr',
        senderName: `${findworkData.firstname} ${findworkData.lastname}`,
        senderEmail: findworkData.contact.includes('@') ? findworkData.contact : 'noreply@camerossaka.com',
        fields: [
          { label: t('btpConnexion.form.lastName'), value: findworkData.lastname },
          { label: t('btpConnexion.form.firstName'), value: findworkData.firstname },
          { label: t('btpConnexion.form.country'), value: findworkData.pays },
          { label: t('btpConnexion.form.city'), value: findworkData.ville },
          {
            label: t('btpConnexion.form.trade'),
            value: tradeTranslations[findworkData.metier]
              ? t(tradeTranslations[findworkData.metier])
              : findworkData.metier,
          },
          {
            label: t('btpConnexion.form.experience'),
            value: experienceTranslations[findworkData.experience]
              ? t(experienceTranslations[findworkData.experience])
              : findworkData.experience,
          },
          { label: t('btpConnexion.form.availability'), value: findworkData.disponibilite },
          { label: t('btpConnexion.form.phoneOrEmail'), value: findworkData.contact },
          { label: t('btpConnexion.form.skills'), value: findworkData.competences || '–' },
          ...(findworkCvFileName ? [{ label: t('btpConnexion.form.cv'), value: findworkCvFileName }] : []),
        ],
      });
      setFindworkSubmitted(true);
    } catch (error) {
      console.error('Erreur:', error);
      setFindworkSubmitted(true);
    } finally {
      setFindworkLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="page-container mb-16">
        <div className="bg-[#CE1126] p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
              <HardHat className="w-5 h-5 text-white" />
              <span className="text-sm text-white label-mono">{t('btpConnexion.badge')}</span>
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

      {/* Tab header */}
      <section className="page-container mb-12">
        <div className="flex gap-2 border-b border-[#E5E5E5]">
          <button
            onClick={() => setActiveTab('findwork')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'findwork'
                ? 'text-[#CE1126] border-b-2 border-[#CE1126]'
                : 'text-[#666666] hover:text-[#CE1126]'
            }`}
          >
            {t('btpConnexion.tabIndividual')}
          </button>
          <button
            onClick={() => setActiveTab('entreprise')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'entreprise'
                ? 'text-[#CE1126] border-b-2 border-[#CE1126]'
                : 'text-[#666666] hover:text-[#CE1126]'
            }`}
          >
            {t('btpConnexion.tabCompany')}
          </button>
        </div>
      </section>

      {/* Findwork Form */}
      {activeTab === 'findwork' && (
      <section className="page-container">
        <div className="max-w-3xl mx-auto">
          {findworkSubmitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#CE1126] rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="heading-display text-3xl text-[#111111] mb-4">{t('btpConnexion.registrationSent')}</h2>
              <p className="text-[#666666]">{t('btpConnexion.registrationReply')}</p>
            </div>
          ) : (
            <div className="bg-white border border-[#E5E5E5] p-6 md:p-8">
              <h2 className="heading-display text-2xl text-[#111111] mb-2">{t('btpConnexion.tabIndividual')}</h2>
              <p className="text-[#666666] mb-8">{t('btpConnexion.individualIntro')}</p>

              <form onSubmit={handleFindworkSubmit} className="space-y-6">

                {/* Nom / Prénom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.lastName')} <span className="text-[#CE1126]">*</span></Label>
                    <Input value={findworkData.lastname} onChange={(e) => setFindworkData({ ...findworkData, lastname: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder={t('btpConnexion.form.yourLastName')} required />
                  </div>
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.firstName')} <span className="text-[#CE1126]">*</span></Label>
                    <Input value={findworkData.firstname} onChange={(e) => setFindworkData({ ...findworkData, firstname: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder={t('btpConnexion.form.yourFirstName')} required />
                  </div>
                </div>

                {/* Pays / Ville */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.country')} <span className="text-[#CE1126]">*</span></Label>
                    <Input value={findworkData.pays} onChange={(e) => setFindworkData({ ...findworkData, pays: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder={t('btpConnexion.form.countryExample')} required />
                  </div>
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.city')} <span className="text-[#CE1126]">*</span></Label>
                    <Input value={findworkData.ville} onChange={(e) => setFindworkData({ ...findworkData, ville: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder={t('btpConnexion.form.cityExample')} required />
                  </div>
                </div>

                {/* Métier */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.trade')} <span className="text-[#CE1126]">*</span></Label>
                  <Select value={findworkData.metier} onValueChange={(value) => setFindworkData({ ...findworkData, metier: value })} required>
                    <SelectTrigger className="bg-white border-[#E5E5E5] text-[#111111] h-12">
                      <SelectValue placeholder={t('btpConnexion.form.selectTrade')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E5E5E5]">
                      <SelectItem value="Manoeuvre" className="text-[#111111]">{t('btpConnexion.form.trades.laborer')}</SelectItem>
                      <SelectItem value="Macon" className="text-[#111111]">{t('btpConnexion.form.trades.mason')}</SelectItem>
                      <SelectItem value="Technicien" className="text-[#111111]">{t('btpConnexion.form.trades.technician')}</SelectItem>
                      <SelectItem value="Ingenieur" className="text-[#111111]">{t('btpConnexion.form.trades.engineer')}</SelectItem>
                      <SelectItem value="Plombier" className="text-[#111111]">{t('btpConnexion.form.trades.plumber')}</SelectItem>
                      <SelectItem value="Electricien" className="text-[#111111]">{t('btpConnexion.form.trades.electrician')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Expérience */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.experience')} <span className="text-[#CE1126]">*</span></Label>
                  <Select value={findworkData.experience} onValueChange={(value) => setFindworkData({ ...findworkData, experience: value })} required>
                    <SelectTrigger className="bg-white border-[#E5E5E5] text-[#111111] h-12">
                      <SelectValue placeholder={t('btpConnexion.form.select')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E5E5E5]">
                      <SelectItem value="0-2 ans" className="text-[#111111]">{t('btpConnexion.form.experienceRanges.0to2')}</SelectItem>
                      <SelectItem value="3-5 ans" className="text-[#111111]">{t('btpConnexion.form.experienceRanges.3to5')}</SelectItem>
                      <SelectItem value="5-10 ans" className="text-[#111111]">{t('btpConnexion.form.experienceRanges.5to10')}</SelectItem>
                      <SelectItem value="10+ ans" className="text-[#111111]">{t('btpConnexion.form.experienceRanges.10plus')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* CV upload */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.cv')} <span className="text-[#CE1126]">*</span></Label>
                  <label className="border border-dashed border-[#E5E5E5] p-8 text-center hover:border-[#CE1126] transition-colors cursor-pointer block">
                    <input type="file" accept=".pdf" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) setFindworkCvFileName(file.name); }} />
                    <Upload className="w-8 h-8 mx-auto mb-3 text-[#666666]" />
                    {findworkCvFileName ? (
                      <p className="text-[#CE1126] text-sm font-medium">{t('btpConnexion.form.cvAttached', { fileName: findworkCvFileName })}</p>
                    ) : (
                      <>
                        <p className="text-[#666666] text-sm">{t('btpConnexion.form.dropCv')}</p>
                        <p className="text-[#999999] text-xs mt-1">{t('btpConnexion.form.pdfLimit')}</p>
                      </>
                    )}
                  </label>
                </div>

                {/* Disponibilité */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.availability')} <span className="text-[#CE1126]">*</span></Label>
                  <Input value={findworkData.disponibilite} onChange={(e) => setFindworkData({ ...findworkData, disponibilite: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder={t('btpConnexion.form.availabilityExample')} required />
                </div>

                {/* Numéro / Email */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.phoneOrEmail')} <span className="text-[#CE1126]">*</span></Label>
                  <Input value={findworkData.contact} onChange={(e) => setFindworkData({ ...findworkData, contact: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder={t('btpConnexion.form.contactExample')} required />
                </div>

                {/* Compétences spécifiques */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.skills')} <span className="text-[#999999] font-normal">{t('btpConnexion.form.optional')}</span></Label>
                  <Textarea value={findworkData.competences} onChange={(e) => setFindworkData({ ...findworkData, competences: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] min-h-[100px] resize-none" placeholder={t('btpConnexion.form.skillsExample')} />
                </div>

                {/* Consentement anonymat */}
                <div className="bg-[#F8F8F8] border border-[#E5E5E5] p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 w-4 h-4 accent-[#CE1126] shrink-0" />
                    <span className="text-sm text-[#666666]">
                      {t('btpConnexion.form.privacyConsent')} <span className="text-[#CE1126]">*</span>
                    </span>
                  </label>
                </div>

                <Button type="submit" disabled={findworkLoading} className="w-full btn-primary font-semibold py-6 h-auto">
                  {findworkLoading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t('btpConnexion.form.sending')}</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" />{t('btpConnexion.form.sendApplication')}</>
                  )}
                </Button>

              </form>
            </div>
          )}
        </div>
      </section>
      )}

      {/* Espace Entreprises Form */}
      {activeTab === 'entreprise' && (
      <section className="page-container">
        <div className="max-w-3xl mx-auto">
          {entrepriseSubmitted ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-[#CE1126] rounded-full flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#CE1126]/10 border border-[#CE1126] rounded-full mb-6">
                <ShieldCheck className="w-4 h-4 text-[#CE1126]" />
                <span className="text-[#CE1126] font-semibold label-mono text-sm">{t('btpConnexion.form.verifiedCompany')}</span>
              </div>
              <h2 className="heading-display text-3xl text-[#111111] mb-4">{t('btpConnexion.form.requestSent')}</h2>
              <p className="text-[#666666]">{t('btpConnexion.form.companyRequestReply')}</p>
            </div>
          ) : (
            <div className="bg-white border border-[#E5E5E5] p-6 md:p-8">
              <div className="flex items-start justify-between mb-2">
                <h2 className="heading-display text-2xl text-[#111111]">{t('btpConnexion.tabCompany')}</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#CE1126]/10 border border-[#CE1126]/40 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-[#CE1126]" />
                  <span className="text-[#CE1126] text-xs font-semibold label-mono">{t('btpConnexion.form.verifiedCompany')}</span>
                </div>
              </div>
              <p className="text-[#666666] mb-8">{t('btpConnexion.form.companyIntro')}</p>

              <form onSubmit={handleEntrepriseSubmit} className="space-y-6">

                {/* Nom entreprise */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.companyName')} <span className="text-[#CE1126]">*</span></Label>
                  <Input
                    value={entrepriseData.nom}
                    onChange={(e) => setEntrepriseData({ ...entrepriseData, nom: e.target.value })}
                    className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                    placeholder={t('btpConnexion.form.companyExample')}
                    required
                  />
                </div>

                {/* Domaine / Localisation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.domain')} <span className="text-[#CE1126]">*</span></Label>
                    <Select value={entrepriseData.domaine} onValueChange={(value) => setEntrepriseData({ ...entrepriseData, domaine: value })} required>
                      <SelectTrigger className="bg-white border-[#E5E5E5] text-[#111111] h-12">
                        <SelectValue placeholder={t('btpConnexion.form.selectDomain')} />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#E5E5E5]">
                        <SelectItem value="BTP" className="text-[#111111]">{t('btpConnexion.form.domains.btp')}</SelectItem>
                        <SelectItem value="Routes" className="text-[#111111]">{t('btpConnexion.form.domains.roads')}</SelectItem>
                        <SelectItem value="Batiment" className="text-[#111111]">{t('btpConnexion.form.domains.building')}</SelectItem>
                        <SelectItem value="Genie civil" className="text-[#111111]">{t('btpConnexion.form.domains.civilEngineering')}</SelectItem>
                        <SelectItem value="Travaux publics" className="text-[#111111]">{t('btpConnexion.form.domains.publicWorks')}</SelectItem>
                        <SelectItem value="Construction" className="text-[#111111]">{t('btpConnexion.form.domains.construction')}</SelectItem>
                        <SelectItem value="Autre" className="text-[#111111]">{t('btpConnexion.form.domains.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.location')} <span className="text-[#CE1126]">*</span></Label>
                    <Input
                      value={entrepriseData.localisation}
                      onChange={(e) => setEntrepriseData({ ...entrepriseData, localisation: e.target.value })}
                      className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                      placeholder={t('btpConnexion.form.cityExample')}
                      required
                    />
                  </div>
                </div>

                {/* Email / Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">Email <span className="text-[#CE1126]">*</span></Label>
                    <Input
                      type="email"
                      value={entrepriseData.email}
                      onChange={(e) => setEntrepriseData({ ...entrepriseData, email: e.target.value })}
                      className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                      placeholder={t('btpConnexion.form.emailExample')}
                      required
                    />
                  </div>
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.telephone')} <span className="text-[#CE1126]">*</span></Label>
                    <Input
                      type="tel"
                      value={entrepriseData.telephone}
                      onChange={(e) => setEntrepriseData({ ...entrepriseData, telephone: e.target.value })}
                      className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                      placeholder="+237 6XX XXX XXX"
                      required
                    />
                  </div>
                </div>

                {/* Email ou admin */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">{t('btpConnexion.form.adminEmail')} <span className="text-[#999999] font-normal">{t('btpConnexion.form.optional')}</span></Label>
                  <Input
                    value={entrepriseData.admin}
                    onChange={(e) => setEntrepriseData({ ...entrepriseData, admin: e.target.value })}
                    className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                    placeholder={t('btpConnexion.form.adminPlaceholder')}
                  />
                </div>

                {/* Consentement anonymat */}
                <div className="bg-[#F8F8F8] border border-[#E5E5E5] p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 w-4 h-4 accent-[#CE1126] shrink-0" />
                    <span className="text-sm text-[#666666]">
                      {t('btpConnexion.form.privacyConsent')} <span className="text-[#CE1126]">*</span>
                    </span>
                  </label>
                </div>

                <Button type="submit" disabled={entrepriseLoading} className="w-full btn-primary font-semibold py-6 h-auto">
                  {entrepriseLoading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t('btpConnexion.form.sending')}</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" />{t('btpConnexion.form.sendCompany')}</>
                  )}
                </Button>

              </form>
            </div>
          )}
        </div>
      </section>
      )}
    </div>
  );
}