const { sendToQueue } = require('../utils/rabbitmq');

async function sendEmail(email, subject, body) {
  try {
    const message = {
      type: 'send_email',
      data: {
        to: email,
        subject,
        body,
      },
    };

    await sendToQueue('email_notification', message); 
    console.log(`[EmailService] Queued email to ${email}`);
  } catch (error) {
    console.error('[EmailService] Failed to queue email:', error.message);
  }
}

module.exports = sendEmail;
