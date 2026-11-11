import { ICreatorProfile } from './ICreatorProfile';

export type AgentRole = 'director' | 'writer' | 'editor' | 'cinematographer' | 'publicist' | 'producer';

export interface AgentContext {
  projectId: string;
  creatorDna: ICreatorProfile;
  inputPayload: Record<string, any>;
  sessionMetadata?: Record<string, any>;
}

export interface AgentExecutionResult<T = any> {
  agentRole: AgentRole;
  status: 'scaffold_ready' | 'pending_live_sprint' | 'completed' | 'failed';
  data?: T;
  handoffTo?: AgentRole[];
  executionTimeMs?: number;
  message: string;
}

/**
 * Standard contract for each specialised agent service to implement during live sprint.
 */
export interface ISpecialisedAgentContract {
  readonly role: AgentRole;
  readonly cinematicTitle: string;
  readonly technicalIdentity: string;

  /**
   * Reserved for live 6-hour sprint: autonomous agent execution with LLM inference.
   */
  executeAgentTask(context: AgentContext): Promise<AgentExecutionResult>;

  /**
   * Validates if input parameters conform to the agent's input contract.
   */
  validateInputContract(input: Record<string, any>): boolean;
}

