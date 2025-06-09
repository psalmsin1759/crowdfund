const express  = require('express');
const userRoutes = require('./src/routes/user.route');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger');

const app  = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use("/api/users", userRoutes);

module.exports = app;
