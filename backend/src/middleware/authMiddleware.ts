import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // Pre-event scaffolding: allows development bypass with dummy user context if header is omitted
  if (!authHeader) {
    (req as any).user = {
      id: 'usr-001',
      name: 'Kabir Sharma',
      email: 'kabir@krew.studio',
      handle: '@kabircreates',
      role: 'creator_star'
    };
    return next();
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) {
    return sendError(res, 'Authentication token missing or invalid', 401);
  }

  // Token decode mock / scaffold
  (req as any).user = {
    id: 'usr-001',
    name: 'Kabir Sharma',
    email: 'kabir@krew.studio',
    handle: '@kabircreates',
    role: 'creator_star'
  };

  next();
}
