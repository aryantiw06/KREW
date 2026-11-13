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
      origin: [...new Set([...config.corsOrigins, 'http://localhost:5173', 'http://127.0.0.1:5173'])],
      credentials: true
    })
  );

  // Body Parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use((req, _res, next) => {
    if (req.body && typeof req.body === 'object') sanitizeInput(req.body);
    next();
  });

  // Request Logging
  app.use(requestLogger);

  // Direct Health Route for orchestration probes
  app.get('/health', getHealth);
  app.get('/api/health', getHealth);

  // Mount API v1 router
  app.use(config.apiPrefix, apiRouter);

  app.use((_req, res) => sendError(res, 'Route not found', 404));

  // Centralized Error Handling
  app.use(errorHandler);

  return app;
}

import { sendError } from './utils/apiResponse';

function sanitizeInput(value: unknown): void {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) { value.forEach(sanitizeInput); return; }
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (key.startsWith('$') || key.includes('.')) { delete record[key]; continue; }
    sanitizeInput(record[key]);
  }
}

