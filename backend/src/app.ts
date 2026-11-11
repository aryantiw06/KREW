import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config/environment';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { apiRouter } from './routes';
import { getHealth } from './controllers/healthController';

export function createApp(): Express {
  const app = express();

  // Basic Security & CORS
  app.use(
    cors({
      origin: [config.corsOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true
    })
  );

  // Body Parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request Logging
  app.use(requestLogger);

  // Direct Health Route for orchestration probes
  app.get('/health', getHealth);
  app.get('/api/health', getHealth);

  // Mount API v1 router
  app.use(config.apiPrefix, apiRouter);

  // Centralized Error Handling
  app.use(errorHandler);

  return app;
}
