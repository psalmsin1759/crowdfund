import 'module-alias/register';


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '@/app';
import { connectRabbitMQ } from '@/utils/rabbitmq';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';
const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  console.error('MONGO_URI not defined in environment');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${HOST}:${PORT}`);
    });
    connectRabbitMQ();
  })
  .catch((err: Error) => {
    console.error('DB connection error:', err);
  });
