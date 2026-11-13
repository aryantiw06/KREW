import React, { createContext, useContext, useEffect, useState } from 'react';
import { CreatorDnaProfile } from '../types/creatorDna.types';
import { INITIAL_CREATOR_DNA } from '../data/sampleCreatorDna';
import { creatorDnaService, CreatorDnaSyncResult } from '../services/creatorDnaService';
import { useAuth } from './AuthContext';
import { useToast } from '../hooks/useToast';

interface CreatorDnaContextValue {
  profile: CreatorDnaProfile; updateProfile: (updated: Partial<CreatorDnaProfile>) => Promise<boolean>; resetProfile: () => Promise<boolean>;
  syncWithEngine: () => Promise<void>; isSyncing: boolean; isLoading: boolean; isSaving: boolean; error: string | null;
  isBackendSaved: boolean; metadata: CreatorDnaSyncResult | null; refresh: () => Promise<void>;
}
const CreatorDnaContext = createContext<CreatorDnaContextValue | undefined>(undefined);
const CACHE_KEY = 'krew_creator_dna_profile';

export const CreatorDnaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); const { showToast } = useToast();
  const [profile, setProfile] = useState<CreatorDnaProfile>(() => { try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null') || INITIAL_CREATOR_DNA; } catch { return INITIAL_CREATOR_DNA; } });
  const [isLoading, setIsLoading] = useState(true); const [isSaving, setIsSaving] = useState(false); const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null); const [isBackendSaved, setIsBackendSaved] = useState(false); const [metadata, setMetadata] = useState<CreatorDnaSyncResult | null>(null);
  const token = user?.token;
  const cache = (next: CreatorDnaProfile) => { localStorage.setItem(CACHE_KEY, JSON.stringify(next)); setProfile(next); };
  const refresh = async () => {
    if (!token) { setError('Demo session token is unavailable. Changes will remain cached locally.'); setIsLoading(false); return; }
    setIsLoading(true); setError(null);
    try { const response = await creatorDnaService.get(token); if (!response.success || !response.data) throw new Error(response.message || 'Profile response was empty'); cache(response.data); setIsBackendSaved(true); }
    catch (e) { setError(e instanceof Error ? e.message : 'Unable to load Creator DNA.'); setIsBackendSaved(false); }
    finally { setIsLoading(false); }
  };
  useEffect(() => { void refresh(); }, [token]);
  const updateProfile = async (updated: Partial<CreatorDnaProfile>) => {
    const next = { ...profile, ...updated, updatedAt: new Date().toISOString() }; cache(next); setIsSaving(true); setError(null);
    try {
      if (!token) throw new Error('Demo session token is unavailable.');
      const response = await creatorDnaService.update(token, next);
      if (!response.success || !response.data) throw new Error(response.message || 'Profile save failed');
      cache(response.data); setIsBackendSaved(true); showToast({ title: 'Creator DNA Saved', message: 'Backend confirmed the profile update.', type: 'success' }); return true;
    } catch (e) { setIsBackendSaved(false); setError(e instanceof Error ? e.message : 'Unable to save Creator DNA. Your edits are cached locally.'); return false; }
    finally { setIsSaving(false); }
  };
  const resetProfile = async () => updateProfile({ ...INITIAL_CREATOR_DNA, id: profile.id });
  const syncWithEngine = async () => {
    setIsSyncing(true); setError(null);
    try { if (!token) throw new Error('Demo session token is unavailable.'); const response = await creatorDnaService.sync(token); if (!response.success || !response.data) throw new Error(response.message || 'Unable to record sync request'); setMetadata(response.data); showToast({ title: 'Configuration Saved', message: 'Creator DNA configuration saved — live 6-agent synchronization is RESERVED FOR LIVE HACKATHON SPRINT.', type: 'info' }); }
    catch (e) { setError(e instanceof Error ? e.message : 'Unable to record synchronization metadata.'); }
    finally { setIsSyncing(false); }
  };
  return <CreatorDnaContext.Provider value={{ profile, updateProfile, resetProfile, syncWithEngine, isSyncing, isLoading, isSaving, error, isBackendSaved, metadata, refresh }}>{children}</CreatorDnaContext.Provider>;
};

export const useCreatorDna = () => { const context = useContext(CreatorDnaContext); if (!context) throw new Error('useCreatorDna must be used within a CreatorDnaProvider'); return context; };
