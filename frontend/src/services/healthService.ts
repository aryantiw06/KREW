import { api } from './api';

export interface HealthStatus { service: string; status: string; uptimeSeconds: number; environment: string; database: { connected: boolean; mode: 'mongodb' | 'in-memory'; persistenceAcrossRestarts: boolean } }
export const healthService = { get: (signal?: AbortSignal) => api.get<HealthStatus>('/health', { signal }) };
