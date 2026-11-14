import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../services/projectService';
import { ContentProject } from '../../types/project.types';
import { CommandCenterStats, ProductionCounts } from '../../components/dashboard/CommandCenterStats';
import { ProductionOverviewCard } from '../../components/dashboard/ProductionOverviewCard';
import { RecentProjectsList } from '../../components/dashboard/RecentProjectsList';
import { AgentWorkforceMini } from '../../components/dashboard/AgentWorkforceMini';
import { Button } from '../../components/common/Button';
import { ArrowRight, Clapperboard, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth(); const navigate = useNavigate();
  const [projects, setProjects] = useState<ContentProject[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    if (!user?.token) { setLoading(false); return; }
    setLoading(true); setError('');
    projectService.list(user.token, { sort: 'desc' }).then(result => {
      if (!result.success || !result.data) throw new Error(result.message || 'Could not load productions');
      if (active) setProjects(result.data.items);
    }).catch(e => { if (active) setError(e instanceof Error ? e.message : 'Could not load productions'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [user?.token]);

  const activeProjects = useMemo(() => projects.filter(project => project.status !== 'archived'), [projects]);
  const counts: ProductionCounts = useMemo(() => ({ total: projects.length, drafts: activeProjects.filter(p => p.status === 'draft').length, inProduction: activeProjects.filter(p => p.status === 'in_production').length, awaitingReview: activeProjects.filter(p => p.status === 'review_ready').length }), [projects, activeProjects]);
  const featured = activeProjects.find(p => ['in_production', 'review_ready', 'queued'].includes(p.status)) || activeProjects[0];

  return <div className="space-y-9">
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-krew-bg-secondary px-6 py-9 sm:px-10 sm:py-12"><div className="pointer-events-none absolute -right-20 -top-40 -z-10 h-[26rem] w-[26rem] rounded-full bg-krew-purple/15 blur-[100px]"/><div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-36 w-80 rounded-full bg-krew-cyan/5 blur-[80px]"/><p className="krew-meta mb-3">YOUR STUDIO · COMMAND CENTER</p><h1 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-krew-text-primary sm:text-5xl">Welcome back, {user?.name?.split(' ')[0] || 'Creator'}.</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-krew-text-secondary sm:text-base">Your studio is ready. Let's create something remarkable.</p><div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => navigate('/production')} leftIcon={<Clapperboard className="h-4 w-4"/>}>Start a Production</Button><Button variant="secondary" onClick={() => navigate('/crew')} rightIcon={<UsersRound className="h-4 w-4"/>}>Explore Your Crew</Button></div></section>
    {error && <p role="alert" className="rounded-xl bg-krew-status-error/10 px-4 py-3 text-sm text-krew-status-error">{error}</p>}
    <CommandCenterStats counts={counts} loading={loading} unavailable={!!error}/>
    <ProductionOverviewCard project={featured} unavailable={!!error}/>
    <div className="grid gap-9 lg:grid-cols-[1.2fr_.8fr]"><RecentProjectsList projects={activeProjects} loading={loading} error={error}/><AgentWorkforceMini/></div>
    <button onClick={() => navigate('/creator-dna')} className="flex w-full items-center justify-between rounded-2xl bg-krew-surface px-5 py-4 text-left transition-colors hover:bg-krew-surface-elevated"><span><span className="block text-sm font-medium text-krew-text-primary">Need to shape your creative profile?</span><span className="mt-1 block text-xs text-krew-text-muted">Tune your voice, vocabulary, and visual identity in Creator DNA.</span></span><ArrowRight className="h-4 w-4 text-krew-lavender"/></button>
  </div>;
};
