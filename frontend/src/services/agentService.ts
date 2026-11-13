import { api } from './api';

export interface AgentSummary { role: string; [key: string]: unknown }
export interface AgentContract { role: string; [key: string]: unknown }
export const agentService = {
  list: (signal?: AbortSignal) => api.get<AgentSummary[]>('/agents', { signal }),
  contract: (role: string, signal?: AbortSignal) => api.get<AgentContract>(`/agents/${encodeURIComponent(role)}/contract`, { signal })
};
