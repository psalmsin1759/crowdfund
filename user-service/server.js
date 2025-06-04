const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const { connectRabbitMQ } = require('./src/utils/rabbitmq');




mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
       console.log(`Server is running on ${process.env.HOST}:${process.env.PORT || 3000}`);
    });
    connectRabbitMQ();
  })
  .catch(err => console.error('DB connection error:', err));


