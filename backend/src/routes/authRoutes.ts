import { Router } from 'express';
import { login, register, getCurrentUser, logout } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

export const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.get('/me', authenticate, getCurrentUser);
authRoutes.post('/logout', authenticate, logout);

