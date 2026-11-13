import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { sendError } from '../utils/apiResponse';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(`[Unhandled Error] ${req.method} ${req.path}: ${err.message || 'Unknown error'}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return sendError(res, statusCode >= 500 ? 'Internal server error' : message, statusCode);
}

