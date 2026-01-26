import app from './app';
import config from './config/environment';
import { testConnection } from './config/database';
import logger from './utils/logger';

const PORT = config.port;

// Initialize server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    logger.info('Database connection established');

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`🚀 Server running in ${config.nodeEnv} mode`);
      logger.info(`🌐 Server listening on port ${PORT}`);
      logger.info(`📍 API Base URL: http://localhost:${PORT}/api/${config.apiVersion}`);
      logger.info(`💊 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection:', reason);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Start the server
startServer();
