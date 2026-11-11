import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProjectStatus
} from '../controllers/projectController';
import { authenticate } from '../middleware/authMiddleware';

export const projectRoutes = Router();

projectRoutes.get('/', authenticate, getProjects);
projectRoutes.get('/:id', authenticate, getProjectById);
projectRoutes.post('/', authenticate, createProject);
projectRoutes.patch('/:id/status', authenticate, updateProjectStatus);

