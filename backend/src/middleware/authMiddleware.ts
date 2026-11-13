import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';
import { getDemoSession } from '../services/demoSessionStore';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return sendError(res, 'Authentication token required', 401);
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) {
    return sendError(res, 'Authentication token missing or invalid', 401);
  }

  const session = getDemoSession(token);
  if (!session) return sendError(res, 'Session is invalid or expired; please sign in again', 401);
  (req as any).user = session;
  return next();
}

