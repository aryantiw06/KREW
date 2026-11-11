import { AgentRole, AgentContext, AgentExecutionResult } from '../../interfaces/IAgentContract';
import { directorAgentService } from '../strategyAgent/directorAgentContract';
import { writerAgentService } from '../scriptAgent/writerAgentContract';
import { editorAgentService } from '../videoIntelligence/editorAgentContract';
import { cinematographerAgentService } from '../visualIntelligence/cinematographerAgentContract';
import { publicistAgentService } from '../distribution/publicistAgentContract';
import { producerAgentService } from '../growthIntelligence/producerAgentContract';
import { creatorMemoryService } from '../creatorMemory/creatorMemoryService';
import { logger } from '../../utils/logger';

export class AgentOrchestrator {
  private agentRegistry = {
    director: directorAgentService,
    writer: writerAgentService,
    editor: editorAgentService,
    cinematographer: cinematographerAgentService,
    publicist: publicistAgentService,
    producer: producerAgentService
  };

  public getAgent(role: AgentRole) {
    return this.agentRegistry[role];
  }

  public getAllAgents() {
    return Object.values(this.agentRegistry);
  }

  /**
   * Dispatches task to a specific agent using Creator DNA as context.
   */
  public async dispatch(role: AgentRole, projectId: string, payload: Record<string, any>): Promise<AgentExecutionResult> {
    const agent = this.getAgent(role);
    if (!agent) {
      throw new Error(`Agent with role ${role} not registered`);
    }

    const creatorDna = creatorMemoryService.getProfile();
    const context: AgentContext = {
      projectId,
      creatorDna,
      inputPayload: payload
    };

    logger.info(`[Orchestrator] Dispatching to ${agent.cinematicTitle} (${agent.technicalIdentity})`);
    return await agent.executeAgentTask(context);
  }
}

export const agentOrchestrator = new AgentOrchestrator();

