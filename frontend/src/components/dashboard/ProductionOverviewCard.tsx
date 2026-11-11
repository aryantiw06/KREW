import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { SAMPLE_PROJECTS } from '../../data/sampleProjects';
import { ArrowRight, Film, Scissors, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProductionOverviewCard: React.FC = () => {
  const navigate = useNavigate();
  const currentProject = SAMPLE_PROJECTS[0]; // Lead production

  const pipelineStages = [
    { num: 1, label: 'Strategy Brief', agent: 'The Director', done: true },
    { num: 2, label: 'Hook & Script', agent: 'The Writer', done: true },
    { num: 3, label: 'Clip Intelligence', agent: 'The Editor', done: true },
    { num: 4, label: 'Thumbnails', agent: 'The Cinematographer', done: true },
    { num: 5, label: 'Distribution', agent: 'The Publicist', done: false }
  ];

  return (
    <Card padding="lg" className="border-krew-purple/40 bg-gradient-to-br from-krew-card to-krew-charcoal relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-krew-lavender bg-krew-purple/15 px-2.5 py-0.5 rounded-full border border-krew-purple/30">
              Lead Production In Review
            </span>
            <Badge variant="cyan" size="xs">
              Pipeline Stage 4/5
            </Badge>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white max-w-2xl leading-snug">
            {currentProject.title}
          </h3>
          <p className="text-xs text-krew-text-secondary mt-1 max-w-xl">
            {currentProject.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/clip-intelligence')}
            leftIcon={<Scissors className="w-4 h-4 text-rose-400" />}
          >
            Review Clips (4)
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/distribution')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Open Distribution
          </Button>
        </div>
      </div>

      {/* Production Pipeline Progress Line */}
      <div className="pt-4 border-t border-krew-border/60">
        <p className="text-[11px] font-mono uppercase tracking-wider text-krew-text-muted mb-4">
          Autonomous Production Pipeline Handoffs:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {pipelineStages.map((stage) => (
            <div
              key={stage.num}
              className={`p-3 rounded-xl border transition-colors ${
                stage.done
                  ? 'bg-krew-purple/10 border-krew-purple/40 text-white'
                  : 'bg-krew-surface/60 border-krew-border text-krew-text-muted'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-[10px]">STAGE 0{stage.num}</span>
                {stage.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-krew-lavender" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <p className="text-xs font-semibold">{stage.label}</p>
              <p className="text-[10px] text-krew-text-secondary truncate mt-0.5">
                {stage.agent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

