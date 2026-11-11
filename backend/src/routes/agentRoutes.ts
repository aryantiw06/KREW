import { Router } from 'express';
import { getAgents, getAgentContract } from '../controllers/agentController';

export const agentRoutes = Router();

agentRoutes.get('/', getAgents);
agentRoutes.get('/:role/contract', getAgentContract);

