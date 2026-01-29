import config from '../config/environment';

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
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check endpoint',
        description: 'Returns the health status of the server',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'Server is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Server is healthy',
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                      example: '2026-01-29T10:30:00.000Z',
                    },
                    environment: {
                      type: 'string',
                      example: 'development',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
