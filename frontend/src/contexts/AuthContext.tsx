import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, AuthUser } from '../services/authService';

export interface UserSession extends AuthUser { token: string; demoMode?: boolean }
interface AuthContextValue { user: UserSession | null; isAuthenticated: boolean; isLoading: boolean; demoMode: boolean; error: string | null; login: (email: string, pass: string) => Promise<boolean>; signup: (name: string, email: string, pass: string) => Promise<boolean>; logout: () => Promise<void> }
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const SESSION_KEY = 'krew_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null); const [isLoading, setIsLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const saveSession = (session: UserSession | null) => { setUser(session); if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session)); else localStorage.removeItem(SESSION_KEY); };
  useEffect(() => {
    let active = true;
    const restore = async () => {
      try {
        const raw = localStorage.getItem(SESSION_KEY); if (!raw) return;
        const saved = JSON.parse(raw) as UserSession;
        if (!saved.token) { localStorage.removeItem(SESSION_KEY); return; }
        const response = await authService.me(saved.token);
        if (!response.success || !response.data?.user) throw new Error('Session expired');
        if (active) saveSession({ ...response.data.user, token: saved.token, demoMode: response.data.demoMode });
      } catch { localStorage.removeItem(SESSION_KEY); if (active) setUser(null); }
      finally { if (active) setIsLoading(false); }
    };
    void restore(); return () => { active = false; };
  }, []);
  const authenticate = async (operation: () => ReturnType<typeof authService.login>) => {
    setIsLoading(true); setError(null);
    try { const result = await operation(); if (!result.success || !result.data) throw new Error(result.message || 'Authentication failed'); saveSession({ ...result.data.user, token: result.data.token, demoMode: result.data.demoMode }); return true; }
    catch (e) { setError(e instanceof Error ? e.message : 'Authentication request failed'); return false; }
    finally { setIsLoading(false); }
  };
  const login = (email: string, pass: string) => authenticate(() => authService.login(email, pass));
  const signup = (name: string, email: string, pass: string) => authenticate(() => authService.register(name, email, pass));
  const logout = async () => { const token = user?.token; try { if (token) await authService.logout(token); } finally { saveSession(null); } };
  return <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, demoMode: !!user?.demoMode, error, login, signup, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used within an AuthProvider'); return value; };
