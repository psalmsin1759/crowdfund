import express, { Application } from 'express';
import projectRouter from '@/routes/project.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@/utils/swagger';

const app: Application = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/projects', projectRouter);

export default app;
