import fs from 'fs';
import path from 'path';

import MailTrapProvider from '@/providers/email/MailTrapProvider';
import SendGridProvider from '@/providers/email/SendGridProvider';
import EmailProviderInterface from '@/interfaces/EmailProviderInterface';



function getEmailProvider(): EmailProviderInterface {
  switch (process.env.EMAIL_PROVIDER) {
    case 'mailtrap':
      return new MailTrapProvider();
    case 'nodemailer':
      return new SendGridProvider();
    default:
      return new MailTrapProvider();
  }
}

const provider = getEmailProvider();

function loadTemplate(templateName: string, variables: Record<string, string> = {}): string {
  const filePath = path.join(__dirname, '../templates', `${templateName}.html`);
  let html = fs.readFileSync(filePath, 'utf8');

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    html = html.replace(regex, value);
  }

  return html;
}

export default async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  try {
    const variables = {
      content: body,
    };

    const html = loadTemplate('emailTemplate', variables);
    await provider.send(to, subject, html);
    console.log(`[EmailService] Sent email to ${to}`);
  } catch (error: any) {
    console.error('[EmailService] Failed to send email:', error.message);
    throw error;
  }
}
