import React, { useState } from 'react';
import { useCreatorDna } from '../../contexts/CreatorDnaContext';
import { Card } from '../../components/common/Card';
import { Input, Textarea } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatusPill } from '../../components/common/StatusPill';
import {
  Dna,
  Save,
  RotateCcw,
  RefreshCw,
  Sparkles,
  Layers,
  Palette,
  Mic2,
  BookOpen,
  Eye,
  CheckCircle2,
  Plus,
  Trash2
} from 'lucide-react';

export const CreatorDnaPage: React.FC = () => {
  const { profile, updateProfile, resetProfile, syncWithEngine, isSyncing } = useCreatorDna();

  // Local editable form state
  const [formData, setFormData] = useState(profile);
  const [newPhrase, setNewPhrase] = useState('');
  const [newBannedWord, setNewBannedWord] = useState('');

  const handleSave = () => {
    updateProfile(formData);
  };

  const addPhrase = () => {
    if (!newPhrase.trim()) return;
    setFormData((prev) => ({
      ...prev,
      vocabularyPreferences: {
        ...prev.vocabularyPreferences,
        signaturePhrases: [...prev.vocabularyPreferences.signaturePhrases, newPhrase.trim()]
      }
    }));
    setNewPhrase('');
  };

  const removePhrase = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      vocabularyPreferences: {
        ...prev.vocabularyPreferences,
        signaturePhrases: prev.vocabularyPreferences.signaturePhrases.filter((_, i) => i !== idx)
      }
    }));
  };

  const addBannedWord = () => {
    if (!newBannedWord.trim()) return;
    setFormData((prev) => ({
      ...prev,
      vocabularyPreferences: {
        ...prev.vocabularyPreferences,
        bannedWords: [...prev.vocabularyPreferences.bannedWords, newBannedWord.trim()]
      }
    }));
    setNewBannedWord('');
  };

  const removeBannedWord = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      vocabularyPreferences: {
        ...prev.vocabularyPreferences,
        bannedWords: prev.vocabularyPreferences.bannedWords.filter((_, i) => i !== idx)
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-krew-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-krew-lavender bg-krew-purple/15 px-2.5 py-0.5 rounded-full border border-krew-purple/30 flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5 text-krew-purple" />
              <span>USP 01 • SHARED MEMORY CORE</span>
            </span>
            <StatusPill type="architected" label="Memory Engine Scaffolding" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white tracking-tight">
            Creator DNA Memory Engine
          </h1>
          <p className="text-xs sm:text-sm text-krew-text-secondary mt-1 max-w-2xl">
            A persistent, multi-modal representation of your authentic identity. All 6 specialised agents tap into this engine to guarantee tonal consistency and brand fidelity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={resetProfile}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Reset Blueprint
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={syncWithEngine}
            isLoading={isSyncing}
            leftIcon={<RefreshCw className="w-4 h-4 text-krew-cyan" />}
          >
            Sync Memory
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save DNA
          </Button>
        </div>
      </div>

      {/* DNA Health / Visualizer Banner */}
      <Card padding="md" className="border-krew-purple/40 bg-gradient-to-r from-krew-card via-krew-charcoal to-krew-surface">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
              Memory Fidelity
            </span>
            <p className="text-xl font-bold font-display text-white mt-1">98.4% Profile Depth</p>
            <p className="text-[11px] text-emerald-400 mt-0.5">High Context Completeness</p>
          </div>
          <div className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
              Agent Synchronization
            </span>
            <p className="text-xl font-bold font-display text-white mt-1">6/6 Agents Synced</p>
            <p className="text-[11px] text-krew-lavender mt-0.5">Live Backbone Active</p>
          </div>
          <div className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
              Vocabulary Rules
            </span>
            <p className="text-xl font-bold font-display text-white mt-1">
              {formData.vocabularyPreferences.signaturePhrases.length} Phrases / {formData.vocabularyPreferences.bannedWords.length} Banned
            </p>
            <p className="text-[11px] text-krew-cyan mt-0.5">Active Guardrails</p>
          </div>
          <div className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
              Visual Palette
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-6 h-6 rounded-lg border border-krew-border" style={{ backgroundColor: formData.visualIdentity.brandColors.primary }} title="Primary" />
              <span className="w-6 h-6 rounded-lg border border-krew-border" style={{ backgroundColor: formData.visualIdentity.brandColors.secondary }} title="Secondary" />
              <span className="w-6 h-6 rounded-lg border border-krew-border" style={{ backgroundColor: formData.visualIdentity.brandColors.accent }} title="Accent" />
              <span className="text-xs text-white font-mono ml-1">{formData.visualIdentity.brandColors.accent}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Creator Star Core */}
        <Card padding="lg" className="space-y-5">
          <div className="flex items-center gap-2 border-b border-krew-border/60 pb-3">
            <BookOpen className="w-5 h-5 text-krew-purple" />
            <h3 className="font-display text-lg font-bold text-white">
              Core Identity & Positioning
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Creator Name"
              value={formData.creatorName}
              onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
            />
            <Input
              label="Handle / Brand ID"
              value={formData.handle}
              onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
            />
          </div>

          <Textarea
            label="Creator Bio / Manifesto"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
          />

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-krew-text-secondary mb-2">
              Content Niches
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.contentNiche.map((niche, i) => (
                <Badge key={i} variant="purple" size="sm">
                  {niche}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Section 2: Communication Tone & Pacing */}
        <Card padding="lg" className="space-y-5">
          <div className="flex items-center gap-2 border-b border-krew-border/60 pb-3">
            <Mic2 className="w-5 h-5 text-krew-cyan" />
            <h3 className="font-display text-lg font-bold text-white">
              Communication Tone & Persona
            </h3>
          </div>

          <Input
            label="Primary Tone Descriptor"
            value={formData.communicationTone.primary}
            onChange={(e) =>
              setFormData({
                ...formData,
                communicationTone: { ...formData.communicationTone, primary: e.target.value }
              })
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-krew-text-secondary mb-1.5">
                Energy Level
              </label>
              <select
                value={formData.communicationTone.energyLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    communicationTone: {
                      ...formData.communicationTone,
                      energyLevel: e.target.value as any
                    }
                  })
                }
                className="w-full rounded-xl bg-krew-surface border border-krew-border px-3 py-2.5 text-xs text-white focus:outline-none focus:border-krew-purple"
              >
                <option value="High Energy & Cinematic">High Energy & Cinematic</option>
                <option value="Conversational & Witty">Conversational & Witty</option>
                <option value="Calm & Reflective">Calm & Reflective</option>
                <option value="Technical & Deep">Technical & Deep</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-krew-text-secondary mb-1.5">
                Storytelling Pacing
              </label>
              <select
                value={formData.storytellingStyle.pacing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    storytellingStyle: {
                      ...formData.storytellingStyle,
                      pacing: e.target.value as any
                    }
                  })
                }
                className="w-full rounded-xl bg-krew-surface border border-krew-border px-3 py-2.5 text-xs text-white focus:outline-none focus:border-krew-purple"
              >
                <option value="Fast-paced punchy">Fast-paced punchy</option>
                <option value="Cinematic documentary">Cinematic documentary</option>
                <option value="Step-by-step masterclass">Step-by-step masterclass</option>
              </select>
            </div>
          </div>

          <Textarea
            label="Cold Hook Style Directive"
            value={formData.storytellingStyle.hookStyle}
            onChange={(e) =>
              setFormData({
                ...formData,
                storytellingStyle: { ...formData.storytellingStyle, hookStyle: e.target.value }
              })
            }
            rows={2}
          />
        </Card>

        {/* Section 3: Vocabulary Preferences & Guardrails */}
        <Card padding="lg" className="space-y-5">
          <div className="flex items-center gap-2 border-b border-krew-border/60 pb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-lg font-bold text-white">
              Signature Vocabulary & Guardrails
            </h3>
          </div>

          {/* Signature Phrases */}
          <div className="space-y-2">
            <label className="block text-xs font-medium uppercase tracking-wider text-krew-text-secondary">
              Signature Phrases (Used by The Writer)
            </label>
            <div className="space-y-2">
              {formData.vocabularyPreferences.signaturePhrases.map((phrase, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-krew-surface border border-krew-border text-xs"
                >
                  <span className="text-white">"{phrase}"</span>
                  <button
                    onClick={() => removePhrase(i)}
                    className="text-krew-text-muted hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newPhrase}
                onChange={(e) => setNewPhrase(e.target.value)}
                placeholder="Add signature phrase..."
                className="flex-1 rounded-xl bg-krew-surface border border-krew-border px-3 py-2 text-xs text-white placeholder:text-krew-text-muted focus:outline-none focus:border-krew-purple"
              />
              <Button variant="outline" size="sm" onClick={addPhrase} leftIcon={<Plus className="w-3 h-3" />}>
                Add
              </Button>
            </div>
          </div>

          {/* Banned Words */}
          <div className="space-y-2 pt-2 border-t border-krew-border/60">
            <label className="block text-xs font-medium uppercase tracking-wider text-rose-400">
              Banned Words & Clichés (Strict Guardrails)
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.vocabularyPreferences.bannedWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono"
                >
                  <span>{word}</span>
                  <button onClick={() => removeBannedWord(i)} className="hover:text-white">
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newBannedWord}
                onChange={(e) => setNewBannedWord(e.target.value)}
                placeholder="Add banned word / cliché..."
                className="flex-1 rounded-xl bg-krew-surface border border-krew-border px-3 py-2 text-xs text-white placeholder:text-krew-text-muted focus:outline-none focus:border-rose-500"
              />
              <Button variant="danger" size="sm" onClick={addBannedWord} leftIcon={<Plus className="w-3 h-3" />}>
                Ban
              </Button>
            </div>
          </div>
        </Card>

        {/* Section 4: Visual Identity & Brand Directives */}
        <Card padding="lg" className="space-y-5">
          <div className="flex items-center gap-2 border-b border-krew-border/60 pb-3">
            <Palette className="w-5 h-5 text-krew-lavender" />
            <h3 className="font-display text-lg font-bold text-white">
              Visual Identity & Thumbnail Directives
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Primary Background"
              value={formData.visualIdentity.brandColors.primary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visualIdentity: {
                    ...formData.visualIdentity,
                    brandColors: { ...formData.visualIdentity.brandColors, primary: e.target.value }
                  }
                })
              }
            />
            <Input
              label="Secondary Charcoal"
              value={formData.visualIdentity.brandColors.secondary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visualIdentity: {
                    ...formData.visualIdentity,
                    brandColors: { ...formData.visualIdentity.brandColors, secondary: e.target.value }
                  }
                })
              }
            />
            <Input
              label="Accent Glow"
              value={formData.visualIdentity.brandColors.accent}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visualIdentity: {
                    ...formData.visualIdentity,
                    brandColors: { ...formData.visualIdentity.brandColors, accent: e.target.value }
                  }
                })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-krew-text-secondary mb-1.5">
              Default Thumbnail Direction (Cinematographer)
            </label>
            <select
              value={formData.visualIdentity.thumbnailStyle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visualIdentity: {
                    ...formData.visualIdentity,
                    thumbnailStyle: e.target.value as any
                  }
                })
              }
              className="w-full rounded-xl bg-krew-surface border border-krew-border px-3 py-2.5 text-xs text-white focus:outline-none focus:border-krew-purple"
            >
              <option value="Bold Expressive Face + High Contrast">
                Bold Expressive Face + High Contrast (Recommended)
              </option>
              <option value="Minimalist Aesthetic">Minimalist Aesthetic</option>
              <option value="Documentary Film Still">Documentary Film Still</option>
              <option value="Infographic Overlay">Infographic Overlay</option>
            </select>
          </div>

          <Input
            label="Typography Spec"
            value={formData.visualIdentity.fontPreference}
            onChange={(e) =>
              setFormData({
                ...formData,
                visualIdentity: { ...formData.visualIdentity, fontPreference: e.target.value }
              })
            }
          />
        </Card>
      </div>
    </div>
  );
};
