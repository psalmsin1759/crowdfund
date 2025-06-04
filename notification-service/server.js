require('dotenv').config();
const amqp = require('amqplib');
const sendEmail = require('./src/services/emailService');
const sendSMS = require('./src/services/smsService');
const sendPush = require('./src/services/pushNotificationService');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';


const QUEUES = {
  email_notification: async (data) => {
    await sendEmail(data.to, data.subject, data.body);
  },
  sms_notification: async (data) => {
    await sendSMS(data.phone, data.message);
  },
  push_notification: async (data) => {
    await sendPush(data.title, data.message);
  },
};

async function startNotificationConsumers() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    console.log(`[NotificationConsumer] Connected to RabbitMQ`);


    for (const [queueName, handler] of Object.entries(QUEUES)) {
      await channel.assertQueue(queueName, { durable: true });

      console.log(`[NotificationConsumer] Listening on ${queueName}...`);

      channel.consume(
        queueName,
        async (msg) => {
          if (msg !== null) {
            try {
              const message = JSON.parse(msg.content.toString());

              await handler(message.data);
              channel.ack(msg);
            } catch (err) {
              console.error(`[NotificationConsumer] Error in ${queueName}:`, err);
              channel.nack(msg, false, false); 
            }
          }
        },
        { noAck: false }
      );
    }
  } catch (err) {
    console.error('[NotificationConsumer] Failed to connect:', err);
  }
}

startNotificationConsumers();
