import React, { useState } from 'react';
import { SAMPLE_DISTRIBUTION_CAMPAIGN } from '../../data/sampleDistribution';
import { SocialPlatform, PlatformPostDraft } from '../../types/distribution.types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { StatusPill } from '../../components/common/StatusPill';
import { useToast } from '../../hooks/useToast';
import {
  Share2,
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  Calendar,
  CheckSquare,
  Square,
  Clock,
  Sparkles,
  Send,
  Save,
  Tag,
  Hash
} from 'lucide-react';

export const DistributionDeskPage: React.FC = () => {
  const { showToast } = useToast();
  const [campaign, setCampaign] = useState(SAMPLE_DISTRIBUTION_CAMPAIGN);
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>('YouTube');
  const [activeDraft, setActiveDraft] = useState<PlatformPostDraft>(campaign.posts['YouTube']);

  const handlePlatformChange = (platform: SocialPlatform) => {
    setActivePlatform(platform);
    setActiveDraft(campaign.posts[platform]);
  };

  const handleSaveDraft = () => {
    setCampaign((prev) => ({
      ...prev,
      posts: {
        ...prev.posts,
        [activePlatform]: activeDraft
      }
    }));
    showToast({
      title: 'Platform Draft Saved',
      message: `${activePlatform} copy and metadata successfully updated.`,
      type: 'success'
    });
  };

  const toggleChecklist = (id: string) => {
    setCampaign((prev) => ({
      ...prev,
      checklist: prev.checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const platformIcons: Record<SocialPlatform, React.ReactNode> = {
    YouTube: <Youtube className="w-5 h-5 text-red-500" />,
    Instagram: <Instagram className="w-5 h-5 text-pink-500" />,
    LinkedIn: <Linkedin className="w-5 h-5 text-blue-400" />,
    Facebook: <Facebook className="w-5 h-5 text-blue-600" />
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-krew-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>THE PUBLICIST • MULTI-PLATFORM DISTRIBUTION</span>
            </span>
            <StatusPill type="architected" label="Distribution Architecture" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white tracking-tight">
            Distribution Desk
          </h1>
          <p className="text-xs sm:text-sm text-krew-text-secondary mt-1 max-w-2xl">
            The Publicist tailors your master campaign into platform-native copy, algorithmic SEO hashtags, and staggered release cadences for YouTube, Instagram, LinkedIn, and Facebook.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusPill type="live_reserved" label="Live Publishing APIs Reserved" />
          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveDraft}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Draft
          </Button>
        </div>
      </div>

      {/* Platform Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['YouTube', 'Instagram', 'LinkedIn', 'Facebook'] as SocialPlatform[]).map((p) => {
          const isCurrent = activePlatform === p;
          return (
            <button
              key={p}
              onClick={() => handlePlatformChange(p)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isCurrent
                  ? 'bg-krew-card border border-krew-purple text-white shadow-purple-glow'
                  : 'bg-krew-surface border border-krew-border text-krew-text-secondary hover:text-white'
              }`}
            >
              {platformIcons[p]}
              <span>{p}</span>
              <span className="text-[10px] font-mono text-krew-lavender bg-krew-charcoal px-2 py-0.5 rounded border border-krew-border/60">
                {campaign.posts[p].status.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Editor & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Platform Copy Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="lg" className="space-y-5 bg-krew-card">
            <div className="flex items-center justify-between border-b border-krew-border/60 pb-3">
              <div className="flex items-center gap-2">
                {platformIcons[activePlatform]}
                <h3 className="font-display text-lg font-bold text-white">
                  {activePlatform} Distribution Metadata
                </h3>
              </div>
              <span className="text-xs font-mono text-krew-lavender">
                Format: {activeDraft.contentFormat}
              </span>
            </div>

            <Input
              label="Optimized Title / Headline"
              value={activeDraft.title}
              onChange={(e) => setActiveDraft({ ...activeDraft, title: e.target.value })}
            />

            <Textarea
              label="Platform-Native Caption & Description"
              value={activeDraft.caption}
              onChange={(e) => setActiveDraft({ ...activeDraft, caption: e.target.value })}
              rows={8}
            />

            {/* Hashtag Management */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-krew-text-secondary mb-2 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-krew-purple" />
                <span>Strategic Hashtags ({activeDraft.hashtags.length})</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {activeDraft.hashtags.map((tag, idx) => (
                  <Badge key={idx} variant="purple" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* SEO Keyword Cluster */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-krew-text-secondary mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-krew-cyan" />
                <span>Search Intent Keywords (Publicist Strategy)</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activeDraft.seoKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono bg-krew-surface px-2.5 py-1 rounded-lg border border-krew-border text-krew-text-secondary"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Schedule Slot Guidance */}
            <div className="p-3.5 rounded-xl bg-krew-surface border border-krew-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Recommended Cadence Window:</span>
              </div>
              <span className="font-mono text-emerald-400 font-bold">
                {activeDraft.recommendedScheduleTime}
              </span>
            </div>
          </Card>
        </div>

        {/* Right Col: Distribution Readiness Checklist */}
        <div className="space-y-6">
          <Card padding="md" className="space-y-4 bg-krew-card">
            <div className="border-b border-krew-border/60 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                Pre-Flight Governance
              </span>
              <h4 className="font-display text-base font-bold text-white mt-0.5">
                Distribution Checklist
              </h4>
              <p className="text-xs text-krew-text-secondary mt-0.5">
                Every role signs off before the Star greenlights distribution.
              </p>
            </div>

            <div className="space-y-2.5">
              {campaign.checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className="p-3 rounded-xl bg-krew-surface hover:bg-krew-cardHover border border-krew-border cursor-pointer transition-colors flex items-start gap-3"
                >
                  <button className="mt-0.5 text-krew-purple">
                    {item.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-krew-text-muted" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs ${
                        item.completed ? 'text-krew-text-secondary line-through' : 'text-white'
                      }`}
                    >
                      {item.task}
                    </p>
                    <span className="text-[10px] font-mono text-krew-lavender block mt-1">
                      Assigned: {item.assignedRole}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="cyan"
              size="sm"
              className="w-full"
              leftIcon={<Send className="w-4 h-4" />}
              onClick={() => {
                showToast({
                  title: 'Greenlight Scheduled',
                  message: 'Human-in-the-loop approved. Staggered campaign locked in studio slate.',
                  type: 'success'
                });
              }}
            >
              Sign Off & Greenlight
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
