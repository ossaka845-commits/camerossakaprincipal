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
        title: 'DEMANDER UN DEVIS',
        senderName: `${formData.firstname} ${formData.lastname}`,
        senderEmail: formData.email,
        fields: [
          { label: 'Type de client', value: formData.type === 'individual' ? 'Particulier' : formData.type === 'company' ? 'Entreprise' : 'Administration' },
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
          <div className="w-20 h-20 mx-auto mb-6 bg-[#007A5E] rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="heading-display text-3xl md:text-4xl text-white mb-4">
            {t('quote.success')}
          </h1>
          <p className="text-[#A6AFBF] mb-8">
            Notre équipe étudiera votre demande et vous contactera rapidement.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#007A5E] text-white font-semibold rounded-sm hover:bg-[#006B52] transition-colors"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#007A5E]/20 border border-[#007A5E]/40 rounded-full mb-6">
            <span className="text-sm text-[#007A5E] label-mono">DEVIS</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-white mb-4">
            {t('quote.title')}
          </h1>
          <p className="text-xl text-[#A6AFBF]">{t('quote.subtitle')}</p>
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
                    step >= s ? 'bg-[#007A5E] text-white' : 'bg-[#1A2744] text-[#A6AFBF]'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 rounded ${
                      step > s ? 'bg-[#007A5E]' : 'bg-[#1A2744]'
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
                <div className="bg-[#1A2744] p-8 rounded-sm">
                  <Label className="label-mono text-[#A6AFBF] mb-4 block">
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
                      { key: 'administration', label: t('quote.type.administration') },
                    ].map((type) => (
                      <div key={type.key} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.key} id={type.key} className="border-[#007A5E]" />
                        <Label htmlFor={type.key} className="text-white cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="bg-[#1A2744] p-8 rounded-sm">
                  <h3 className="text-lg font-semibold text-white mb-6 font-['Sora']">
                    {t('quote.personal.title')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">
                        {t('quote.personal.firstname')}
                      </Label>
                      <Input
                        value={formData.firstname}
                        onChange={(e) => updateField('firstname', e.target.value)}
                        className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">
                        {t('quote.personal.lastname')}
                      </Label>
                      <Input
                        value={formData.lastname}
                        onChange={(e) => updateField('lastname', e.target.value)}
                        className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">
                        {t('quote.personal.email')}
                      </Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">
                        {t('quote.personal.phone')}
                      </Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                        required
                      />
                    </div>
                    {formData.type !== 'individual' && (
                      <>
                        <div>
                          <Label className="label-mono text-[#A6AFBF] mb-2 block">
                            {t('quote.personal.company')}
                          </Label>
                          <Input
                            value={formData.company}
                            onChange={(e) => updateField('company', e.target.value)}
                            className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                          />
                        </div>
                        <div>
                          <Label className="label-mono text-[#A6AFBF] mb-2 block">
                            {t('quote.personal.taxNumber')}
                          </Label>
                          <Input
                            value={formData.taxNumber}
                            onChange={(e) => updateField('taxNumber', e.target.value)}
                            className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
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
                    className="bg-[#007A5E] hover:bg-[#006B52] text-white px-8 py-6 h-auto"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="bg-[#1A2744] p-8 rounded-sm">
                  <h3 className="text-lg font-semibold text-white mb-6 font-['Sora']">
                    {t('quote.project.title')}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">
                        {t('quote.project.type')}
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => updateField('projectType', value)}
                      >
                        <SelectTrigger className="bg-[#0B0F17] border-[#2A3441] text-white h-12">
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A2744] border-[#2A3441]">
                          {[
                            { key: 'new', label: t('quote.project.new') },
                            { key: 'renovation', label: t('quote.project.renovation') },
                            { key: 'extension', label: t('quote.project.extension') },
                            { key: 'infrastructure', label: t('quote.project.infrastructure') },
                            { key: 'other', label: t('quote.project.other') },
                          ].map((type) => (
                            <SelectItem key={type.key} value={type.key} className="text-white">
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">
                        {t('quote.project.description')}
                      </Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        className="bg-[#0B0F17] border-[#2A3441] text-white min-h-[120px] resize-none"
                        placeholder="Décrivez votre projet en détail..."
                        required
                      />
                    </div>

                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">
                        {t('quote.project.location')}
                      </Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        className="bg-[#0B0F17] border-[#2A3441] text-white h-12"
                        placeholder="Pays, ville"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="label-mono text-[#A6AFBF] mb-2 block">
                          {t('quote.project.budget')}
                        </Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => updateField('budget', value)}
                        >
                          <SelectTrigger className="bg-[#0B0F17] border-[#2A3441] text-white h-12">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A2744] border-[#2A3441]">
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range} className="text-white">
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="label-mono text-[#A6AFBF] mb-2 block">
                          {t('quote.project.deadline')}
                        </Label>
                        <Select
                          value={formData.deadline}
                          onValueChange={(value) => updateField('deadline', value)}
                        >
                          <SelectTrigger className="bg-[#0B0F17] border-[#2A3441] text-white h-12">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A2744] border-[#2A3441]">
                            {deadlines.map((deadline) => (
                              <SelectItem key={deadline} value={deadline} className="text-white">
                                {deadline}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="label-mono text-[#A6AFBF] mb-2 block">
                        {t('quote.project.documents')}
                      </Label>
                      <label className="border-2 border-dashed border-[#2A3441] rounded-sm p-8 text-center hover:border-[#007A5E] transition-colors cursor-pointer block">
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
                        <Upload className="w-8 h-8 mx-auto mb-3 text-[#A6AFBF]" />
                        {documentFileName ? (
                          <p className="text-[#007A5E] text-sm font-medium">✅ {documentFileName}</p>
                        ) : (
                          <>
                            <p className="text-[#A6AFBF] text-sm">
                              Glissez-déposez vos fichiers ou cliquez pour parcourir
                            </p>
                            <p className="text-[#4A5568] text-xs mt-2">
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
                    className="border-[#2A3441] text-white hover:bg-[#1A2744] px-8 py-6 h-auto"
                  >
                    Retour
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-[#007A5E] hover:bg-[#006B52] text-white px-8 py-6 h-auto"
                  >
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="bg-[#1A2744] p-8 rounded-sm">
                  <h3 className="text-lg font-semibold text-white mb-6 font-['Sora']">
                    Récapitulatif
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-[#2A3441]">
                      <span className="text-[#A6AFBF]">Type</span>
                      <span className="text-white">{t(`quote.type.${formData.type}`)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2A3441]">
                      <span className="text-[#A6AFBF]">Nom</span>
                      <span className="text-white">{formData.firstname} {formData.lastname}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2A3441]">
                      <span className="text-[#A6AFBF]">Email</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2A3441]">
                      <span className="text-[#A6AFBF]">Téléphone</span>
                      <span className="text-white">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2A3441]">
                      <span className="text-[#A6AFBF]">Type de projet</span>
                      <span className="text-white">{formData.projectType}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2A3441]">
                      <span className="text-[#A6AFBF]">Localisation</span>
                      <span className="text-white">{formData.location}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#2A3441]">
                      <span className="text-[#A6AFBF]">Budget</span>
                      <span className="text-white">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#A6AFBF]">Délai</span>
                      <span className="text-white">{formData.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-[#2A3441] text-white hover:bg-[#1A2744] px-8 py-6 h-auto"
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#007A5E] hover:bg-[#006B52] text-white px-8 py-6 h-auto"
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
