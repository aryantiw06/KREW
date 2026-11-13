import { randomBytes } from 'crypto';

export interface DemoUser { id: string; name: string; email: string; handle: string; role: 'creator_star'; demoMode: true }
const sessions = new Map<string, { user: DemoUser; expiresAt: number }>();
export function createDemoSession(user: Omit<DemoUser, 'demoMode'>): string { const token = randomBytes(32).toString('hex'); sessions.set(token, { user: { ...user, demoMode: true }, expiresAt: Date.now() + 8 * 60 * 60 * 1000 }); return token; }
export function getDemoSession(token: string): DemoUser | null { const session = sessions.get(token); if (!session) return null; if (session.expiresAt <= Date.now()) { sessions.delete(token); return null; } return session.user; }
export function revokeDemoSession(token: string): void { sessions.delete(token); }
