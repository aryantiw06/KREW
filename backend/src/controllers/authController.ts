import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { createDemoSession, revokeDemoSession } from '../services/demoSessionStore';
import { getPersistenceMode } from '../config/database';

const validEmail = (value: unknown): value is string => typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validPassword = (value: unknown): value is string => typeof value === 'string' && value.length >= 8 && value.length <= 128;
const demoPayload = (user: { id: string; name: string; email: string; handle: string; role: 'creator_star' }) => ({ user: { ...user, demoMode: true }, token: createDemoSession(user), demoMode: true, persistence: getPersistenceMode() });

export function login(req: Request, res: Response) {
  const { email, password } = req.body || {};
  if (!validEmail(email) || !validPassword(password)) return sendError(res, 'Enter a valid email and a password of at least 8 characters', 400);
  const localPart = email.split('@')[0];
  const payload = demoPayload({ id: `demo-${encodeURIComponent(email)}`, name: localPart, email, handle: `@${localPart.replace(/[^a-zA-Z0-9_]/g, '') || 'creator'}`, role: 'creator_star' });
  return sendSuccess(res, payload, 'Local DEMO MODE session created. This session is not production-secure and is stored only in server memory.');
}

export function register(req: Request, res: Response) {
  const { name, email, password } = req.body || {};
  if (typeof name !== 'string' || !name.trim() || name.length > 100 || !validEmail(email) || !validPassword(password)) return sendError(res, 'Provide a name (up to 100 characters), valid email, and password of at least 8 characters', 400);
  const handle = `@${name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'creator'}`;
  return sendSuccess(res, demoPayload({ id: `demo-${encodeURIComponent(email)}`, name: name.trim(), email, handle, role: 'creator_star' }), 'Local DEMO MODE session created. No password was stored; this is not production authentication.', 201);
}

export function getCurrentUser(req: Request, res: Response) {
  const currentUser = (req as any).user;
  if (!currentUser) return sendError(res, 'Authentication required', 401);
  return sendSuccess(res, { user: currentUser, demoMode: true, persistence: getPersistenceMode() }, 'Current demo session is active.');
}

export function logout(req: Request, res: Response) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (token) revokeDemoSession(token);
  return sendSuccess(res, { loggedOut: true, demoMode: true }, 'Demo session ended.');
}
