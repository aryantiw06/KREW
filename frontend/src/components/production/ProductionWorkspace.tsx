import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Clapperboard, FileText, Film, Image, Save, Scissors, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContentProject, ProjectStatus } from '../../types/project.types';
import { KREW_AGENTS } from '../../data/agents';
import { AgentPortrait } from '../agents/AgentPortrait';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Input, Textarea } from '../common/Input';

const stages = ['Idea', 'Strategy', 'Script', 'Production', 'Distribution'];
const statusLabels: Record<ProjectStatus, string> = { draft: 'Draft', queued: 'Queued', in_production: 'In Production', review_ready: 'Review Ready', approved: 'Approved', archived: 'Archived' };
const statusVariant: Record<ProjectStatus, 'neutral' | 'purple' | 'cyan' | 'emerald'> = { draft: 'neutral', queued: 'purple', in_production: 'purple', review_ready: 'cyan', approved: 'emerald', archived: 'neutral' };
const defaultData = (project: ContentProject) => ({
  title: project.title,
  description: project.description || '',
  sourceType: project.sourceType,
  sourceFileName: project.sourceFileName || '',
  targetPlatforms: [...(project.targetPlatforms || [])],
  productionBrief: { objective: '', targetAudience: '', contentFormat: '', tone: '', ...project.productionBrief },
  creativeWorkspace: { idea: '', outline: '', scriptDraft: '', talkingPoints: [], creativeNotes: '', ...project.creativeWorkspace }
});
export type WorkspaceDraft = ReturnType<typeof defaultData>;
interface CachedDraft { updatedAt: string; draft: WorkspaceDraft; stageValue: number; talkingPointsText: string; }
const cacheKey = (projectId: string) => `krew_production_draft_${projectId}`;
const readCache = (project: ContentProject): CachedDraft | null => {
  try {
    const cached = JSON.parse(window.localStorage.getItem(cacheKey(project.id)) || 'null') as CachedDraft | null;
    return cached && cached.updatedAt === project.updatedAt && cached.draft && typeof cached.draft.title === 'string' ? cached : null;
  } catch { return null; }
};
const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
};

interface ProductionWorkspaceProps {
  project: ContentProject;
  saving: boolean;
  changingStatus: boolean;
  error: string;
  notice: string;
  onSave: (draft: WorkspaceDraft, pipelineStep?: number) => Promise<boolean>;
  onStatusChange: (status: ProjectStatus) => Promise<boolean>;
  onBack: () => void;
}

