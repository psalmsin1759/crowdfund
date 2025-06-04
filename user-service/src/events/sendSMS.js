const { sendToQueue } = require('../utils/rabbitmq');

async function sendSMS(phone, messageText) {
  try {
    const message = {
      type: 'send_sms',
      data: {
        phone,
        message: messageText,
      },
    };

    await sendToQueue('sms_notification', message); 
    console.log(`[SMSService] Queued SMS to ${phone}`);
  } catch (error) {
    console.error('[SMSService] Failed to queue SMS:', error.message);
  }
}

module.exports = sendSMS;
