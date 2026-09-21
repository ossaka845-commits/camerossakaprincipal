// ============================================================
// GOOGLE APPS SCRIPT — À DÉPLOYER UNE SEULE FOIS (GRATUIT)
// ============================================================
//
// INSTRUCTIONS :
//
// 1. Allez sur https://script.google.com
// 2. Connectez-vous avec votre compte Google
// 3. Cliquez sur "Nouveau projet"
// 4. Supprimez tout le code existant
// 5. Copiez-collez TOUT le code ci-dessous
// 6. Cliquez sur "Déployer" → "Nouveau déploiement"
// 7. Cliquez sur l'engrenage ⚙️ → Sélectionnez "Application Web"
// 8. "Exécuter en tant que" : Moi-même
// 9. "Qui a accès" : Tout le monde
// 10. Cliquez sur "Déployer"
// 11. Autorisez l'accès quand Google le demande
// 12. Copiez l'URL affichée
// 13. Collez cette URL dans src/lib/formMailer.ts
//     → remplacez 'COLLEZ_VOTRE_URL_ICI' par votre URL
//
// C'est terminé ! Les formulaires enverront automatiquement
// les PDF à bienvenuyann2@gmail.com
// ============================================================

function doPost(e) {
  try {
    // Récupérer les données envoyées par le site
    var data = JSON.parse(e.postData.contents);

    // Décoder le PDF depuis base64
    var pdfBytes = Utilities.base64Decode(data.pdfBase64);
    var pdfBlob = Utilities.newBlob(pdfBytes, 'application/pdf', data.fileName);

    // Construire le corps HTML de l'email
    var htmlBody = '<div style="font-family: Arial, sans-serif; max-width: 600px;">';
    htmlBody += '<div style="background-color: #CE1126; padding: 20px; color: white;">';
    htmlBody += '<h1 style="margin: 0; font-size: 24px;">CAMEROSSAKA</h1>';
    htmlBody += '<p style="margin: 5px 0 0 0; opacity: 0.8;">Construction & BTP</p>';
    htmlBody += '</div>';
    htmlBody += '<div style="padding: 20px; background-color: #f5f7fa;">';
    htmlBody += '<h2 style="color: #111111;">' + data.subject + '</h2>';
    htmlBody += '<p style="color: #666;">De : ' + (data.senderName || 'Visiteur') + ' (' + (data.senderEmail || '—') + ')</p>';
    htmlBody += '<hr style="border: 1px solid #ddd;">';
    htmlBody += '<pre style="white-space: pre-wrap; font-family: Arial; color: #333;">' + data.textBody + '</pre>';
    htmlBody += '</div>';
    htmlBody += '<div style="background-color: #111111; padding: 15px; text-align: center;">';
    htmlBody += '<p style="color: #A6AFBF; font-size: 12px; margin: 0;">Le PDF est en pièce jointe de cet email.</p>';
    htmlBody += '</div>';
    htmlBody += '</div>';

    // Envoyer l'email avec le PDF en pièce jointe
    GmailApp.sendEmail(
      data.toEmail,           // bienvenuyann2@gmail.com
      data.subject,           // Sujet de l'email
      data.textBody,          // Corps texte (fallback)
      {
        htmlBody: htmlBody,   // Corps HTML formaté
        attachments: [pdfBlob], // PDF en pièce jointe
        name: 'CamerOssaka - Site Web'
      }
    );

    // Réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Réponse d'erreur
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Nécessaire pour que Google Apps Script accepte les requêtes GET (test)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'CamerOssaka Form Mailer est actif !'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