export const ProductionWorkspace: React.FC<ProductionWorkspaceProps> = ({ project, saving, changingStatus, error, notice, onSave, onStatusChange, onBack }) => {
  const [draft, setDraft] = useState<WorkspaceDraft>(() => readCache(project)?.draft || defaultData(project));
  const [stageValue, setStageValue] = useState(() => readCache(project)?.stageValue ?? project.pipelineStep);
  const [activeSection, setActiveSection] = useState<'brief' | 'creative'>('brief');
  const [talkingPointsText, setTalkingPointsText] = useState(() => readCache(project)?.talkingPointsText ?? (project.creativeWorkspace?.talkingPoints || []).join('\n'));
  useEffect(() => {
    const cached = readCache(project);
    setDraft(cached?.draft || defaultData(project));
    setStageValue(cached?.stageValue ?? project.pipelineStep);
    setTalkingPointsText(cached?.talkingPointsText ?? (project.creativeWorkspace?.talkingPoints || []).join('\n'));
  }, [project.id, project.updatedAt]);

  const normalizedDraft = useMemo(() => ({
    ...draft,
    title: draft.title.trim(),
    targetPlatforms: draft.targetPlatforms.map(platform => platform.trim()).filter(Boolean),
    creativeWorkspace: { ...draft.creativeWorkspace, talkingPoints: talkingPointsText.split('\n').map(point => point.trim()).filter(Boolean) }
  }), [draft, talkingPointsText]);
  const isDirty = JSON.stringify(normalizedDraft) !== JSON.stringify(defaultData(project)) || stageValue !== project.pipelineStep;
  const valid = normalizedDraft.title.length > 0 && normalizedDraft.title.length <= 200 && normalizedDraft.description.length <= 10000;

  useEffect(() => {
    if (!isDirty) return;
    window.localStorage.setItem(cacheKey(project.id), JSON.stringify({ updatedAt: project.updatedAt, draft, stageValue, talkingPointsText } satisfies CachedDraft));
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [isDirty, project.id, project.updatedAt, draft, stageValue, talkingPointsText]);

  const update = <K extends keyof WorkspaceDraft>(key: K, value: WorkspaceDraft[K]) => setDraft(current => ({ ...current, [key]: value }));
  const updateBrief = (key: keyof NonNullable<ContentProject['productionBrief']>, value: string) => setDraft(current => ({ ...current, productionBrief: { ...current.productionBrief, [key]: value } }));
  const updateCreative = (key: 'idea' | 'outline' | 'scriptDraft' | 'creativeNotes', value: string) => setDraft(current => ({ ...current, creativeWorkspace: { ...current.creativeWorkspace, [key]: value } }));
  const persistDraft = async (step = stageValue) => {
    if (!valid) return false;
    const saved = await onSave(normalizedDraft, step);
    if (saved) window.localStorage.removeItem(cacheKey(project.id));
    return saved;
  };
  const save = async () => { await persistDraft(); };
  const changeStage = async (index: number) => {
    if (index === stageValue) return;
    const nextStep = index;
    setStageValue(nextStep);
    const saved = await persistDraft(nextStep);
    if (!saved) setStageValue(project.pipelineStep);
  };
  const changeStatus = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = event.target.value as ProjectStatus;
    if (nextStatus === project.status) return;
    if (isDirty) {
      const shouldSave = window.confirm('Save your unsaved workspace changes before changing project status?');
      if (!shouldSave) return;
      const saved = await persistDraft(stageValue);
      if (!saved) return;
    }
    await onStatusChange(nextStatus);
  };
  const leave = () => {
    if (isDirty && !window.confirm('Discard unsaved workspace changes and return to your projects?')) return;
    window.localStorage.removeItem(cacheKey(project.id));
    onBack();
  };

  return <div className="space-y-6">
    <header className="relative isolate overflow-hidden rounded-[1.65rem] bg-krew-bg-secondary p-5 sm:p-7 lg:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-28 -z-10 h-72 w-72 rounded-full bg-krew-purple/15 blur-[90px]" />
      <div className="relative flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><Button variant="ghost" size="sm" onClick={leave} leftIcon={<ArrowLeft className="h-4 w-4" />}>Project library</Button><span className="flex items-center gap-2 text-xs text-krew-text-muted">{saving ? <><span className="h-2 w-2 animate-pulse rounded-full bg-krew-status-warning" />Saving changes…</> : isDirty ? <><span className="h-2 w-2 rounded-full bg-krew-status-warning" />Unsaved changes</> : <><Check className="h-3.5 w-3.5 text-krew-status-success" />Saved to project</>}</span></div>
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end"><div className="min-w-0"><p className="krew-meta">PRODUCTION WORKSPACE · {project.id.slice(-6).toUpperCase()}</p><label className="mt-2 block"><span className="sr-only">Production name</span><Input value={draft.title} maxLength={200} aria-label="Production name" onChange={event => update('title', event.target.value)} className="border-0 bg-transparent px-0 py-1 font-display text-2xl font-semibold tracking-tight text-krew-text-primary shadow-none sm:text-3xl" /></label><p className="mt-1 text-xs text-krew-text-muted">Last updated {formatDate(project.updatedAt)}</p></div><div className="flex flex-wrap items-center gap-2"><Badge variant={statusVariant[project.status]}>{statusLabels[project.status]}</Badge><label className="sr-only" htmlFor="production-status">Project status</label><select id="production-status" value={project.status} disabled={changingStatus || saving} onChange={event => void changeStatus(event)} className="krew-focus min-h-10 rounded-xl bg-krew-surface px-3 text-xs text-krew-text-primary"><option value="draft">Draft</option><option value="queued">Queued</option><option value="in_production">In Production</option><option value="review_ready">Review Ready</option><option value="approved">Approved</option><option value="archived">Archived</option></select><Link to={`/clip-intelligence?projectId=${encodeURIComponent(project.id)}`} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-krew-surface px-3 text-xs font-medium text-krew-text-secondary transition-colors hover:bg-krew-surface-elevated hover:text-krew-text-primary"><Scissors className="h-4 w-4 text-krew-rose"/>Clip Intelligence</Link><Button size="sm" onClick={() => void save()} disabled={!isDirty || !valid || saving} isLoading={saving} leftIcon={<Save className="h-4 w-4" />}>Save changes</Button></div></div>
      </div>
    </header>

    {(error || notice) && <div role={error ? 'alert' : 'status'} className={`rounded-xl px-4 py-3 text-sm ${error ? 'bg-krew-status-error/10 text-krew-status-error' : 'bg-krew-status-success/10 text-krew-status-success'}`}>{error || notice}</div>}

    <section className="rounded-2xl bg-krew-surface p-5 sm:p-6"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><p className="krew-meta">FIVE STEPS FROM IDEA TO RELEASE</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">Production pipeline</h2></div><p className="text-xs text-krew-text-muted">Saved project position · no agent tasks are running</p></div><ol className="mt-5 grid grid-cols-5 gap-2 sm:gap-3">{stages.map((stage, index) => <li key={stage} className="min-w-0"><button type="button" onClick={() => void changeStage(index)} aria-current={stageValue === index ? 'step' : undefined} className="group w-full text-left"><span className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs transition-colors ${stageValue === index ? 'bg-krew-purple text-white' : 'bg-krew-bg-secondary text-krew-text-muted group-hover:text-krew-text-primary'}`}>{stageValue === index ? <Check className="h-4 w-4" /> : String(index + 1).padStart(2, '0')}</span><span className={`mt-2 block truncate text-[10px] sm:text-xs ${stageValue === index ? 'font-medium text-krew-text-primary' : 'text-krew-text-muted'}`}>{stage}</span></button></li>)}</ol><p className="mt-4 text-[10px] leading-relaxed text-krew-text-muted">Stage changes update the project’s saved workflow marker only. AI strategy, script generation, analysis and publishing remain reserved for the live hackathon sprint.</p></section>

    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,.7fr)]">
      <section className="min-w-0 space-y-4">
        <div role="tablist" aria-label="Production workspace sections" className="flex gap-2 rounded-xl bg-krew-bg-secondary p-1"><button role="tab" aria-selected={activeSection === 'brief'} onClick={() => setActiveSection('brief')} className={`flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-3 text-xs transition-colors ${activeSection === 'brief' ? 'bg-krew-surface text-krew-text-primary' : 'text-krew-text-muted hover:text-krew-text-secondary'}`}><FileText className="h-4 w-4" />Content brief</button><button role="tab" aria-selected={activeSection === 'creative'} onClick={() => setActiveSection('creative')} className={`flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-3 text-xs transition-colors ${activeSection === 'creative' ? 'bg-krew-surface text-krew-text-primary' : 'text-krew-text-muted hover:text-krew-text-secondary'}`}><Clapperboard className="h-4 w-4" />Creative workspace</button></div>
        {activeSection === 'brief' ? <section role="tabpanel" className="space-y-4 rounded-2xl bg-krew-surface p-5 sm:p-6"><div><p className="krew-meta">THE CREATIVE INTENT</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">Content brief</h2></div><Textarea label="Campaign or topic description" value={draft.description} maxLength={10000} onChange={event => update('description', event.target.value)} rows={4} placeholder="What are you making, and what should the audience take away?"/><div className="grid gap-4 sm:grid-cols-2"><label className="block space-y-1.5 text-xs text-krew-text-secondary">Source type<select value={draft.sourceType} onChange={event => update('sourceType', event.target.value as ContentProject['sourceType'])} className="krew-focus min-h-11 w-full rounded-xl bg-krew-bg-secondary px-3 text-sm text-krew-text-primary"><option value="topic_brief">Topic brief</option><option value="raw_video">Raw video</option><option value="podcast_audio">Podcast audio</option><option value="screen_recording">Screen recording</option></select></label><Input label="Source filename" value={draft.sourceFileName} maxLength={500} onChange={event => update('sourceFileName', event.target.value)} placeholder="Optional reference filename"/></div><Textarea label="Content objective" value={draft.productionBrief.objective || ''} maxLength={10000} onChange={event => updateBrief('objective', event.target.value)} rows={2} placeholder="What should this production accomplish?"/><Textarea label="Target audience" value={draft.productionBrief.targetAudience || ''} maxLength={10000} onChange={event => updateBrief('targetAudience', event.target.value)} rows={2} placeholder="Who is this for?"/><div className="grid gap-4 sm:grid-cols-2"><Input label="Target platforms · comma separated" value={draft.targetPlatforms.join(', ')} onChange={event => update('targetPlatforms', event.target.value.split(',').map(value => value.trim()).filter(Boolean))} placeholder="YouTube, Instagram"/><Input label="Content format" value={draft.productionBrief.contentFormat || ''} maxLength={300} onChange={event => updateBrief('contentFormat', event.target.value)} placeholder="Short-form, essay, interview…"/></div><Textarea label="Tone and creative direction" value={draft.productionBrief.tone || ''} maxLength={10000} onChange={event => updateBrief('tone', event.target.value)} rows={3} placeholder="Voice, pacing, references, or visual direction"/></section> : <section role="tabpanel" className="space-y-4 rounded-2xl bg-krew-surface p-5 sm:p-6"><div><p className="krew-meta">YOUR WORKING MATERIAL</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">Creative workspace</h2><p className="mt-1 text-xs text-krew-text-muted">Your writing and planning stay yours. KREW has not generated this content.</p></div><Textarea label="Idea and concept" value={draft.creativeWorkspace.idea || ''} maxLength={10000} onChange={event => updateCreative('idea', event.target.value)} rows={3} placeholder="Capture the central idea in your own words…"/><Textarea label="Content outline" value={draft.creativeWorkspace.outline || ''} maxLength={10000} onChange={event => updateCreative('outline', event.target.value)} rows={4} placeholder="Structure the story, section by section…"/><Textarea label="Script draft" value={draft.creativeWorkspace.scriptDraft || ''} maxLength={10000} onChange={event => updateCreative('scriptDraft', event.target.value)} rows={8} placeholder="Write or paste your script draft…"/><Textarea label="Key talking points · one per line" value={talkingPointsText} maxLength={5000} onChange={event => setTalkingPointsText(event.target.value)} rows={4} placeholder={'Opening thought\nKey point\nClosing question'}/><Textarea label="Creative notes" value={draft.creativeWorkspace.creativeNotes || ''} maxLength={10000} onChange={event => updateCreative('creativeNotes', event.target.value)} rows={3} placeholder="Production notes, references, or open questions…"/></section>}
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-[10px] text-krew-text-muted">Changes save to this project record when you choose Save changes.</p><Button onClick={() => void save()} disabled={!isDirty || !valid || saving} isLoading={saving} leftIcon={<Save className="h-4 w-4" />}>Save workspace</Button></div>
      </section>

      <aside className="space-y-5">
        <section className="overflow-hidden rounded-2xl bg-krew-surface"><div className="flex items-center justify-between px-5 pb-3 pt-5"><div><p className="krew-meta">ILLUSTRATIVE CREW ROSTER</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Meet your KREW</h2></div><UsersRound className="h-4 w-4 text-krew-lavender" /></div><div className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-3 xl:grid-cols-2">{KREW_AGENTS.map(agent => <article key={agent.id} className="min-w-0 bg-krew-surface"><AgentPortrait agent={agent} className="aspect-[5/3]"/><div className="p-3"><p className="truncate text-[11px] font-semibold" style={{ color: agent.color }}>{agent.name}</p><p className="mt-1 min-h-7 text-[10px] leading-relaxed text-krew-text-secondary">{agent.technicalIdentity}</p><p className="mt-2 min-h-8 text-[9px] leading-relaxed text-krew-text-muted">{agent.responsibilities[0]}</p><p className="mt-2 text-[9px] leading-relaxed text-krew-text-muted">Reserved for live hackathon sprint</p></div></article>)}</div><p className="px-5 py-3 text-[10px] leading-relaxed text-krew-text-muted">Agent roles are design contracts; there is no autonomous execution or agent-to-agent communication in this workspace.</p></section>

        <section className="rounded-2xl bg-krew-surface p-5"><div><p className="krew-meta">ASSETS & REFERENCES</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Project materials</h2></div>{project.sourceFileName ? <div className="mt-4 flex items-start gap-3 rounded-xl bg-krew-bg-secondary p-3"><Film className="mt-0.5 h-4 w-4 shrink-0 text-krew-cyan"/><div className="min-w-0"><p className="truncate text-xs font-medium text-krew-text-primary">{project.sourceFileName}</p><p className="mt-1 text-[10px] leading-relaxed text-krew-text-muted">Source reference metadata saved. This workspace does not store or serve the file itself.</p></div></div> : <div className="mt-4 rounded-xl bg-krew-bg-secondary p-4"><div className="flex items-center gap-2 text-krew-text-secondary"><Image className="h-4 w-4 text-krew-lavender"/><p className="text-xs font-medium">No assets attached</p></div><p className="mt-2 text-[10px] leading-relaxed text-krew-text-muted">Video, image, thumbnail, and reference file storage will connect here when upload support is available.</p></div>}<div className="mt-3 flex items-center gap-2 text-[10px] text-krew-text-muted"><ChevronRight className="h-3.5 w-3.5"/>File upload and asset storage reserved for integration</div></section>

        <section className="rounded-2xl bg-krew-surface p-5"><p className="krew-meta">PROJECT ACTIVITY</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Saved milestones</h2><ol className="mt-4 space-y-4"><li className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-krew-purple"/><div><p className="text-xs font-medium text-krew-text-primary">Production created</p><time className="mt-1 block text-[10px] text-krew-text-muted">{formatDate(project.createdAt)}</time></div></li>{project.updatedAt && project.updatedAt !== project.createdAt && <li className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-krew-cyan"/><div><p className="text-xs font-medium text-krew-text-primary">Project record last updated</p><time className="mt-1 block text-[10px] text-krew-text-muted">{formatDate(project.updatedAt)}</time></div></li>}</ol><p className="mt-4 text-[10px] text-krew-text-muted">Milestones come from saved project timestamps; no agent activity is inferred.</p></section>
      </aside>
    </div>
  </div>;
};
