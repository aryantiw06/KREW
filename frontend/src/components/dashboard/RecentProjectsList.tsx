import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { SAMPLE_PROJECTS } from '../../data/sampleProjects';
import { formatDuration, formatDate } from '../../utils/formatters';
import { Film, Clock, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RecentProjectsList: React.FC = () => {
  const navigate = useNavigate();

  const statusBadges = {
    review_ready: <Badge variant="cyan" size="xs">Review Ready</Badge>,
    in_production: <Badge variant="purple" size="xs">In Production</Badge>,
    draft: <Badge variant="neutral" size="xs">Strategy Draft</Badge>,
    scheduled: <Badge variant="emerald" size="xs">Scheduled</Badge>,
    completed: <Badge variant="emerald" size="xs">Released</Badge>
  };

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-krew-border/60 pb-3">
        <div>
          <h4 className="font-display font-bold text-white text-base">
            Recent Studio Productions
          </h4>
          <p className="text-xs text-krew-text-secondary">
            Master video projects coordinated across the KREW workforce.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => navigate('/production')}
        >
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {SAMPLE_PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate('/production')}
            className="p-3.5 rounded-xl bg-krew-surface hover:bg-krew-cardHover border border-krew-border hover:border-krew-purple/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-krew-card border border-krew-border flex items-center justify-center text-krew-lavender shrink-0 mt-0.5">
                <Film className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {statusBadges[project.status]}
                  {project.sourceDuration && (
                    <span className="text-[11px] font-mono text-krew-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(project.sourceDuration)}
                    </span>
                  )}
                </div>
                <h5 className="text-sm font-semibold text-white truncate max-w-lg">
                  {project.title}
                </h5>
                <div className="flex flex-wrap items-center gap-2 text-xs text-krew-text-muted mt-1">
                  <span>{project.targetPlatforms.join(' • ')}</span>
                  <span>•</span>
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {project.clipsCount !== undefined && project.clipsCount > 0 && (
                <span className="text-[11px] font-mono bg-krew-card px-2.5 py-1 rounded-lg border border-krew-border text-krew-text-secondary">
                  {project.clipsCount} Clips
                </span>
              )}
              {project.thumbnailCount !== undefined && project.thumbnailCount > 0 && (
                <span className="text-[11px] font-mono bg-krew-card px-2.5 py-1 rounded-lg border border-krew-border text-krew-text-secondary">
                  {project.thumbnailCount} Art Concepts
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

