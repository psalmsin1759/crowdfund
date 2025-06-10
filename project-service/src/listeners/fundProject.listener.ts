import { getRabbitMQChannel } from '@/utils/rabbitmq';
import Project from '@/models/project.model';

const QUEUE_NAME = 'project.funding';

export const startFundingListener = async () => {
  try {
    const channel = await getRabbitMQChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(` Listening on queue: ${QUEUE_NAME}`);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (!msg) return;

      try {
        const payload = JSON.parse(msg.content.toString());
        /*
{
  "projectId": "664cd1f3a7c122fa8cf058fb",
  "amount": 5000
}

        */
        const { projectId, amount } = payload;

        if (!projectId || typeof amount !== 'number') {
          console.error(' Invalid message format:', payload);
          return channel.nack(msg, false, false);
        }

        const updated = await Project.findByIdAndUpdate(
          projectId,
          { $inc: { fundedAmount: amount, backersCount: 1 } },
          { new: true }
        );

        if (!updated) {
          console.error(` Project not found: ${projectId}`);
          return channel.nack(msg, false, false);
        }

        console.log(` Funded ${amount} → Project: ${updated._id} (Total: ${updated.fundedAmount})`);
        channel.ack(msg);
      } catch (err) {
        console.error(' Error processing message:', err);
        channel.nack(msg, false, false);
      }
    });
  } catch (err) {
    console.error(' Error initializing funding listener:', err);
  }
};
