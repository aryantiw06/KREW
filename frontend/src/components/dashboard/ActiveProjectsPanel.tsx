import React from 'react';
import { ArrowRight, Clapperboard, Film } from 'lucide-react';
import { ContentProject, ProjectStatus } from '../../types/project.types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

const workflowStages = ['Idea', 'Strategy', 'Script', 'Production', 'Distribution'];
const statusLabels: Record<ProjectStatus, string> = { draft: 'Draft', queued: 'Queued', in_production: 'In Production', review_ready: 'Review Ready', approved: 'Approved', archived: 'Archived' };
const statusVariants: Record<ProjectStatus, 'neutral' | 'purple' | 'cyan' | 'emerald'> = { draft: 'neutral', queued: 'purple', in_production: 'purple', review_ready: 'cyan', approved: 'emerald', archived: 'neutral' };

const getWorkflowPosition = (project: ContentProject) => {
  if (project.status === 'draft') return 0;
  if (project.pipelineStep <= 1) return 1;
  if (project.pipelineStep === 2) return 2;
  if (project.pipelineStep <= 4) return 3;
  return 4;
};

interface ActiveProjectsPanelProps {
  projects: ContentProject[];
  loading: boolean;
  error: string;
  onRetry: () => void;
}

export const ActiveProjectsPanel: React.FC<ActiveProjectsPanelProps> = ({ projects, loading, error, onRetry }) => {
  const navigate = useNavigate();
  return <section className="overflow-hidden rounded-2xl bg-krew-surface">
    <div className="flex items-end justify-between gap-3 px-5 pb-4 pt-5 sm:px-6"><div><p className="krew-meta">YOUR CURRENT SLATE</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">Active projects</h2></div><Button size="sm" variant="ghost" onClick={() => navigate('/production')} rightIcon={<ArrowRight className="h-4 w-4"/>}>Manage</Button></div>
    {loading ? <div role="status" className="space-y-3 px-5 pb-5 sm:px-6"><div className="h-20 animate-pulse rounded-xl bg-krew-bg-secondary"/><div className="h-20 animate-pulse rounded-xl bg-krew-bg-secondary"/></div> : error ? <div className="px-5 pb-5 sm:px-6"><p className="text-sm text-krew-status-error">Project data is unavailable.</p><Button size="sm" variant="secondary" className="mt-3" onClick={onRetry}>Retry</Button></div> : projects.length === 0 ? <div className="mx-5 mb-5 rounded-xl bg-krew-bg-secondary p-5 sm:mx-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-krew-purple/15 text-krew-lavender"><Clapperboard className="h-5 w-5"/></span><div><h3 className="text-sm font-medium text-krew-text-primary">Your slate is clear.</h3><p className="mt-1 text-xs text-krew-text-muted">Start a new production when inspiration hits.</p></div></div><Button size="sm" className="mt-4" onClick={() => navigate('/production')}>Start a production</Button></div> : <div className="space-y-2 px-4 pb-4 sm:px-5">{projects.slice(0, 4).map(project => {
      const current = getWorkflowPosition(project);
      return <article key={project.id} className="rounded-xl bg-krew-bg-secondary p-4"><div className="flex items-start gap-3"><span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-krew-surface text-krew-lavender"><Film className="h-4 w-4"/></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-medium text-krew-text-primary">{project.title}</h3><Badge size="xs" variant={statusVariants[project.status]}>{statusLabels[project.status]}</Badge></div><p className="mt-1 line-clamp-1 text-xs text-krew-text-muted">{project.description || 'No description added.'}</p></div></div><div className="mt-4"><div className="flex items-center justify-between gap-2"><span className="text-[10px] text-krew-text-muted">Workflow position</span><span className="font-mono text-[10px] text-krew-lavender">{workflowStages[current]}</span></div><div className="mt-2 grid grid-cols-5 gap-1" aria-label={`Workflow position: ${workflowStages[current]}`} role="img">{workflowStages.map((stage, index) => <span key={stage} className={`h-1 rounded-full ${index === current ? 'bg-krew-purple' : 'bg-white/[0.09]'}`}/>)}</div><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">{project.targetPlatforms.slice(0, 3).map(platform => <span key={platform} className="text-[10px] text-krew-text-muted">{platform}</span>)}</div></div></article>;
    })}</div>}
    <div className="border-t border-white/[0.06] px-5 py-3 text-[10px] leading-relaxed text-krew-text-muted sm:px-6">Workflow position comes from each saved project record. It does not indicate completed AI or agent tasks.</div>
  </section>;
};
