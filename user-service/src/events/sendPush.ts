import { sendToQueue } from "@/utils/rabbitmq";

interface Message {
  deviceId: string;
  title: string;
  message: string;
}


async function sendPushNotification(deviceId: string, title: string, message: string): Promise<void> {
  try {
    const data = {
      type: 'send_push',
      data: {
        deviceId,
        title,
        message,
      } as Message, 
    };

    await sendToQueue('push_notification', data); 
    console.log(`[PushService] Queued push notification`);
  } catch (error: any) {
    console.error('[PushService] Failed to queue push notification:', error.message);
  }
}

module.exports = sendPushNotification;
