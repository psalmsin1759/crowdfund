const fs = require('fs');
const path = require('path');

const MailTrapProvider = require('../providers/email/MailTrapProvider');
const SendGridProvider = require('../providers/email/SendGridProvider'); 

function getEmailProvider() {
  switch (process.env.EMAIL_PROVIDER) {
    case 'mailtrap':
      return new MailTrapProvider();
    case 'nodemailer':
      return new SendGridProvider();
    default:
      return new MailTrapProvider();
  }
}

const provider = new getEmailProvider(); 

function loadTemplate(templateName, variables = {}) {
  const filePath = path.join(__dirname, '../templates', `${templateName}.html`);
  let html = fs.readFileSync(filePath, 'utf8');

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    html = html.replace(regex, value);
  }

  return html;
}

async function sendEmail(to, subject, body) {
  try {
    const variables = {
      content: body,
    };
    const html = loadTemplate("emailTemplate", variables);
    await provider.send(to, subject, html);
    console.log(`[EmailService] Sent email to ${to}`);
  } catch (error) {
    console.error('[EmailService] Failed to send email:', error.message);
    throw error;
  }
}

module.exports = sendEmail;
