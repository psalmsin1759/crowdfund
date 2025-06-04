const { sendToQueue } = require('../utils/rabbitmq');

async function sendPushNotification(deviceId, title, message) {
  try {
    const data = {
      type: 'send_push',
      data: {
        deviceId,
        title,
        message,
      },
    };

    await sendToQueue('push_notification', data); 
    console.log(`[PushService] Queued push notification`);
  } catch (error) {
    console.error('[PushService] Failed to queue push notification:', error.message);
  }
}

module.exports = sendPushNotification;
