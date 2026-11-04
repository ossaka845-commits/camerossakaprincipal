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

const budgetRanges = ['under30', '30to60', '60to300', '300to600', '600to3000', 'over3000'];
const deadlines = ['under3', '3to6', '6to12', '1to2', 'over2'];

export default function Devis() {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
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
    setSubmitError('');

    try {
      await generateAndSendForm({
        title: t('quote.title'),
        language: (i18n.resolvedLanguage || i18n.language).startsWith('en') ? 'en' : 'fr',
        senderName: `${formData.firstname} ${formData.lastname}`,
        senderEmail: formData.email,
        fields: [
          { label: t('quote.type.label'), value: t(`quote.type.${formData.type}`) },
          { label: t('quote.personal.firstname'), value: formData.firstname },
          { label: t('quote.personal.lastname'), value: formData.lastname },
          { label: t('quote.personal.email'), value: formData.email },
          { label: t('quote.personal.phone'), value: formData.phone },
          ...(formData.company ? [{ label: t('quote.personal.company'), value: formData.company }] : []),
          ...(formData.taxNumber ? [{ label: t('quote.personal.taxNumber'), value: formData.taxNumber }] : []),
          { label: t('quote.project.type'), value: t(`quote.project.${formData.projectType}`) },
          { label: t('quote.project.description'), value: formData.description },
          { label: t('quote.project.location'), value: formData.location },
          { label: t('quote.project.budget'), value: t(`quote.budgets.${formData.budget}`) },
          { label: t('quote.project.deadline'), value: t(`quote.deadlines.${formData.deadline}`) },
          ...(documentFileName ? [{ label: t('quote.project.documents'), value: documentFileName }] : []),
        ],
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitError(t('quote.submitError'));
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
          <div className="w-20 h-20 mx-auto mb-6 bg-[#CE1126] rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="heading-display text-3xl md:text-4xl text-[#111111] mb-4">
            {t('quote.success')}
          </h1>
          <p className="text-[#666666] mb-8">
            {t('quote.successDetails')}
          </p>
          <a
            href="/"
            className="btn-primary"
          >
            {t('quote.backHome')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="page-container mb-12">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 border-l-2 border-[#CE1126] pl-3 mb-6">
            <span className="text-sm text-[#CE1126] label-mono">{t('nav.quote')}</span>
          </div>
          <h1 className="heading-display text-[clamp(40px,8vw,72px)] text-[#111111] mb-4">
            {t('quote.title')}
          </h1>
          <p className="text-xl text-[#666666]">{t('quote.subtitle')}</p>
        </div>
      </section>

      {/* Form */}
      <section className="page-container">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-[#CE1126] text-white' : 'bg-[#E5E5E5] text-[#666666]'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 rounded ${
                      step > s ? 'bg-[#CE1126]' : 'bg-[#E5E5E5]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {submitError && (
              <p role="alert" className="border border-[#CE1126] bg-[#CE1126]/10 p-4 text-sm text-[#CE1126]">
                {submitError}
              </p>
            )}
            {/* Step 1: Type & Personal Info */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5E5E5] p-6 md:p-8">
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
                        <RadioGroupItem value={type.key} id={type.key} className="border-[#CE1126]" />
                        <Label htmlFor={type.key} className="text-[#111111] cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="bg-white border border-[#E5E5E5] p-6 md:p-8">
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
                    className="btn-primary px-8 py-6 h-auto"
                  >
                    {t('quote.continue')}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5E5E5] p-6 md:p-8">
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
                          <SelectValue placeholder={t('quote.select')} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#E5E5E5]">
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
                        placeholder={t('quote.descriptionPlaceholder')}
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
                        placeholder={t('quote.locationPlaceholder')}
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
                            <SelectValue placeholder={t('quote.select')} />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-[#E5E5E5]">
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range} className="text-[#111111]">
                                {t(`quote.budgets.${range}`)}
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
                            <SelectValue placeholder={t('quote.select')} />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-[#E5E5E5]">
                            {deadlines.map((deadline) => (
                              <SelectItem key={deadline} value={deadline} className="text-[#111111]">
                                {t(`quote.deadlines.${deadline}`)}
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
                      <label className="border border-dashed border-[#E5E5E5] p-8 text-center hover:border-[#CE1126] transition-colors cursor-pointer block">
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
                          <p className="text-[#CE1126] text-sm font-medium">✅ {documentFileName}</p>
                        ) : (
                          <>
                            <p className="text-[#666666] text-sm">
                              {t('quote.uploadInstructions')}
                            </p>
                            <p className="text-[#999999] text-xs mt-2">
                              {t('quote.uploadLimits')}
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
                    className="px-8 py-6 h-auto"
                  >
                    {t('quote.back')}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-primary px-8 py-6 h-auto"
                  >
                    {t('quote.continue')}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5E5E5] p-6 md:p-8">
                  <h3 className="text-lg font-semibold text-[#111111] mb-6 font-['Sora']">
                    {t('quote.summary')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">{t('quote.review.type')}</span>
                      <span className="text-[#111111]">{t(`quote.type.${formData.type}`)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">{t('quote.review.name')}</span>
                      <span className="text-[#111111]">{formData.firstname} {formData.lastname}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">{t('quote.review.email')}</span>
                      <span className="text-[#111111]">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">{t('quote.review.phone')}</span>
                      <span className="text-[#111111]">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">{t('quote.review.projectType')}</span>
                      <span className="text-[#111111]">{t(`quote.project.${formData.projectType}`)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">{t('quote.review.location')}</span>
                      <span className="text-[#111111]">{formData.location}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-[#E5E5E5]">
                      <span className="text-[#666666]">{t('quote.review.budget')}</span>
                      <span className="text-[#111111]">{t(`quote.budgets.${formData.budget}`)}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#666666]">{t('quote.review.deadline')}</span>
                      <span className="text-[#111111]">{t(`quote.deadlines.${formData.deadline}`)}</span>
                    </div>
                  </div>
                </div>

                {/* Consentement anonymat */}
                <div className="bg-[#F8F8F8] border border-[#E5E5E5] p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 w-4 h-4 accent-[#CE1126] shrink-0" />
                    <span className="text-sm text-[#666666]">
                      {t('quote.privacyConsent')} <span className="text-[#CE1126]">*</span>
                    </span>
                  </label>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="px-8 py-6 h-auto"
                  >
                    {t('quote.back')}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary px-8 py-6 h-auto"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t('common.sending')}</>
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
