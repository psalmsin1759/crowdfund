import amqp, { ChannelModel, Channel } from 'amqplib';

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

export const getRabbitMQChannel = async (): Promise<Channel> => {
  if (channel) return channel;

  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log(' Connected to RabbitMQ');
    return channel;
  } catch (error) {
    console.error(' Failed to connect to RabbitMQ:', error);
    throw error;
  }
};

export const closeRabbitMQ = async () => {
  try {
    if (channel) await channel.close();
    if (connection) await connection.close();
    console.log('🚪 Closed RabbitMQ connection');
  } catch (error) {
    console.error(' Error closing RabbitMQ:', error);
  }
};
