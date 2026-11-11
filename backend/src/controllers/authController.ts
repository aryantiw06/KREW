import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';

export function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 'Email and password are required', 400);
  }

  const mockUser = {
    id: 'usr-001',
    name: 'Kabir Sharma',
    email,
    handle: '@kabircreates',
    role: 'creator_star',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  };

  const token = 'mock_jwt_token_krew_hackathon_star_kabir_2026';

  return sendSuccess(res, { user: mockUser, token }, 'Authentication successful');
}

export function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendError(res, 'Name, email, and password are required', 400);
  }

  const newUser = {
    id: `usr-${Date.now().toString().slice(-4)}`,
    name,
    email,
    handle: `@${name.toLowerCase().replace(/\s+/g, '')}`,
    role: 'creator_star'
  };

  const token = 'mock_jwt_token_krew_hackathon_new_star';

  return sendSuccess(res, { user: newUser, token }, 'Creator registered successfully', 201);
}

export function getCurrentUser(req: Request, res: Response) {
  const currentUser = (req as any).user || {
    id: 'usr-001',
    name: 'Kabir Sharma',
    email: 'kabir@krew.studio',
    handle: '@kabircreates',
    role: 'creator_star'
  };

  return sendSuccess(res, { user: currentUser }, 'Current creator profile fetched');
}

