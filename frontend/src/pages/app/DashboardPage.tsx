import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CommandCenterStats } from '../../components/dashboard/CommandCenterStats';
import { ProductionOverviewCard } from '../../components/dashboard/ProductionOverviewCard';
import { RecentProjectsList } from '../../components/dashboard/RecentProjectsList';
import { AgentWorkforceMini } from '../../components/dashboard/AgentWorkforceMini';
import { UpcomingContentCalendar } from '../../components/dashboard/UpcomingContentCalendar';
import { StatusPill } from '../../components/common/StatusPill';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Sparkles, Dna, Clapperboard, Share2, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-krew-card via-krew-charcoal to-krew-card border border-krew-border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-studio-card">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-krew-lavender bg-krew-purple/15 px-2.5 py-0.5 rounded-full border border-krew-purple/30">
              STUDIO STAGE COMMAND CENTER
            </span>
            <StatusPill type="architected" label="50% Pre-Event Build" />
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            The Spotlight is Yours, {user?.name || 'Creator'}.
          </h1>
          <p className="text-xs sm:text-sm text-krew-text-secondary max-w-2xl leading-relaxed">
            Project counts and recent projects come from the backend. Agent execution and future AI capabilities are RESERVED FOR LIVE HACKATHON SPRINT.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/creator-dna')}
            leftIcon={<Dna className="w-4 h-4 text-krew-purple" />}
          >
            Inspect DNA Memory
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/production')}
            leftIcon={<Clapperboard className="w-4 h-4" />}
          >
            Launch Production
          </Button>
        </div>
      </div>

      {/* Studio Telemetry Stats */}
      <CommandCenterStats />

      {/* Lead Production Progress */}
      <ProductionOverviewCard />

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentProjectsList />
          <UpcomingContentCalendar />
        </div>

        <div className="space-y-8">
          <AgentWorkforceMini />

          {/* Bollywood Studio Philosophy Card */}
          <Card padding="md" className="border-krew-purple/30 bg-krew-surface/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-krew-lavender">
              <Film className="w-4 h-4 text-krew-purple" />
              <span>THE BOLLYWOOD FORMULA</span>
            </div>
            <h5 className="font-display text-base font-bold text-white">
              The Star Performs. The Crew Produces.
            </h5>
            <p className="text-xs text-krew-text-secondary leading-relaxed">
              KREW keeps the creator in control. Agent execution and automated timeline management are RESERVED FOR LIVE HACKATHON SPRINT.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

