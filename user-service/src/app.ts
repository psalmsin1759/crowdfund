import express, { Application } from 'express';
import userRoutes from '@/routes/user.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@/utils/swagger';

const app: Application = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRoutes);

export default app;
