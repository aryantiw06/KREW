import React from 'react';
import { ArrowRight, Film } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ContentProject } from '../../types/project.types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

const variants: Record<ContentProject['status'], 'neutral' | 'purple' | 'cyan' | 'emerald'> = { draft: 'neutral', queued: 'purple', in_production: 'purple', review_ready: 'cyan', approved: 'emerald', archived: 'neutral' };
const statusNames: Record<ContentProject['status'], string> = { draft: 'Draft', queued: 'Queued', in_production: 'In production', review_ready: 'Review ready', approved: 'Approved', archived: 'Archived' };
const activityLabel = (project: ContentProject) => {
  const created = Date.parse(project.createdAt);
  const updated = Date.parse(project.updatedAt);
  return Number.isFinite(created) && Number.isFinite(updated) && updated - created > 60_000 ? 'Project updated' : 'Production created';
};
const activityDate = (project: ContentProject) => {
  const date = new Date(project.updatedAt || project.createdAt);
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
};

export const RecentProjectsList: React.FC<{ projects: ContentProject[]; loading?: boolean; error?: string }> = ({ projects, loading, error }) => {
  const navigate = useNavigate();
  return <section className="space-y-4">
    <div className="flex items-end justify-between gap-3"><div><p className="krew-meta">FROM YOUR PROJECT HISTORY</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">Recent activity</h2></div><Button variant="ghost" size="sm" onClick={() => navigate('/production')} rightIcon={<ArrowRight className="h-4 w-4" />}>Library</Button></div>
    {error ? <div role="status" className="rounded-2xl bg-krew-surface p-5"><p className="text-sm text-krew-status-warning">Recent activity is unavailable while your project library is offline.</p></div> : loading ? <div role="status" className="space-y-3 rounded-2xl bg-krew-surface p-5"><div className="h-11 animate-pulse rounded-lg bg-krew-bg-secondary" /><div className="h-11 animate-pulse rounded-lg bg-krew-bg-secondary" /><span className="sr-only">Loading project activity</span></div> : projects.length === 0 ? <div className="rounded-2xl bg-krew-surface p-5"><p className="text-sm text-krew-text-secondary">Your project activity will appear here once you create a production.</p><Link to="/production" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-krew-lavender hover:text-krew-text-primary">Open Production Studio <ArrowRight className="h-3.5 w-3.5" /></Link></div> : <div className="divide-y divide-white/[0.07] rounded-2xl bg-krew-surface px-4">
      {projects.slice(0, 5).map(project => <button key={project.id} onClick={() => navigate('/production')} className="flex w-full items-center gap-3 py-4 text-left transition-colors hover:text-krew-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-krew-purple">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-krew-bg-secondary text-krew-lavender"><Film className="h-4 w-4" /></span>
        <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="truncate text-sm font-medium text-krew-text-primary">{project.title}</span><span className="text-[10px] text-krew-text-muted">{activityLabel(project)}</span></span><span className="mt-1 block truncate text-xs text-krew-text-muted">{activityDate(project)}{project.targetPlatforms.length ? ` · ${project.targetPlatforms.join(' · ')}` : ''}</span></span>
        <Badge variant={variants[project.status]} size="xs">{statusNames[project.status]}</Badge>
      </button>)}
    </div>}
  </section>;
};
