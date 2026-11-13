import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const safePath = req.path.replace(/\/[^/]+@[^/]+/g, '/[redacted]');
    logger.info(`[HTTP] ${req.method} ${safePath} ${res.statusCode} - ${duration}ms`);
  });

  next();
}

