import { api } from './api';
import { ContentProject } from '../types/project.types';

export const projectService = {
  list: (token: string, params: { status?: string; search?: string; sort?: 'asc' | 'desc' } = {}, signal?: AbortSignal) => { const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value) as [string, string][]).toString(); return api.get<{ items: ContentProject[]; persistence: { mode: string; persistenceAcrossRestarts: boolean } }>(`/projects${query ? `?${query}` : ''}`, { signal, headers: { Authorization: `Bearer ${token}` } }); },
  get: (token: string, id: string, signal?: AbortSignal) => api.get<{ project: ContentProject }>(`/projects/${encodeURIComponent(id)}`, { signal, headers: { Authorization: `Bearer ${token}` } }),
  create: (token: string, input: Partial<ContentProject> & { fileMetadata?: Record<string, unknown> }, signal?: AbortSignal) => api.post<{ project: ContentProject; persistence: { mode: string; persistenceAcrossRestarts: boolean } }>('/projects', input, { signal, headers: { Authorization: `Bearer ${token}` } }),
  update: (token: string, id: string, input: Partial<ContentProject>, signal?: AbortSignal) => api.put<{ project: ContentProject }>(`/projects/${encodeURIComponent(id)}`, input, { signal, headers: { Authorization: `Bearer ${token}` } }),
  updateStatus: (token: string, id: string, status: string, signal?: AbortSignal) => api.patch<{ project: ContentProject }>(`/projects/${encodeURIComponent(id)}/status`, { status }, { signal, headers: { Authorization: `Bearer ${token}` } }),
  archive: (token: string, id: string, signal?: AbortSignal) => api.delete<{ id: string; status: 'archived' }>(`/projects/${encodeURIComponent(id)}`, { signal, headers: { Authorization: `Bearer ${token}` } })
};
