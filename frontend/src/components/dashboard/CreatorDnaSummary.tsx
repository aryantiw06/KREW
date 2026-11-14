import React from 'react';
import { ArrowRight, Dna } from 'lucide-react';
import { useCreatorDna } from '../../contexts/CreatorDnaContext';
import { INITIAL_CREATOR_DNA } from '../../data/sampleCreatorDna';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

const profileFieldValues = (profile: ReturnType<typeof useCreatorDna>['profile']) => [
  profile.creatorName, profile.handle, profile.bio, profile.contentNiche.length, profile.primaryPlatforms.length,
  profile.targetAudience.demographics, profile.targetAudience.interests.length, profile.targetAudience.painPoints.length,
  profile.communicationTone.primary, profile.communicationTone.energyLevel, profile.communicationTone.formality,
  profile.storytellingStyle.hookStyle, profile.storytellingStyle.pacing, profile.storytellingStyle.callToActionPreference,
  profile.vocabularyPreferences.signaturePhrases.length, profile.vocabularyPreferences.bannedWords.length,
  profile.vocabularyPreferences.jargonLevel, profile.visualIdentity.brandColors.primary,
  profile.visualIdentity.brandColors.secondary, profile.visualIdentity.brandColors.accent,
  profile.visualIdentity.thumbnailStyle, profile.visualIdentity.fontPreference,
  profile.contentGuidelines.length, profile.preferredVideoFormats.length
];

export const CreatorDnaSummary: React.FC = () => {
  const { profile, isLoading, isBackendSaved, error } = useCreatorDna();
  const navigate = useNavigate();
  const fields = profileFieldValues(profile);
  const populated = fields.filter(value => typeof value === 'number' ? value > 0 : String(value || '').trim().length > 0).length;
  const completion = Math.round(populated / fields.length * 100);
  const hasLocalProfile = typeof window !== 'undefined' && Boolean(window.localStorage.getItem('krew_creator_dna_profile'));
  const isExample = !isBackendSaved && !hasLocalProfile && profile.id === INITIAL_CREATOR_DNA.id;
  const dataLabel = isBackendSaved ? 'Backend saved' : isExample ? 'Example profile' : 'Local profile · sync unconfirmed';

  return <section className="rounded-2xl bg-krew-surface p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-krew-purple/15 text-krew-lavender"><Dna className="h-5 w-5"/></span><div><p className="krew-meta">CREATOR PROFILE</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">Creator DNA</h2></div></div><span className={`rounded-full px-2.5 py-1 text-[10px] ${isBackendSaved ? 'bg-krew-status-success/10 text-krew-status-success' : 'bg-krew-status-warning/10 text-krew-status-warning'}`}>{isLoading ? 'Loading…' : dataLabel}</span></div>
    {error && <p role="status" className="mt-3 text-xs text-krew-status-warning">{error}</p>}
    <div className="mt-5"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-medium text-krew-text-primary">{profile.creatorName || 'Your creator profile'}</p><p className="mt-1 truncate text-xs text-krew-text-muted">{profile.contentNiche.filter(Boolean).join(' · ') || 'Add a content niche'}{profile.communicationTone.primary ? ` · ${profile.communicationTone.primary}` : ''}</p></div><span className="font-mono text-sm text-krew-lavender">{completion}%</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-krew-bg-secondary"><div className="h-full rounded-full bg-krew-purple transition-[width]" style={{ width: `${completion}%` }}/></div></div>
    <div className="mt-4 flex items-center justify-between gap-3"><p className="text-[10px] text-krew-text-muted">Completeness reflects populated profile fields.</p><Button size="sm" variant="ghost" onClick={() => navigate('/creator-dna')} rightIcon={<ArrowRight className="h-4 w-4"/>}>Edit DNA</Button></div>
  </section>;
};
