import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Archive, ArrowRight, Clapperboard, Film, Plus, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../services/projectService';
import { ContentProject, ProjectStatus } from '../../types/project.types';
import { ProductionWorkspace } from '../../components/production/ProductionWorkspace';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Dropdown } from '../../components/ui/Dropdown';

const statuses: Array<'all' | ProjectStatus> = ['all', 'draft', 'queued', 'in_production', 'review_ready', 'approved', 'archived'];
const statusLabels: Record<'all' | ProjectStatus, string> = { all: 'All', draft: 'Draft', queued: 'Queued', in_production: 'In Production', review_ready: 'Review Ready', approved: 'Approved', archived: 'Archived' };
const statusVariants: Record<ProjectStatus, 'neutral' | 'purple' | 'cyan' | 'emerald'> = { draft: 'neutral', queued: 'purple', in_production: 'purple', review_ready: 'cyan', approved: 'emerald', archived: 'neutral' };
const blank = { title: '', description: '', sourceType: 'topic_brief' as ContentProject['sourceType'], sourceFileName: '', targetPlatforms: ['YouTube'] };
const stageLabel = (project: ContentProject) => project.status === 'draft' ? 'Idea' : project.pipelineStep <= 1 ? 'Strategy' : project.pipelineStep === 2 ? 'Script' : project.pipelineStep <= 4 ? 'Production' : 'Distribution';
const dateLabel = (value: string) => { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Date unavailable' : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date); };

export const ProductionStudioPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('projectId');
  const [projects, setProjects] = useState<ContentProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingStatus, setChangingStatus] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState('');
  const [filter, setFilter] = useState<'all' | ProjectStatus>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [file, setFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    if (!user?.token) { setProjects([]); setLoading(false); return; }
    setLoading(true); setError('');
    try {
      const result = await projectService.list(user.token, { status: filter, search, sort });
      if (!result.success || !result.data) throw new Error(result.message || 'Could not load productions');
      setProjects(result.data.items);
      setMode(result.data.persistence.mode);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not load productions'); }
    finally { setLoading(false); }
  }, [user?.token, filter, search, sort]);
  useEffect(() => { void load(); }, [load]);

  const selectedProject = useMemo(() => projects.find(project => project.id === selectedId), [projects, selectedId]);
  const startCreate = () => { setForm(blank); setFile(null); setOpen(true); setError(''); setNotice(''); };
  const openWorkspace = (project: ContentProject) => { setError(''); setNotice(''); setSearchParams({ projectId: project.id }); };
  const closeWorkspace = () => { setSearchParams({}); setError(''); setNotice(''); };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user?.token || !form.title.trim() || form.title.trim().length > 200) return;
    setSaving(true); setError(''); setNotice('');
    try {
      const result = await projectService.create(user.token, {
        ...form,
        title: form.title.trim(),
        sourceFileName: file?.name || form.sourceFileName || undefined,
        fileMetadata: file ? { originalName: file.name, mimeType: file.type, fileSizeBytes: file.size } : undefined
      });
      if (!result.success || !result.data) throw new Error(result.message || 'Could not create production');
      const created = result.data.project;
      setProjects(current => [created, ...current.filter(project => project.id !== created.id)]);
      setMode(result.data.persistence.mode);
      setNotice(result.message || 'Production saved');
      setOpen(false);
      setForm(blank);
      setFile(null);
      setSearchParams({ projectId: created.id });
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not create production'); }
    finally { setSaving(false); }
  };

  const saveWorkspace = async (draft: Parameters<React.ComponentProps<typeof ProductionWorkspace>['onSave']>[0], pipelineStep?: number) => {
    if (!user?.token || !selectedProject) return false;
    setSaving(true); setError(''); setNotice('');
    try {
      const result = await projectService.update(user.token, selectedProject.id, { ...draft, pipelineStep: pipelineStep ?? selectedProject.pipelineStep });
      if (!result.success || !result.data) throw new Error(result.message || 'Could not save workspace changes');
      setProjects(current => current.map(project => project.id === result.data?.project.id ? result.data.project : project));
      setNotice(result.message || 'Workspace changes saved to this production.');
      return true;
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not save workspace changes'); return false; }
    finally { setSaving(false); }
  };

  const transition = async (status: ProjectStatus) => {
    if (!user?.token || !selectedProject) return false;
    setChangingStatus(true); setError(''); setNotice('');
    try {
      const result = await projectService.updateStatus(user.token, selectedProject.id, status);
      if (!result.success || !result.data) throw new Error(result.message || 'Could not update production status');
      setProjects(current => current.map(project => project.id === result.data?.project.id ? result.data.project : project));
      setNotice(`Production moved to ${statusLabels[status]}.`);
      return true;
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not update production status'); return false; }
    finally { setChangingStatus(false); }
  };

  const archive = async (project: ContentProject) => {
    if (!user?.token || !window.confirm(`Archive “${project.title}”?`)) return;
    setSaving(true); setError(''); setNotice('');
    try {
      const result = await projectService.archive(user.token, project.id);
      if (!result.success) throw new Error(result.message || 'Could not archive production');
      setNotice('Production archived.');
      await load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not archive production'); }
    finally { setSaving(false); }
  };

  if (selectedId && selectedProject) return <div className="space-y-4">
    {mode === 'in-memory' && <p className="rounded-xl bg-krew-status-warning/10 px-4 py-3 text-xs text-krew-status-warning">Temporary project storage is active. Changes may be lost when the server restarts.</p>}
    <ProductionWorkspace key={selectedProject.id} project={selectedProject} saving={saving} changingStatus={changingStatus} error={error} notice={notice} onSave={saveWorkspace} onStatusChange={transition} onBack={closeWorkspace} />
  </div>;
  if (selectedId && !loading) return <section className="rounded-3xl bg-krew-bg-secondary px-6 py-12 text-center"><h1 className="font-display text-xl font-semibold text-krew-text-primary">{error ? 'This production could not be loaded.' : 'Production not found.'}</h1><p className="mt-2 text-sm text-krew-text-secondary">{error || 'It may have been archived, removed, or belong to another session.'}</p><div className="mt-5 flex justify-center gap-2"><Button variant="secondary" onClick={closeWorkspace}>Back to projects</Button>{error && <Button onClick={() => void load()}>Retry</Button>}</div></section>;

  return <div className="space-y-7 pb-8 sm:space-y-9">
    <header className="relative isolate overflow-hidden rounded-[1.65rem] bg-krew-bg-secondary px-5 py-7 sm:px-8 sm:py-8"><div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-24 -z-10 h-64 w-64 rounded-full bg-krew-purple/12 blur-[90px]"/><div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="krew-meta mb-2 flex items-center gap-2"><Clapperboard className="h-4 w-4 text-krew-purple"/>PRODUCTION STUDIO</p><h1 className="font-display text-3xl font-semibold tracking-tight text-krew-text-primary sm:text-4xl">Your Productions</h1><p className="mt-2 text-sm text-krew-text-secondary">Every great idea starts with a production.</p></div><Button onClick={startCreate} leftIcon={<Plus className="h-4 w-4"/>}>New Production</Button></div></header>
    {error && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-krew-status-error/10 px-4 py-3 text-sm text-krew-status-error">{error}<Button size="sm" variant="secondary" onClick={() => void load()}>Retry</Button></div>}
    {notice && <div role="status" className="rounded-xl bg-krew-status-success/10 px-4 py-3 text-sm text-krew-status-success">{notice}{mode === 'in-memory' && ' · Saved in temporary memory; server restart clears this data.'}</div>}

    <section className="space-y-4"><div className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-krew-text-muted"/><Input aria-label="Search productions by title" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search your productions…" className="pl-10"/><span className="sr-only" aria-live="polite">{projects.length} matching productions</span></div><Dropdown aria-label="Sort productions by date" value={sort} onChange={event => setSort(event.target.value as 'asc' | 'desc')}><option value="desc">Newest first</option><option value="asc">Oldest first</option></Dropdown></div><div role="group" aria-label="Filter productions" className="flex gap-2 overflow-x-auto pb-1">{statuses.map(status => <button type="button" key={status} aria-pressed={filter === status} onClick={() => setFilter(status)} className={`min-h-10 shrink-0 rounded-full px-3.5 text-xs transition-colors ${filter === status ? 'bg-krew-purple text-white' : 'bg-krew-surface text-krew-text-secondary hover:bg-krew-surface-elevated'}`}>{statusLabels[status]}</button>)}</div></section>

    {loading ? <div role="status" className="space-y-3 py-4"><div className="h-28 animate-pulse rounded-2xl bg-krew-surface"/><div className="h-28 animate-pulse rounded-2xl bg-krew-surface"/><span className="sr-only">Loading productions</span></div> : projects.length === 0 && error ? <section className="rounded-3xl bg-krew-bg-secondary px-6 py-14 text-center"><h2 className="font-display text-xl font-semibold text-krew-text-primary">Productions couldn’t load</h2><p className="mt-2 text-sm text-krew-text-secondary">The project library could not be reached. Retry to fetch saved productions.</p><Button className="mt-5" variant="secondary" onClick={() => void load()}>Try again</Button></section> : projects.length === 0 && (search.trim() || filter !== 'all') ? <section className="rounded-3xl bg-krew-bg-secondary px-6 py-14 text-center"><h2 className="font-display text-xl font-semibold text-krew-text-primary">No matching productions</h2><p className="mt-2 text-sm text-krew-text-secondary">Clear your search or choose another status filter.</p><Button className="mt-5" variant="secondary" onClick={() => { setSearch(''); setFilter('all'); }}>Clear filters</Button></section> : projects.length === 0 ? <section className="relative isolate overflow-hidden rounded-3xl bg-krew-bg-secondary px-6 py-14 text-center sm:py-16"><div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-96 -translate-x-1/2 rounded-full bg-krew-purple/10 blur-3xl"/><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-krew-purple/15 text-krew-lavender"><Film className="h-6 w-6"/></span><h2 className="mt-5 font-display text-2xl font-semibold text-krew-text-primary">Your next production starts here.</h2><p className="mx-auto mt-2 max-w-md text-sm text-krew-text-secondary">Start with a new idea, brief, or source file. You’ll stay in control at every stage.</p><Button className="mt-6" onClick={startCreate} leftIcon={<Plus className="h-4 w-4"/>}>Create your first production</Button></section> : <div className="grid gap-3 xl:grid-cols-2">{projects.map(project => <article key={project.id} className="group overflow-hidden rounded-2xl bg-krew-surface transition-colors hover:bg-krew-surface-elevated"><div className="flex min-h-32"><div className="relative flex w-28 shrink-0 items-end overflow-hidden p-3 sm:w-36" style={{background: `radial-gradient(ellipse at 65% 15%, ${project.status === 'review_ready' ? 'rgba(56,189,248,.30)' : 'rgba(168,85,247,.28)'}, transparent 65%), linear-gradient(145deg,#201F2A,#101016)`}}><Film className="absolute right-3 top-3 h-6 w-6 text-white/20"/><span className="font-mono text-[9px] text-white/60">{project.sourceType.replace('_', ' ').toUpperCase()}</span></div><div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 sm:p-5"><div className="flex flex-wrap items-center gap-2"><Badge variant={statusVariants[project.status]} size="xs">{statusLabels[project.status]}</Badge><span className="font-mono text-[10px] text-krew-text-muted">{dateLabel(project.updatedAt || project.createdAt)}</span></div><div className="min-w-0"><h2 className="truncate font-display text-lg font-semibold text-krew-text-primary">{project.title}</h2><p className="mt-1 line-clamp-2 text-xs leading-relaxed text-krew-text-secondary">{project.description || 'No campaign description yet.'}</p></div><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex min-w-0 flex-wrap gap-1.5">{project.targetPlatforms.slice(0, 3).map(platform => <span key={platform} className="rounded-full bg-krew-bg-secondary px-2.5 py-1 text-[9px] text-krew-text-secondary">{platform}</span>)}<span className="font-mono text-[9px] text-krew-text-muted">· {stageLabel(project)}</span></div><div className="flex shrink-0 items-center gap-1"><Button size="sm" variant="ghost" onClick={() => openWorkspace(project)} rightIcon={<ArrowRight className="h-3.5 w-3.5"/>}>Open</Button><Button size="sm" variant="ghost" disabled={saving || project.status === 'archived'} aria-label={`Archive ${project.title}`} onClick={() => void archive(project)}><Archive className="h-4 w-4"/></Button></div></div></div></div></article>)}</div>}

    <Modal isOpen={open} onClose={() => !saving && setOpen(false)} title="New Production" subtitle="Create a project record. No AI tasks are dispatched." maxWidth="xl"><form onSubmit={submit} className="space-y-4"><Input label="Production title" required maxLength={200} value={form.title} onChange={event => setForm({ ...form, title: event.target.value })}/><Textarea label="Campaign or topic description" value={form.description} maxLength={10000} onChange={event => setForm({ ...form, description: event.target.value })} rows={3}/><label className="block space-y-1.5 text-xs text-krew-text-secondary">Source type<select value={form.sourceType} onChange={event => setForm({ ...form, sourceType: event.target.value as ContentProject['sourceType'] })} className="krew-focus w-full rounded-xl bg-krew-surface p-3 text-sm text-krew-text-primary">{[['topic_brief', 'Topic brief'], ['raw_video', 'Raw video'], ['podcast_audio', 'Podcast audio'], ['screen_recording', 'Screen recording']].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><Input label="Source filename (optional)" value={form.sourceFileName} onChange={event => setForm({ ...form, sourceFileName: event.target.value })}/><label className="block text-xs text-krew-text-secondary">Select a source file<input type="file" onChange={event => setFile(event.target.files?.[0] || null)} className="mt-2 block min-h-10 w-full text-sm text-krew-text-secondary"/><span className="mt-1 block text-[10px] text-krew-text-muted">Only file metadata is recorded; binary upload and asset storage are not connected.</span></label><Input label="Target platforms · comma separated" value={form.targetPlatforms.join(', ')} onChange={event => setForm({ ...form, targetPlatforms: event.target.value.split(',').map(value => value.trim()).filter(Boolean) })}/><Button type="submit" className="w-full" isLoading={saving} disabled={!form.title.trim() || form.title.trim().length > 200 || saving}>Create production</Button></form></Modal>
  </div>;
};
