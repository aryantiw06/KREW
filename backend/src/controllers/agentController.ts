import { Request, Response } from 'express';
import { agentOrchestrator } from '../services/agentOrchestration/orchestratorContract';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AgentRole } from '../interfaces/IAgentContract';

export function getAgents(req: Request, res: Response) {
  const agents = agentOrchestrator.getAllAgents().map((agent) => ({
    role: agent.role,
    cinematicTitle: agent.cinematicTitle,
    technicalIdentity: agent.technicalIdentity,
    status: 'scaffold_ready_for_live_sprint',
    implementationPhase: 'Live 6h Sprint'
  }));

  return sendSuccess(res, agents, 'Registered agent workforce retrieved');
}

export function getAgentContract(req: Request, res: Response) {
  const { role } = req.params;
  const agent = agentOrchestrator.getAgent(role as AgentRole);

  if (!agent) {
    return sendError(res, `Agent with role ${role} not found`, 404);
  }

  const contractInfo = {
    role: agent.role,
    cinematicTitle: agent.cinematicTitle,
    technicalIdentity: agent.technicalIdentity,
    status: 'pending_live_sprint',
    reservedCapabilities: [
      'Autonomous tool calling',
      'LLM inference integration',
      'Prompt tuning & persona evaluation'
    ],
    governanceNotice: 'Pre-event architecture: No fake AI execution performed in this endpoint.'
  };

  return sendSuccess(res, contractInfo, `Contract specification for ${agent.cinematicTitle}`);
}

