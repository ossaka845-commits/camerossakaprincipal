import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const sections = [
  { id: 'conditions', key: 'terms', paragraphs: 3 },
  { id: 'confidentialite', key: 'privacy', paragraphs: 4 },
  { id: 'mentions-legales', key: 'notice', paragraphs: 4 },
  { id: 'cookies', key: 'cookies', paragraphs: 3 },
] as const;

export default function Legal() {
  const { t } = useTranslation();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [hash]);

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16 pt-28">
      <header className="page-container mb-12">
        <p className="label-mono mb-4 text-[10px] text-[#CE1126]">{t('legalPage.badge')}</p>
        <h1 className="heading-display text-[clamp(36px,6vw,60px)] text-[#111111]">
          {t('legalPage.title')}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#666666]">
          {t('legalPage.intro')}
        </p>
        <nav aria-label={t('legalPage.contents')} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm font-medium text-[#CE1126] underline-offset-4 hover:underline"
            >
              {t(`legalPage.sections.${section.key}.title`)}
            </a>
          ))}
        </nav>
      </header>

      <main className="page-container space-y-6">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 border border-[#E5E5E5] bg-white p-6 sm:p-8"
          >
            <h2 className="heading-display mb-5 text-2xl text-[#111111]">
              {t(`legalPage.sections.${section.key}.title`)}
            </h2>
            <div className="space-y-4 text-sm leading-[1.8] text-[#555555]">
              {Array.from({ length: section.paragraphs }, (_, index) => (
                <p key={index}>{t(`legalPage.sections.${section.key}.p${index + 1}`)}</p>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
