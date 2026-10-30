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

export default function BTPConnexion() {
  const { t } = useTranslation();

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
        title: 'INSCRIPTION ESPACE ENTREPRISES - C-O CONNEXION',
        senderName: entrepriseData.nom,
        senderEmail: entrepriseData.email || 'noreply@camerossaka.com',
        fields: [
          { label: 'Nom entreprise', value: entrepriseData.nom },
          { label: 'Domaine', value: entrepriseData.domaine },
          { label: 'Localisation', value: entrepriseData.localisation },
          { label: 'Email', value: entrepriseData.email },
          { label: 'Téléphone', value: entrepriseData.telephone },
          { label: 'Email administrateur', value: entrepriseData.admin },
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
        title: 'INSCRIPTION ESPACE PARTICULIER - C-O CONNEXION',
        senderName: `${findworkData.firstname} ${findworkData.lastname}`,
        senderEmail: findworkData.contact.includes('@') ? findworkData.contact : 'noreply@camerossaka.com',
        fields: [
          { label: 'Nom', value: findworkData.lastname },
          { label: 'Prénom', value: findworkData.firstname },
          { label: 'Pays', value: findworkData.pays },
          { label: 'Ville', value: findworkData.ville },
          { label: 'Métier', value: findworkData.metier },
          { label: 'Expérience (années)', value: findworkData.experience },
          { label: 'Disponibilité', value: findworkData.disponibilite },
          { label: 'Numéro / Email', value: findworkData.contact },
          { label: 'Compétences spécifiques', value: findworkData.competences || '–' },
          ...(findworkCvFileName ? [{ label: 'CV joint', value: findworkCvFileName }] : []),
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
      <section className="px-4 lg:px-[4vw] mb-16">
        <div className="bg-gradient-to-r from-[#CE1126] to-[#A50E20] rounded-sm p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
              <HardHat className="w-5 h-5 text-[#111111]" />
              <span className="text-sm text-white label-mono">C-O CONNEXION</span>
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
      <section className="px-4 lg:px-[4vw] mb-12">
        <div className="flex gap-2 border-b border-[#E5E5E5]">
          <button
            onClick={() => setActiveTab('findwork')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'findwork'
                ? 'text-[#CE1126] border-b-2 border-[#CE1126]'
                : 'text-[#666666] hover:text-[#111111]'
            }`}
          >
            Espace particulier
          </button>
          <button
            onClick={() => setActiveTab('entreprise')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'entreprise'
                ? 'text-[#CE1126] border-b-2 border-[#CE1126]'
                : 'text-[#666666] hover:text-[#111111]'
            }`}
          >
            Espace Entreprises
          </button>
        </div>
      </section>

      {/* Findwork Form */}
      {activeTab === 'findwork' && (
      <section className="px-4 lg:px-[4vw]">
        <div className="max-w-3xl mx-auto">
          {findworkSubmitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#CE1126] rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="heading-display text-3xl text-[#111111] mb-4">Inscription envoyée !</h2>
              <p className="text-[#666666]">Notre équipe vous contactera dès qu'un poste correspond à votre profil.</p>
            </div>
          ) : (
            <div className="bg-white border border-[#E5E5E5] shadow-sm p-8 rounded-sm">
              <h2 className="heading-display text-2xl text-[#111111] mb-2">Espace particulier</h2>
              <p className="text-[#666666] mb-8">Inscrivez-vous pour être mis en relation avec des employeurs du BTP.</p>

              <form onSubmit={handleFindworkSubmit} className="space-y-6">

                {/* Nom / Prénom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">Nom <span className="text-[#CE1126]">*</span></Label>
                    <Input value={findworkData.lastname} onChange={(e) => setFindworkData({ ...findworkData, lastname: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder="Votre nom" required />
                  </div>
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">Prénom <span className="text-[#CE1126]">*</span></Label>
                    <Input value={findworkData.firstname} onChange={(e) => setFindworkData({ ...findworkData, firstname: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder="Votre prénom" required />
                  </div>
                </div>

                {/* Pays / Ville */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">Pays <span className="text-[#CE1126]">*</span></Label>
                    <Input value={findworkData.pays} onChange={(e) => setFindworkData({ ...findworkData, pays: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder="Ex: Cameroun, France..." required />
                  </div>
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">Ville <span className="text-[#CE1126]">*</span></Label>
                    <Input value={findworkData.ville} onChange={(e) => setFindworkData({ ...findworkData, ville: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder="Ex: Yaoundé, Douala..." required />
                  </div>
                </div>

                {/* Métier */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">Métier <span className="text-[#CE1126]">*</span></Label>
                  <Select value={findworkData.metier} onValueChange={(value) => setFindworkData({ ...findworkData, metier: value })} required>
                    <SelectTrigger className="bg-white border-[#E5E5E5] text-[#111111] h-12">
                      <SelectValue placeholder="Sélectionnez votre métier..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E5E5E5]">
                      <SelectItem value="Manoeuvre" className="text-[#111111]">Manœuvre</SelectItem>
                      <SelectItem value="Macon" className="text-[#111111]">Maçon</SelectItem>
                      <SelectItem value="Technicien" className="text-[#111111]">Technicien</SelectItem>
                      <SelectItem value="Ingenieur" className="text-[#111111]">Ingénieur</SelectItem>
                      <SelectItem value="Plombier" className="text-[#111111]">Plombier</SelectItem>
                      <SelectItem value="Electricien" className="text-[#111111]">Électricien</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Expérience */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">Expérience (années) <span className="text-[#CE1126]">*</span></Label>
                  <Select value={findworkData.experience} onValueChange={(value) => setFindworkData({ ...findworkData, experience: value })} required>
                    <SelectTrigger className="bg-white border-[#E5E5E5] text-[#111111] h-12">
                      <SelectValue placeholder="Sélectionnez..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E5E5E5]">
                      <SelectItem value="0-2 ans" className="text-[#111111]">0 - 2 ans</SelectItem>
                      <SelectItem value="3-5 ans" className="text-[#111111]">3 - 5 ans</SelectItem>
                      <SelectItem value="5-10 ans" className="text-[#111111]">5 - 10 ans</SelectItem>
                      <SelectItem value="10+ ans" className="text-[#111111]">10 ans et plus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* CV upload */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">CV (PDF) <span className="text-[#CE1126]">*</span></Label>
                  <label className="border-2 border-dashed border-[#E5E5E5] rounded-sm p-8 text-center hover:border-[#CE1126] transition-colors cursor-pointer block">
                    <input type="file" accept=".pdf" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) setFindworkCvFileName(file.name); }} />
                    <Upload className="w-8 h-8 mx-auto mb-3 text-[#666666]" />
                    {findworkCvFileName ? (
                      <p className="text-[#CE1126] text-sm font-medium">CV joint : {findworkCvFileName}</p>
                    ) : (
                      <>
                        <p className="text-[#666666] text-sm">Glissez-deposez votre CV ou cliquez pour parcourir</p>
                        <p className="text-[#999999] text-xs mt-1">PDF uniquement, max 5 Mo</p>
                      </>
                    )}
                  </label>
                </div>

                {/* Disponibilité */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">Disponibilité <span className="text-[#CE1126]">*</span></Label>
                  <Input value={findworkData.disponibilite} onChange={(e) => setFindworkData({ ...findworkData, disponibilite: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder="Ex: Immediate, Dans 1 mois, A partir du..." required />
                </div>

                {/* Numéro / Email */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">Numéro / Email <span className="text-[#CE1126]">*</span></Label>
                  <Input value={findworkData.contact} onChange={(e) => setFindworkData({ ...findworkData, contact: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] h-12" placeholder="+237 6XX XXX XXX ou adresse@email.com" required />
                </div>

                {/* Compétences spécifiques */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">Compétences spécifiques <span className="text-[#999999] font-normal">(optionnel)</span></Label>
                  <Textarea value={findworkData.competences} onChange={(e) => setFindworkData({ ...findworkData, competences: e.target.value })} className="bg-white border-[#E5E5E5] text-[#111111] min-h-[100px] resize-none" placeholder="Ex: AutoCAD, beton arme, coffrage, soudure TIG..." />
                </div>

                {/* Consentement anonymat */}
                <div className="bg-[#FAF7F0] border border-[#E5E5E5] rounded-sm p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 w-4 h-4 accent-[#CE1126] shrink-0" />
                    <span className="text-sm text-[#666666]">
                      Avant de vous enregistrer : vos informations resteront strictement <span className="font-semibold text-[#111111]">anonymes et confidentielles</span>. J'ai lu et j'accepte. <span className="text-[#CE1126]">*</span>
                    </span>
                  </label>
                </div>

                <Button type="submit" disabled={findworkLoading} className="w-full bg-[#CE1126] hover:bg-[#A50E20] text-white font-semibold py-6 h-auto">
                  {findworkLoading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Envoi en cours...</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" />Envoyer mon inscription</>
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
      <section className="px-4 lg:px-[4vw]">
        <div className="max-w-3xl mx-auto">
          {entrepriseSubmitted ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-[#CE1126] rounded-full flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#CE1126]/10 border border-[#CE1126] rounded-full mb-6">
                <ShieldCheck className="w-4 h-4 text-[#CE1126]" />
                <span className="text-[#CE1126] font-semibold label-mono text-sm">Entreprise vérifiée</span>
              </div>
              <h2 className="heading-display text-3xl text-[#111111] mb-4">Demande envoyée !</h2>
              <p className="text-[#666666]">Notre équipe vérifiera votre dossier et activera votre badge <span className="text-[#CE1126]">Entreprise vérifiée</span> sous 48h.</p>
            </div>
          ) : (
            <div className="bg-white border border-[#E5E5E5] shadow-sm p-8 rounded-sm">
              <div className="flex items-start justify-between mb-2">
                <h2 className="heading-display text-2xl text-[#111111]">Espace Entreprises</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#CE1126]/10 border border-[#CE1126]/40 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-[#CE1126]" />
                  <span className="text-[#CE1126] text-xs font-semibold label-mono">Entreprise vérifiée</span>
                </div>
              </div>
              <p className="text-[#666666] mb-8">Inscrivez votre entreprise pour accéder aux profils qualifiés et être visible sur la plateforme C-O Connexion.</p>

              <form onSubmit={handleEntrepriseSubmit} className="space-y-6">

                {/* Nom entreprise */}
                <div>
                  <Label className="label-mono text-[#666666] mb-2 block">Nom de l'entreprise <span className="text-[#CE1126]">*</span></Label>
                  <Input
                    value={entrepriseData.nom}
                    onChange={(e) => setEntrepriseData({ ...entrepriseData, nom: e.target.value })}
                    className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                    placeholder="Ex: Camer-Ossaka Connexion SARL"
                    required
                  />
                </div>

                {/* Domaine / Localisation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">Domaine <span className="text-[#CE1126]">*</span></Label>
                    <Select value={entrepriseData.domaine} onValueChange={(value) => setEntrepriseData({ ...entrepriseData, domaine: value })} required>
                      <SelectTrigger className="bg-white border-[#E5E5E5] text-[#111111] h-12">
                        <SelectValue placeholder="Sélectionnez un domaine..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#E5E5E5]">
                        <SelectItem value="BTP" className="text-[#111111]">BTP (Bâtiment & Travaux Publics)</SelectItem>
                        <SelectItem value="Routes" className="text-[#111111]">Routes & Voirie</SelectItem>
                        <SelectItem value="Batiment" className="text-[#111111]">Bâtiment</SelectItem>
                        <SelectItem value="Genie civil" className="text-[#111111]">Génie Civil</SelectItem>
                        <SelectItem value="Travaux publics" className="text-[#111111]">Travaux Publics</SelectItem>
                        <SelectItem value="Construction" className="text-[#111111]">Construction</SelectItem>
                        <SelectItem value="Autre" className="text-[#111111]">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">Localisation <span className="text-[#CE1126]">*</span></Label>
                    <Input
                      value={entrepriseData.localisation}
                      onChange={(e) => setEntrepriseData({ ...entrepriseData, localisation: e.target.value })}
                      className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                      placeholder="Ex: Yaoundé, Douala..."
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
                      placeholder="contact@entreprise.com"
                      required
                    />
                  </div>
                  <div>
                    <Label className="label-mono text-[#666666] mb-2 block">Téléphone <span className="text-[#CE1126]">*</span></Label>
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
                  <Label className="label-mono text-[#666666] mb-2 block">Email administrateur <span className="text-[#999999] font-normal">(optionnel)</span></Label>
                  <Input
                    value={entrepriseData.admin}
                    onChange={(e) => setEntrepriseData({ ...entrepriseData, admin: e.target.value })}
                    className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                    placeholder="Email du responsable ou gestionnaire du compte"
                  />
                </div>

                {/* Consentement anonymat */}
                <div className="bg-[#FAF7F0] border border-[#E5E5E5] rounded-sm p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 w-4 h-4 accent-[#CE1126] shrink-0" />
                    <span className="text-sm text-[#666666]">
                      Avant de vous enregistrer : vos informations resteront strictement <span className="font-semibold text-[#111111]">anonymes et confidentielles</span>. J'ai lu et j'accepte. <span className="text-[#CE1126]">*</span>
                    </span>
                  </label>
                </div>

                <Button type="submit" disabled={entrepriseLoading} className="w-full bg-[#CE1126] hover:bg-[#A50E20] text-white font-semibold py-6 h-auto">
                  {entrepriseLoading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Envoi en cours...</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" />Inscrire mon entreprise</>
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