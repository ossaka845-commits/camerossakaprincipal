import jsPDF from 'jspdf';

// ============================================================
// ENVOI DE PDF PAR EMAIL — 100% GRATUIT
// ============================================================
// Utilise Google Apps Script (gratuit, aucune inscription payante)
//
// CONFIGURATION EN 5 MINUTES :
//
// 1. Allez sur https://script.google.com
// 2. Cliquez sur "Nouveau projet"
// 3. Supprimez le code existant et collez le contenu du fichier
//    src/lib/google-apps-script.js
// 4. Cliquez sur "Déployer" → "Nouveau déploiement"
// 5. Type : "Application Web"
// 6. "Exécuter en tant que" : Moi-même
// 7. "Qui a accès" : Tout le monde
// 8. Cliquez sur "Déployer" et autorisez l'accès
// 9. Copiez l'URL générée et collez-la ci-dessous ↓
// ============================================================

const GOOGLE_SCRIPT_URL = 'COLLEZ_VOTRE_URL_ICI';
const RECIPIENT_EMAIL = 'bienvenuyann2@gmail.com';

interface FormField {
  label: string;
  value: string;
}

interface FormSubmission {
  title: string;
  fields: FormField[];
  language: 'en' | 'fr';
  senderEmail?: string;
  senderName?: string;
}

/**
 * Génère un PDF professionnel avec les données du formulaire
 */
function generatePDF(submission: FormSubmission): jsPDF {
  const doc = new jsPDF();
  const isEnglish = submission.language === 'en';
  const locale = isEnglish ? 'en-GB' : 'fr-FR';
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ── En-tête avec bande rouge ──
  doc.setFillColor(206, 17, 38);
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('CAMER-OSSAKA CONNEXION', margin, 22);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(isEnglish ? 'Construction & Civil Engineering' : 'Construction & BTP', margin, 30);
  doc.text('www.camerossaka.com', margin, 36);

  const now = new Date();
  const dateStr = now.toLocaleString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.setFontSize(9);
  doc.text(dateStr, pageWidth - margin, 30, { align: 'right' });

  y = 60;

  // ── Titre du formulaire ──
  doc.setTextColor(17, 17, 17);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(submission.title, margin, y);

  y += 5;
  doc.setDrawColor(206, 17, 38);
  doc.setLineWidth(2);
  doc.line(margin, y, margin + 60, y);

  y += 15;

  // ── Contenu du formulaire ──
  doc.setFontSize(11);
  let isAlternate = false;

  for (const field of submission.fields) {
    if (y > 260) {
      doc.addPage();
      y = margin;
    }

    if (isAlternate) {
      doc.setFillColor(245, 247, 250);
      doc.rect(margin, y - 5, contentWidth, 14, 'F');
    }

    doc.setTextColor(107, 114, 128);
    doc.setFont('helvetica', 'bold');
    doc.text(field.label + ' :', margin + 2, y + 2);

    doc.setTextColor(17, 17, 17);
    doc.setFont('helvetica', 'normal');

    if (field.value && field.value.length > 60) {
      y += 10;
      const lines = doc.splitTextToSize(field.value, contentWidth - 4);
      doc.text(lines, margin + 2, y + 2);
      y += lines.length * 6;
    } else {
      doc.text(field.value || '—', margin + 80, y + 2);
      y += 14;
    }

    isAlternate = !isAlternate;
  }

  // ── Pied de page ──
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    isEnglish
      ? 'This document was automatically generated from the Camer-Ossaka Connexion website.'
      : 'Ce document a été généré automatiquement depuis le site Camer-Ossaka Connexion.',
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );
  doc.text(
    `${isEnglish ? 'Contact email' : 'Email de contact'} : ${RECIPIENT_EMAIL}`,
    pageWidth / 2,
    footerY + 5,
    { align: 'center' }
  );

  return doc;
}

/**
 * Formate le résumé texte pour le corps de l'email
 */
function formatTextBody(submission: FormSubmission): string {
  const isEnglish = submission.language === 'en';
  const locale = isEnglish ? 'en-GB' : 'fr-FR';
  const visitor = isEnglish ? 'Visitor' : 'Visiteur';
  const lines: string[] = [];
  lines.push(`${isEnglish ? 'Form' : 'Formulaire'} : ${submission.title}`);
  lines.push(`Date : ${new Date().toLocaleString(locale, {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })}`);
  lines.push(`${isEnglish ? 'From' : 'De'} : ${submission.senderName || visitor} (${submission.senderEmail || '—'})`);
  lines.push('');

  for (const field of submission.fields) {
    lines.push(`${field.label} : ${field.value || '—'}`);
  }

  return lines.join('\n');
}

/**
 * Génère le PDF et l'envoie par email à bienvenuyann2@gmail.com
 * via Google Apps Script (100% gratuit)
 *
 * Le PDF n'est PAS téléchargé localement.
 * Il est envoyé uniquement par email en pièce jointe.
 */
export async function generateAndSendForm(
  submission: FormSubmission
): Promise<{ success: boolean; error?: string }> {
  // 1. Générer le PDF
  const pdf = generatePDF(submission);

  // 2. Convertir le PDF en base64
  const pdfBase64 = pdf.output('datauristring').split(',')[1];

  // 3. Préparer le nom du fichier
  const fileName = `${submission.title.replace(/\s+/g, '_')}_${Date.now()}.pdf`;

  // 4. Préparer le sujet de l'email
  const visitor = submission.language === 'en' ? 'Visitor' : 'Visiteur';
  const subject = `[Camer-Ossaka Connexion] ${submission.title} — ${submission.senderName || visitor}`;

  // 5. Envoyer au Google Apps Script
  try {
    if (GOOGLE_SCRIPT_URL === 'COLLEZ_VOTRE_URL_ICI') {
      console.error(
        '⚠️ Google Apps Script non configuré !',
        'Suivez les instructions dans src/lib/formMailer.ts'
      );
      // Fallback : télécharger le PDF localement si pas configuré
      pdf.save(fileName);
      return {
        success: true,
        error: 'Google Apps Script non configuré. Le PDF a été téléchargé en local.',
      };
    }

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        pdfBase64,
        fileName,
        subject,
        textBody: formatTextBody(submission),
        toEmail: RECIPIENT_EMAIL,
        senderName: submission.senderName || visitor,
        senderEmail: submission.senderEmail || '',
      }),
    });

    // Avec mode: 'no-cors', on ne peut pas lire la réponse
    // mais la requête est bien envoyée
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    return {
      success: false,
      error: `Erreur d'envoi: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

export type { FormSubmission, FormField };
