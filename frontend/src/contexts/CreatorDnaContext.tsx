import React, { createContext, useContext, useState, useEffect } from 'react';
import { CreatorDnaProfile } from '../types/creatorDna.types';
import { INITIAL_CREATOR_DNA } from '../data/sampleCreatorDna';
import { useToast } from '../hooks/useToast';

interface CreatorDnaContextValue {
  profile: CreatorDnaProfile;
  updateProfile: (updated: Partial<CreatorDnaProfile>) => void;
  resetProfile: () => void;
  syncWithEngine: () => Promise<void>;
  isSyncing: boolean;
}

const CreatorDnaContext = createContext<CreatorDnaContextValue | undefined>(undefined);

export const CreatorDnaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<CreatorDnaProfile>(() => {
    const saved = localStorage.getItem('krew_creator_dna_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CREATOR_DNA;
      }
    }
    return INITIAL_CREATOR_DNA;
  });

  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    localStorage.setItem('krew_creator_dna_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updated: Partial<CreatorDnaProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated,
      updatedAt: new Date().toISOString()
    }));
    showToast({
      title: 'Creator DNA Updated',
      message: 'Changes saved locally to shared agent memory scaffold.',
      type: 'success'
    });
  };

  const resetProfile = () => {
    setProfile(INITIAL_CREATOR_DNA);
    showToast({
      title: 'Creator DNA Reset',
      message: 'Profile reverted to default Bollywood tech creator blueprint.',
      type: 'info'
    });
  };

  const syncWithEngine = async () => {
    setIsSyncing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSyncing(false);
    showToast({
      title: 'Memory Synchronization Complete',
      message: 'All 6 specialised agents have synchronized with latest Creator DNA schema.',
      type: 'success'
    });
  };

  return (
    <CreatorDnaContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
        syncWithEngine,
        isSyncing
      }}
    >
      {children}
    </CreatorDnaContext.Provider>
  );
};

export const useCreatorDna = () => {
  const context = useContext(CreatorDnaContext);
  if (!context) {
    throw new Error('useCreatorDna must be used within a CreatorDnaProvider');
  }
  return context;
};
