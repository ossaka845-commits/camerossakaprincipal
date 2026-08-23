import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Upload, Send, CheckCircle, Loader2 } from 'lucide-react';
import { generateAndSendForm } from '@/lib/formMailer';

const budgetRanges = [
  'Moins de 30 millions FCFA',
  '30 - 60 millions FCFA',
  '60 - 300 millions FCFA',
  '300 - 600 millions FCFA',
  '600 millions - 3 milliards FCFA',
  'Plus de 3 milliards FCFA',
];

const deadlines = [
  'Moins de 3 mois',
  '3 à 6 mois',
  '6 à 12 mois',
  '1 à 2 ans',
  'Plus de 2 ans',
];

export default function Devis() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentFileName, setDocumentFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'individual',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    company: '',
    taxNumber: '',
    projectType: '',
    description: '',
    location: '',
    budget: '',
    deadline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await generateAndSendForm({
        title: 'NOUS SOUMETTRE UN PROJET',
        senderName: `${formData.firstname} ${formData.lastname}`,
        senderEmail: formData.email,
        fields: [
          { label: 'Type de client', value: formData.type === 'individual' ? 'Particulier' : 'Entreprise' },
          { label: 'Prénom', value: formData.firstname },
          { label: 'Nom', value: formData.lastname },
          { label: 'Email', value: formData.email },
          { label: 'Téléphone', value: formData.phone },
          ...(formData.company ? [{ label: 'Entreprise', value: formData.company }] : []),
          ...(formData.taxNumber ? [{ label: 'N° Contribuable', value: formData.taxNumber }] : []),
          { label: 'Type de projet', value: formData.projectType },
          { label: 'Description du projet', value: formData.description },
          { label: 'Localisation', value: formData.location },
          { label: 'Budget estimé', value: formData.budget },
          { label: 'Délai souhaité', value: formData.deadline },
          ...(documentFileName ? [{ label: 'Document joint', value: documentFileName }] : []),
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

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#CC1A1A] rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#CC1A1A]" />
          </div>
          <h1 className="heading-display text-3xl md:text-4xl text-[#111111] mb-4">
            {t('quote.success')}
          </h1>
          <p className="text-[#666666] mb-8">
            Notre équipe étudiera votre demande et vous contactera rapidement.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#CC1A1A] text-white font-semibold rounded-sm hover:bg-[#B01515] transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="px-4 lg:px-[4vw] mb-12">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#CC1A1A]/20 border border-[#CC1A1A]/40 rounded-full mb-6">
            <span className="text-sm text-[#CC1A1A] label-mono">DEVIS</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#111111] mb-4">
            {t('quote.title')}
          </h1>
          <p className="text-xl text-[#666666]">{t('quote.subtitle')}</p>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 lg:px-[4vw]">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-[#CC1A1A] text-white' : 'bg-[#E8E2D8] text-[#666666]'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 rounded ${
                      step > s ? 'bg-[#CC1A1A]' : 'bg-[#E8E2D8]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Type & Personal Info */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5DFD3] shadow-sm p-8 rounded-sm">
                  <Label className="label-mono text-[#666666] mb-4 block">
                    {t('quote.type.label')}
                  </Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={(value) => updateField('type', value)}
                    className="flex flex-wrap gap-4"
                  >
                    {[
                      { key: 'individual', label: t('quote.type.individual') },
                      { key: 'company', label: t('quote.type.company') },
                    ].map((type) => (
                      <div key={type.key} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.key} id={type.key} className="border-[#CC1A1A]" />
                        <Label htmlFor={type.key} className="text-[#111111] cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="bg-white border border-[#E5DFD3] shadow-sm p-8 rounded-sm">
                  <h3 className="text-lg font-semibold text-[#111111] mb-6 font-['Sora']">
                    {t('quote.personal.title')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="label-mono text-[#666666] mb-2 block">
                        {t('quote.personal.firstname')}
                      </Label>
                      <Input
                        value={formData.firstname}
                        onChange={(e) => updateField('firstname', e.target.value)}
                        className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label className="label-mono text-[#666666] mb-2 block">
                        {t('quote.personal.lastname')}
                      </Label>
                      <Input
                        value={formData.lastname}
                        onChange={(e) => updateField('lastname', e.target.value)}
                        className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label className="label-mono text-[#666666] mb-2 block">
                        {t('quote.personal.email')}
                      </Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label className="label-mono text-[#666666] mb-2 block">
                        {t('quote.personal.phone')}
                      </Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                        required
                      />
                    </div>
                    {formData.type !== 'individual' && (
                      <>
                        <div>
                          <Label className="label-mono text-[#666666] mb-2 block">
                            {t('quote.personal.company')}
                          </Label>
                          <Input
                            value={formData.company}
                            onChange={(e) => updateField('company', e.target.value)}
                            className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                          />
                        </div>
                        <div>
                          <Label className="label-mono text-[#666666] mb-2 block">
                            {t('quote.personal.taxNumber')}
                          </Label>
                          <Input
                            value={formData.taxNumber}
                            onChange={(e) => updateField('taxNumber', e.target.value)}
                            className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-[#CC1A1A] hover:bg-[#B01515] text-white px-8 py-6 h-auto"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5DFD3] shadow-sm p-8 rounded-sm">
                  <h3 className="text-lg font-semibold text-[#111111] mb-6 font-['Sora']">
                    {t('quote.project.title')}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="label-mono text-[#666666] mb-2 block">
                        {t('quote.project.type')}
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => updateField('projectType', value)}
                      >
                        <SelectTrigger className="bg-white border-[#E5E5E5] text-[#111111] h-12">
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#E5DFD3]">
                          {[
                            { key: 'new', label: t('quote.project.new') },
                            { key: 'renovation', label: t('quote.project.renovation') },
                            { key: 'extension', label: t('quote.project.extension') },
                            { key: 'infrastructure', label: t('quote.project.infrastructure') },
                            { key: 'other', label: t('quote.project.other') },
                          ].map((type) => (
                            <SelectItem key={type.key} value={type.key} className="text-[#111111]">
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="label-mono text-[#666666] mb-2 block">
                        {t('quote.project.description')}
                      </Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        className="bg-white border-[#E5E5E5] text-[#111111] min-h-[120px] resize-none"
                        placeholder="Décrivez votre projet en détail..."
                        required
                      />
                    </div>

                    <div>
                      <Label className="label-mono text-[#666666] mb-2 block">
                        {t('quote.project.location')}
                      </Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        className="bg-white border-[#E5E5E5] text-[#111111] h-12"
                        placeholder="Pays, ville"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="label-mono text-[#666666] mb-2 block">
                          {t('quote.project.budget')}
                        </Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => updateField('budget', value)}
                        >
                          <SelectTrigger className="bg-white border-[#E5E5E5] text-[#111111] h-12">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-[#E5DFD3]">
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range} className="text-[#111111]">
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="label-mono text-[#666666] mb-2 block">
                          {t('quote.project.deadline')}
                        </Label>
                        <Select
                          value={formData.deadline}
                          onValueChange={(value) => updateField('deadline', value)}
                        >
                          <SelectTrigger className="bg-white border-[#E5E5E5] text-[#111111] h-12">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-[#E5DFD3]">
                            {deadlines.map((deadline) => (
                              <SelectItem key={deadline} value={deadline} className="text-[#111111]">
                                {deadline}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="label-mono text-[#666666] mb-2 block">
                        {t('quote.project.documents')}
                      </Label>
                      <label className="border-2 border-dashed border-[#E5E5E5] rounded-sm p-8 text-center hover:border-[#CC1A1A] transition-colors cursor-pointer block">
                        <input
                          type="file"
                          accept=".pdf,.dwg,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setDocumentFileName(file.name);
                            }
                          }}
                        />
                        <Upload className="w-8 h-8 mx-auto mb-3 text-[#666666]" />
                        {documentFileName ? (
                          <p className="text-[#CC1A1A] text-sm font-medium">✅ {documentFileName}</p>
                        ) : (
                          <>
                            <p className="text-[#666666] text-sm">
                              Glissez-déposez vos fichiers ou cliquez pour parcourir
                            </p>
                            <p className="text-[#999999] text-xs mt-2">
                              PDF, DWG, JPG jusqu'à 50 Mo
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-[#111111] text-[#111111] hover:bg-[#F0EBE2] px-8 py-6 h-auto"
                  >
                    Retour
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-[#CC1A1A] hover:bg-[#B01515] text-white px-8 py-6 h-auto"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5DFD3] shadow-sm p-8 rounded-sm">
                  <h3 className="text-lg font-semibold text-[#111111] mb-6 font-['Sora']">
                    Récapitulatif
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">Type</span>
                      <span className="text-[#111111]">{t(`quote.type.${formData.type}`)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">Nom</span>
                      <span className="text-[#111111]">{formData.firstname} {formData.lastname}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">Email</span>
                      <span className="text-[#111111]">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">Téléphone</span>
                      <span className="text-[#111111]">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">Type de projet</span>
                      <span className="text-[#111111]">{formData.projectType}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">Localisation</span>
                      <span className="text-[#111111]">{formData.location}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">Budget</span>
                      <span className="text-[#111111]">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#666666]">Délai</span>
                      <span className="text-[#111111]">{formData.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Consentement anonymat */}
                <div className="bg-[#FAF7F0] border border-[#E5DFD3] rounded-sm p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 w-4 h-4 accent-[#CC1A1A] shrink-0" />
                    <span className="text-sm text-[#666666]">
                      Avant de vous enregistrer : vos informations resteront strictement <span className="font-semibold text-[#111111]">anonymes et confidentielles</span>. J'ai lu et j'accepte. <span className="text-[#CC1A1A]">*</span>
                    </span>
                  </label>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-[#111111] text-[#111111] hover:bg-[#F0EBE2] px-8 py-6 h-auto"
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#CC1A1A] hover:bg-[#B01515] text-white px-8 py-6 h-auto"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Envoi en cours...</>
                    ) : (
                      <><Send className="w-5 h-5 mr-2" />{t('quote.submit')}</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
