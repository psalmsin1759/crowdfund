import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crowdfundr Project Service API',
      version: '1.0.0',
      description: 'API documentation for project-related endpoints in the crowdfunding microservice',
    },
    servers: [
      {
        url: `${process.env.HOST}:${process.env.PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
