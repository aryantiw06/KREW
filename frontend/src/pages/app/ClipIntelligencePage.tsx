import React, { useState } from 'react';
import { SAMPLE_CLIPS } from '../../data/sampleClips';
import { ClipSegment } from '../../types/clip.types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { StatusPill } from '../../components/common/StatusPill';
import { useToast } from '../../hooks/useToast';
import { formatDuration } from '../../utils/formatters';
import {
  Scissors,
  Play,
  Pause,
  CheckCircle2,
  XCircle,
  Sparkles,
  Smartphone,
  Sliders,
  Clock,
  Film,
  Zap,
  Volume2
} from 'lucide-react';

export const ClipIntelligencePage: React.FC = () => {
  const { showToast } = useToast();
  const [clips, setClips] = useState<ClipSegment[]>(SAMPLE_CLIPS);
  const [selectedClip, setSelectedClip] = useState<ClipSegment>(clips[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(142); // current timeline position

  const handleApprove = (id: string) => {
    setClips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isApproved: true, status: 'approved' } : c))
    );
    showToast({
      title: 'Clip Approved',
      message: 'Handoff initiated to The Cinematographer for 9:16 thumbnail framing.',
      type: 'success'
    });
  };

  const handleReject = (id: string) => {
    setClips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isApproved: false, status: 'rejected' } : c))
    );
    showToast({
      title: 'Clip Rejected',
      message: 'Feedback logged to Creator DNA Memory Engine.',
      type: 'info'
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-krew-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-500/30 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-rose-400" />
              <span>THE EDITOR'S WORKSPACE • VIDEO INTELLIGENCE</span>
            </span>
            <StatusPill type="sample" label="Illustrative Moment Detection" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white tracking-tight">
            Clip Intelligence Desk
          </h1>
          <p className="text-xs sm:text-sm text-krew-text-secondary mt-1 max-w-2xl">
            The Editor agent analyzes narrative momentum, speech cadence, and semantic punchlines within your master footage to excavate standalone viral moments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="rose" size="sm">
            4 Contextual Clips Identified
          </Badge>
          <StatusPill type="live_reserved" label="Live Sprint AI Detection" />
        </div>
      </div>

      {/* Main Studio Video & Timeline Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Master Player & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Simulated Cinematic Video Monitor */}
          <div className="relative rounded-2xl bg-black border border-krew-border overflow-hidden aspect-video flex flex-col justify-between p-4 shadow-2xl">
            {/* Top Bar inside monitor */}
            <div className="flex items-center justify-between text-xs font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>REC • MASTER FOOTAGE (4K PRORES)</span>
              </div>
              <span className="text-krew-lavender">
                TIMECODE: {formatDuration(currentTime)} / 14:45
              </span>
            </div>

            {/* Central Video Frame Simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3 p-6 max-w-md">
                <div className="w-16 h-16 rounded-full bg-krew-purple/20 border border-krew-purple/50 flex items-center justify-center mx-auto text-white shadow-purple-glow cursor-pointer hover:scale-105 transition-transform"
                     onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                </div>
                <h4 className="font-display text-lg font-bold text-white">
                  "{selectedClip.title}"
                </h4>
                <p className="text-xs text-krew-text-secondary line-clamp-2">
                  Hook: "{selectedClip.suggestedHook}"
                </p>
              </div>
            </div>

            {/* Bottom Safe Title Guides / 9:16 Vertical Crop Overlay */}
            <div className="flex items-center justify-between text-[11px] font-mono text-krew-text-muted z-10">
              <span className="bg-black/60 px-2.5 py-1 rounded border border-white/10">
                Aspect Guide: {selectedClip.platformFormat}
              </span>
              <span className="bg-black/60 px-2.5 py-1 rounded border border-white/10 text-emerald-400">
                Emotion: {selectedClip.speakerEmotion}
              </span>
            </div>
          </div>

          {/* Interactive Multi-Track Timeline */}
          <Card padding="md" className="space-y-4 bg-krew-surface/60 border-krew-border">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-white">
                <Sliders className="w-4 h-4 text-krew-purple" />
                <span>NARRATIVE TIMELINE CONTEXT</span>
              </div>
              <span className="text-krew-text-muted">Master Length: 14m 45s</span>
            </div>

            {/* Timeline Waveform & Clip Markers */}
            <div className="relative h-20 rounded-xl bg-krew-card border border-krew-border p-2 flex items-center overflow-hidden">
              {/* Audio Waveform Bars Simulation */}
              <div className="absolute inset-x-2 inset-y-3 flex items-center justify-between opacity-30 pointer-events-none">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-krew-lavender rounded-full"
                    style={{ height: `${20 + (Math.sin(i * 0.4) * 50 + 20)}%` }}
                  />
                ))}
              </div>

              {/* Clip Highlight Blocks */}
              {clips.map((clip) => {
                const leftPercent = (clip.startTime / 885) * 100;
                const widthPercent = (clip.duration / 885) * 100;
                const isSelected = clip.id === selectedClip.id;

                return (
                  <div
                    key={clip.id}
                    onClick={() => {
                      setSelectedClip(clip);
                      setCurrentTime(clip.startTime);
                    }}
                    style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                    className={`absolute h-12 rounded-lg border cursor-pointer transition-all flex items-center justify-center p-1 text-[10px] font-mono font-bold truncate z-10 ${
                      isSelected
                        ? 'bg-rose-500/40 border-rose-400 text-white shadow-lg shadow-rose-500/30'
                        : 'bg-krew-purple/20 border-krew-purple/40 text-krew-lavender hover:bg-krew-purple/30'
                    }`}
                  >
                    <span>{clip.duration}s</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-krew-text-muted font-mono">
              <span>00:00</span>
              <span>03:40</span>
              <span>07:20</span>
              <span>11:00</span>
              <span>14:45</span>
            </div>
          </Card>
        </div>

        {/* Right Col: Selected Clip Inspector & Actions */}
        <div className="space-y-4">
          <Card padding="md" className="space-y-4 border-krew-border bg-krew-card">
            <div className="flex items-center justify-between border-b border-krew-border/60 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400">
                  Clip Intelligence Card
                </span>
                <h4 className="font-display text-lg font-bold text-white">
                  {selectedClip.title}
                </h4>
              </div>
              <Badge variant={selectedClip.isApproved ? 'emerald' : 'amber'} size="xs">
                {selectedClip.status.toUpperCase()}
              </Badge>
            </div>

            {/* Viral Potential Meter */}
            <div className="p-3 rounded-xl bg-krew-surface border border-krew-border space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-krew-text-secondary flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Viral Potential Score</span>
                </span>
                <span className="font-bold text-amber-400">
                  {selectedClip.viralPotentialScore}/100
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-krew-card overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"
                  style={{ width: `${selectedClip.viralPotentialScore}%` }}
                />
              </div>
              <p className="text-[10px] text-krew-text-muted font-mono">
                Evaluated against Creator DNA audience retention curves.
              </p>
            </div>

            {/* Hook */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-krew-lavender uppercase tracking-wider">
                The Writer Hook Angle:
              </span>
              <p className="text-xs text-white bg-krew-surface p-2.5 rounded-lg border border-krew-border font-medium">
                "{selectedClip.suggestedHook}"
              </p>
            </div>

            {/* Transcript Snippet */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-krew-text-muted uppercase tracking-wider">
                Transcript Excerpt:
              </span>
              <p className="text-xs text-krew-text-secondary bg-krew-surface p-2.5 rounded-lg border border-krew-border leading-relaxed">
                "{selectedClip.transcriptSnippet}"
              </p>
            </div>

            {/* Target Platforms */}
            <div>
              <span className="text-[11px] font-mono text-krew-text-muted uppercase tracking-wider block mb-1.5">
                Target Platform Renders:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedClip.targetPlatforms.map((p, idx) => (
                  <Badge key={idx} variant="outline" size="xs">
                    <Smartphone className="w-3 h-3 text-krew-lavender" />
                    <span>{p}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Decision Buttons */}
            <div className="pt-3 border-t border-krew-border/60 flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
                onClick={() => handleReject(selectedClip.id)}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1 shadow-purple-glow"
                onClick={() => handleApprove(selectedClip.id)}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Approve Clip
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
