import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Clapperboard, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../services/projectService';
import { ContentProject } from '../../types/project.types';
import { CommandCenterStats, ProductionCounts } from '../../components/dashboard/CommandCenterStats';
import { ProductionOverviewCard } from '../../components/dashboard/ProductionOverviewCard';
import { ProductionPipeline } from '../../components/dashboard/ProductionPipeline';
import { ActiveProjectsPanel } from '../../components/dashboard/ActiveProjectsPanel';
import { CreatorDnaSummary } from '../../components/dashboard/CreatorDnaSummary';
import { RecentProjectsList } from '../../components/dashboard/RecentProjectsList';
import { AgentWorkforceMini } from '../../components/dashboard/AgentWorkforceMini';
import { Button } from '../../components/common/Button';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ContentProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const loadProjects = useCallback(() => setReloadKey(key => key + 1), []);
  useEffect(() => {
    if (!user?.token) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError('');
    projectService.list(user.token, { sort: 'desc' }, controller.signal)
      .then(result => {
        if (!result.success || !result.data) throw new Error(result.message || 'Could not load productions');
        setProjects(result.data.items);
      })
      .catch(reason => {
        if (controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : 'Could not load productions');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [user?.token, reloadKey]);

  const currentProjects = useMemo(() => projects.filter(project => !['archived', 'approved'].includes(project.status)), [projects]);
  const counts: ProductionCounts = useMemo(() => ({
    total: projects.length,
    drafts: projects.filter(project => project.status === 'draft').length,
    inProduction: projects.filter(project => project.status === 'in_production').length,
    awaitingReview: projects.filter(project => project.status === 'review_ready').length
  }), [projects]);
  const featured = currentProjects.find(project => ['in_production', 'review_ready', 'queued'].includes(project.status)) || currentProjects[0];
  const recentActivity = useMemo(() => projects.slice().sort((a, b) => Date.parse(b.updatedAt || b.createdAt) - Date.parse(a.updatedAt || a.createdAt)), [projects]);

  return <div className="space-y-7 pb-8 sm:space-y-9">
    <section className="relative isolate overflow-hidden rounded-[1.75rem] bg-krew-bg-secondary px-5 py-8 sm:px-9 sm:py-10 lg:px-11">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-40 -z-10 h-[26rem] w-[26rem] rounded-full bg-krew-purple/15 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-36 w-80 rounded-full bg-krew-cyan/5 blur-[80px]" />
      <p className="krew-meta mb-3">YOUR STUDIO · COMMAND CENTER</p>
      <h1 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-krew-text-primary sm:text-5xl">Welcome back, {user?.name?.trim().split(/\s+/)[0] || 'Creator'}.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-krew-text-secondary sm:text-base">Your studio is ready. Let’s create something remarkable.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={() => navigate('/production')} leftIcon={<Clapperboard className="h-4 w-4" />}>Start a Production</Button>
        <Button variant="secondary" onClick={() => navigate('/crew')} rightIcon={<UsersRound className="h-4 w-4" />}>Explore Your Crew</Button>
      </div>
    </section>

    <div aria-live="polite"><CommandCenterStats counts={counts} loading={loading} unavailable={!!error} /></div>
    {error && <div role="alert" className="flex flex-col justify-between gap-3 rounded-xl bg-krew-status-error/10 px-4 py-3 text-sm text-krew-status-error sm:flex-row sm:items-center"><span>Project data could not be refreshed: {error}</span><Button size="sm" variant="secondary" onClick={loadProjects}>Retry</Button></div>}

    <ProductionOverviewCard project={featured} unavailable={!!error} />
    <ProductionPipeline project={featured} />

    <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
      <ActiveProjectsPanel projects={currentProjects} loading={loading} error={error} onRetry={loadProjects} />
      <CreatorDnaSummary />
    </div>

    <div className="grid gap-7 xl:grid-cols-[.85fr_1.15fr]">
      <RecentProjectsList projects={recentActivity} loading={loading} error={error} />
      <AgentWorkforceMini />
    </div>

    <div className="flex flex-col gap-4 rounded-2xl bg-krew-surface px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div><p className="font-display text-base font-semibold text-krew-text-primary">Keep the production moving</p><p className="mt-1 text-sm text-krew-text-muted">Open your project slate or refine the profile behind every production.</p></div>
      <div className="flex flex-wrap gap-2"><Button size="sm" variant="secondary" onClick={() => navigate('/production')}>Manage projects <ArrowRight className="ml-1 h-4 w-4" /></Button><Button size="sm" variant="ghost" onClick={() => navigate('/creator-dna')}>Edit Creator DNA</Button></div>
    </div>
  </div>;
};
