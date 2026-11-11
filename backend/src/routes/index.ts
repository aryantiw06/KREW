import { Router } from 'express';
import { healthRoutes } from './healthRoutes';
import { authRoutes } from './authRoutes';
import { creatorDnaRoutes } from './creatorDnaRoutes';
import { projectRoutes } from './projectRoutes';
import { agentRoutes } from './agentRoutes';

export const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/creator-dna', creatorDnaRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/agents', agentRoutes);

