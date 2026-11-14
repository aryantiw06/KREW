import React from 'react';
import { ArrowRight, Film } from 'lucide-react';
import { ContentProject } from '../../types/project.types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

const variants: Record<ContentProject['status'], 'neutral' | 'purple' | 'cyan' | 'emerald'> = { draft: 'neutral', queued: 'purple', in_production: 'purple', review_ready: 'cyan', approved: 'emerald', archived: 'neutral' };
export const RecentProjectsList: React.FC<{ projects: ContentProject[]; loading?: boolean; error?: string }> = ({ projects, loading, error }) => {
  const navigate = useNavigate();
  return <section className="space-y-4"><div className="flex items-end justify-between"><div><p className="krew-meta">RECENT WORK</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">Recent productions</h2></div><Button variant="ghost" size="sm" onClick={() => navigate('/production')} rightIcon={<ArrowRight className="h-4 w-4"/>}>Library</Button></div>
    {error ? <p role="alert" className="text-sm text-krew-status-error">{error}</p> : loading ? <p className="py-5 text-sm text-krew-text-muted">Loading productions…</p> : projects.length === 0 ? <p className="rounded-2xl bg-krew-surface p-5 text-sm text-krew-text-secondary">No productions yet. Start with a topic, a rough idea, or a source file.</p> : <div className="divide-y divide-white/[0.07] rounded-2xl bg-krew-surface px-4">{projects.slice(0, 4).map(project => <button key={project.id} onClick={() => navigate('/production')} className="flex w-full items-center gap-3 py-4 text-left transition-colors hover:text-krew-text-primary"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-krew-bg-secondary text-krew-lavender"><Film className="h-4 w-4"/></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-krew-text-primary">{project.title}</span><span className="mt-1 block truncate text-xs text-krew-text-muted">{new Date(project.createdAt).toLocaleDateString()} · {project.targetPlatforms.join(' · ') || 'No platforms selected'}</span></span><Badge variant={variants[project.status]} size="xs">{project.status.replace('_', ' ')}</Badge></button>)}</div>}
  </section>;
};
