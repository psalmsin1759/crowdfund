const amqp = require('amqplib');

let channel, connection;

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('[RabbitMQ] Connected');
  } catch (error) {
    console.error('[RabbitMQ] Connection error:', error);
  }
}

async function sendToQueue(queue, message) {
  if (!channel) {
    await connectRabbitMQ();
  }


  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
}

module.exports = {
  connectRabbitMQ,
  sendToQueue,
};
