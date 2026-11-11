import { Router } from 'express';
import { getCreatorDna, updateCreatorDna, syncCreatorDna } from '../controllers/creatorDnaController';
import { authenticate } from '../middleware/authMiddleware';

export const creatorDnaRoutes = Router();

creatorDnaRoutes.get('/', authenticate, getCreatorDna);
creatorDnaRoutes.put('/', authenticate, updateCreatorDna);
creatorDnaRoutes.post('/sync', authenticate, syncCreatorDna);

