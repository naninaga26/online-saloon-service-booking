import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import config from './config/environment';
import logger from './utils/logger';

// Create Express application
const app: Application = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logger
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan('combined', {
      stream: {
        write: (message: string) => logger.http(message.trim()),
      },
    })
  );
}

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API version endpoint
app.get(`/api/${config.apiVersion}`, (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Salon Booking API',
    version: config.apiVersion,
    timestamp: new Date().toISOString(),
  });
});

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// Import error handlers
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

// Register routes
app.use(`/api/${config.apiVersion}/auth`, authRoutes);
app.use(`/api/${config.apiVersion}/users`, userRoutes);

// Additional routes will be added here
// app.use(`/api/${config.apiVersion}/services`, serviceRoutes);
// app.use(`/api/${config.apiVersion}/slots`, slotRoutes);
// app.use(`/api/${config.apiVersion}/bookings`, bookingRoutes);
// app.use(`/api/${config.apiVersion}/payments`, paymentRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
