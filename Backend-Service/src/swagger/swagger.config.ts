import config from '../config/environment';
import { healthPaths } from './paths/health.paths';
import { authPaths } from './paths/auth.paths';
import { userPaths } from './paths/user.paths';

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Salon Booking API',
    version: '1.0.0',
    description: 'API documentation for Salon Booking Service',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token in the format: Bearer <token>',
      },
    },
  },
  paths: {
    ...healthPaths,
    ...authPaths,
    ...userPaths,
  },
};
