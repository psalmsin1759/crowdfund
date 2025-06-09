import { sendToQueue } from '@/utils/rabbitmq';

interface Message {
  phone: string;
  message: string;
}

async function sendSMS(phone: string, messageText: string): Promise<void> {
  try {
    const message = {
      type: 'send_sms',
      data: {
        phone,
        message: messageText,
      } as Message,
    };

    await sendToQueue('sms_notification', message); 
    console.log(`[SMSService] Queued SMS to ${phone}`);
  } catch (error: any) {
    console.error('[SMSService] Failed to queue SMS:', error.message);
  }
}

module.exports = sendSMS;
