import { api } from './api';
import { CreatorDnaProfile } from '../types/creatorDna.types';

export interface CreatorDnaSyncResult { profileVersion: number; lastSyncRequestedAt: string; syncStatus: 'saved' | 'sync-requested'; persistenceMode: 'mongodb' | 'in-memory'; persistenceAcrossRestarts: boolean }
const auth = (token: string) => ({ Authorization: `Bearer ${token}` });
export const creatorDnaService = {
  get: (token: string, signal?: AbortSignal) => api.get<CreatorDnaProfile>('/creator-dna', { signal, headers: auth(token) }),
  update: (token: string, profile: Partial<CreatorDnaProfile>, signal?: AbortSignal) => api.put<CreatorDnaProfile>('/creator-dna', profile, { signal, headers: auth(token) }),
  sync: (token: string, signal?: AbortSignal) => api.post<CreatorDnaSyncResult>('/creator-dna/sync', {}, { signal, headers: auth(token) }),
  metadata: (token: string, signal?: AbortSignal) => api.get<CreatorDnaSyncResult>('/creator-dna/metadata', { signal, headers: auth(token) })
};
