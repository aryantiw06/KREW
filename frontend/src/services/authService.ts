import { api, ApiResponse } from './api';

export interface AuthUser { id: string; name: string; email: string; handle: string; role: 'creator_star' | 'collaborator' | 'admin'; avatarUrl?: string }
export interface AuthPayload { user: AuthUser & { demoMode?: boolean }; token: string; demoMode: boolean; persistence: { mode: string; persistenceAcrossRestarts: boolean } }

export const authService = {
  login: (email: string, password: string, signal?: AbortSignal) => api.post<AuthPayload>('/auth/login', { email, password }, { signal }),
  register: (name: string, email: string, password: string, signal?: AbortSignal) => api.post<AuthPayload>('/auth/register', { name, email, password }, { signal }),
  me: (token: string, signal?: AbortSignal) => api.get<{ user: AuthUser; demoMode: boolean }>('/auth/me', { signal, headers: { Authorization: `Bearer ${token}` } }),
  logout: (token: string) => api.post<{ loggedOut: boolean }>('/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } })
};
