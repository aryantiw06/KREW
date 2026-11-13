import React, { useState } from 'react';
import { SAMPLE_THUMBNAILS } from '../../data/sampleThumbnails';
import { ThumbnailConcept } from '../../types/thumbnail.types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatusPill } from '../../components/common/StatusPill';
import { useToast } from '../../hooks/useToast';
import {
  Image as ImageIcon,
  Palette,
  Eye,
  CheckCircle2,
  UploadCloud,
  Sliders,
  Sparkles,
  LayoutGrid,
  ShieldCheck,
  Type
} from 'lucide-react';

export const ThumbnailStudioPage: React.FC = () => {
  const { showToast } = useToast();
  const [thumbnails, setThumbnails] = useState<ThumbnailConcept[]>(SAMPLE_THUMBNAILS);
  const [selectedThumb, setSelectedThumb] = useState<ThumbnailConcept>(thumbnails[0]);
  const [activeAspect, setActiveAspect] = useState<'16:9' | '9:16' | '1:1'>('16:9');

  const handleSelectVariation = (thumb: ThumbnailConcept) => {
    setSelectedThumb(thumb);
    setThumbnails((prev) =>
      prev.map((t) => ({ ...t, isSelected: t.id === thumb.id }))
    );
    localStorage.setItem('krew_thumbnail_concept_preference', thumb.id);
    showToast({
      title: 'Concept Preference Saved Locally',
      message: `${thumb.variationName} saved in this browser as an illustrative preference.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-krew-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>THE CINEMATOGRAPHER • VISUAL INTELLIGENCE LAB</span>
            </span>
            <StatusPill type="sample" label="Illustrative Art Variations" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white tracking-tight">
            Thumbnail Studio
          </h1>
          <p className="text-xs sm:text-sm text-krew-text-secondary mt-1 max-w-2xl">
            The Cinematographer designs, audits, and simulates click-through readability across contrasting visual compositions while enforcing Creator DNA chromatic rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="amber" size="sm">
            3 High-CTR Variations
          </Badge>
          <StatusPill type="live_reserved" label="Live Sprint AI Generation" />
        </div>
      </div>

      {/* Brand Alignment & Readability Audit Header */}
      <Card padding="md" className="border-amber-500/30 bg-gradient-to-r from-krew-card via-krew-surface to-krew-card">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
              Chromatic Compliance
            </span>
            <p className="text-xl font-bold font-display text-white mt-1">Illustrative concept</p>
            <p className="text-[11px] text-emerald-400 mt-0.5">Enforcing #A855F7 & Charcoal</p>
          </div>
          <div className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
              Mobile OLED Readability
            </span>
            <p className="text-xl font-bold font-display text-white mt-1">Not measured</p>
            <p className="text-[11px] text-krew-cyan mt-0.5">High Contrast Headline</p>
          </div>
          <div className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
              Active Aspect Ratio
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              {(['16:9', '9:16', '1:1'] as const).map((asp) => (
                <button
                  key={asp}
                  onClick={() => setActiveAspect(asp)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                    activeAspect === asp
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-krew-card text-krew-text-muted hover:text-white border border-krew-border'
                  }`}
                >
                  {asp}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
              Visual Narrative Style
            </span>
            <p className="text-sm font-semibold text-white mt-1">Bold Anamorphic Contrast</p>
            <p className="text-[11px] text-krew-lavender mt-0.5">Dual-Tone Rim Lighting</p>
          </div>
        </div>
      </Card>

      {/* Main Showcase & Comparison Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-white">
            Cinematographic Concept Suite
          </h3>
          <span className="text-xs font-mono text-krew-text-muted">
            Click any concept to select for final production release
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {thumbnails.map((thumb) => {
            const isSelected = thumb.id === selectedThumb.id;
            return (
              <Card
                key={thumb.id}
                padding="none"
                onClick={() => handleSelectVariation(thumb)}
                className={`overflow-hidden cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-400 shadow-2xl shadow-amber-500/20 ring-1 ring-amber-400'
                    : 'border-krew-border hover:border-krew-borderLight'
                }`}
              >
                {/* Artwork Preview Frame */}
                <div className="relative aspect-video bg-black overflow-hidden group">
                  <img
                    src={thumb.previewImageUrl}
                    alt={thumb.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Headline Overlay Mock */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-amber-300 border border-amber-400/30 uppercase tracking-wider block mb-1 w-max">
                      {thumb.variationName}
                    </span>
                    <p className="font-display font-bold text-white text-base tracking-tight drop-shadow-md">
                      {thumb.headlineText}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-black px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>SELECTED</span>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-4 space-y-3 bg-krew-card">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-krew-text-muted">Readability:</span>
                    <span className="text-amber-400 font-bold">{thumb.estimatedClickReadability}/100</span>
                  </div>

                  <p className="text-xs text-krew-text-secondary leading-relaxed">
                    {thumb.conceptDescription}
                  </p>

                  <div className="pt-2 border-t border-krew-border/60 text-[11px] font-mono text-krew-text-muted space-y-1">
                    <p>Grading: <span className="text-white">{thumb.colorGrading}</span></p>
                    <p>Expression: <span className="text-krew-lavender">{thumb.expressionStyle}</span></p>
                  </div>

                  <Button
                    variant={isSelected ? 'primary' : 'outline'}
                    size="sm"
                    className="w-full mt-2"
                  >
                    {isSelected ? 'Active Concept' : 'Select Variant'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

