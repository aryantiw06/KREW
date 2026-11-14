import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BookmarkPlus, Clapperboard, Clock3, FileVideo2, Film, Plus, Scissors, Trash2, Upload, WandSparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../services/projectService';
import { ContentProject } from '../../types/project.types';
import { UserClipMoment, ClipMomentReviewStatus } from '../../types/clip.types';
import { KREW_AGENTS } from '../../data/agents';
import { AgentPortrait } from '../../components/agents/AgentPortrait';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input, Textarea } from '../../components/common/Input';
import { useToast } from '../../hooks/useToast';

const statusNames: Record<ClipMomentReviewStatus, string> = { unreviewed: 'Unreviewed', keep: 'Keep', discard: 'Discard' };
const statusStyles: Record<ClipMomentReviewStatus, string> = { unreviewed: 'bg-white/[0.08] text-krew-text-secondary', keep: 'bg-krew-status-success/10 text-krew-status-success', discard: 'bg-krew-status-error/10 text-krew-status-error' };
const storageKey = (projectId: string) => `krew_user_clip_moments_${projectId}`;
const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const remaining = whole % 60;
  return hours ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}` : `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
};
const localMoments = (projectId: string): UserClipMoment[] => {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey(projectId)) || '[]');
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is UserClipMoment => !!item && typeof item === 'object' && (item as UserClipMoment).projectId === projectId && typeof (item as UserClipMoment).id === 'string' && Number.isFinite((item as UserClipMoment).timestamp));
  } catch { return []; }
};
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const ClipIntelligencePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProjectId = searchParams.get('projectId') || '';
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<ContentProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [videoError, setVideoError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [moments, setMoments] = useState<UserClipMoment[]>([]);
  const [momentsReady, setMomentsReady] = useState(false);
  const [selectedMomentId, setSelectedMomentId] = useState('');
  const [saveState, setSaveState] = useState<'saved' | 'unsaved' | 'unavailable'>('saved');
  const { showToast } = useToast();

  const loadProjects = useCallback(() => setReloadKey(value => value + 1), []);
  useEffect(() => {
    if (!user?.token) { setProjects([]); setLoading(false); return; }
    const controller = new AbortController();
    setLoading(true); setError('');
    projectService.list(user.token, { sort: 'desc' }, controller.signal)
      .then(result => {
        if (!result.success || !result.data) throw new Error(result.message || 'Could not load productions');
        setProjects(result.data.items);
      })
      .catch(reason => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Could not load productions'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [user?.token, reloadKey]);

  const project = useMemo(() => projects.find(item => item.id === selectedProjectId), [projects, selectedProjectId]);
  const editor = KREW_AGENTS.find(agent => agent.role === 'editor');

  useEffect(() => {
    setFile(null);
    setVideoError('');
    setVideoDuration(0);
    setCurrentTime(0);
    setMomentsReady(false);
    setSelectedMomentId('');
    if (!selectedProjectId) { setMoments([]); return; }
    const restored = localMoments(selectedProjectId);
    setMoments(restored);
    setSelectedMomentId(restored[0]?.id || '');
    setMomentsReady(true);
    setSaveState('saved');
  }, [selectedProjectId]);

  useEffect(() => {
    if (!file) { setVideoUrl(''); return; }
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!selectedProjectId || !momentsReady) return;
    try {
      localStorage.setItem(storageKey(selectedProjectId), JSON.stringify(moments));
      setSaveState('saved');
    } catch { setSaveState('unavailable'); }
  }, [selectedProjectId, moments, momentsReady]);

  const chooseProject = (projectId: string) => setSearchParams(projectId ? { projectId } : {});
  const openProduction = () => navigate(project ? `/production?projectId=${encodeURIComponent(project.id)}` : '/production');
  const seek = (time: number) => {
    const bounded = Math.max(0, Math.min(videoDuration, time));
    if (videoRef.current) videoRef.current.currentTime = bounded;
    setCurrentTime(bounded);
  };
  const chooseVideo = (selectedFile?: File) => {
    if (!selectedFile) return;
    setVideoError('');
    setFile(selectedFile);
    setVideoDuration(0);
    setCurrentTime(0);
    setSaveState('saved');
    showToast({ title: 'Local preview ready', message: 'This video stays in your browser session. It has not been uploaded or analyzed.', type: 'info' });
  };
  const addMoment = () => {
    if (!project || !file || !Number.isFinite(videoDuration) || videoDuration <= 0) return;
    const moment: UserClipMoment = { id: makeId(), projectId: project.id, timestamp: currentTime, duration: Math.min(15, Math.max(0.5, videoDuration - currentTime)), description: '', creatorNotes: '', reviewStatus: 'unreviewed' };
    setMoments(current => [...current, moment].sort((a, b) => a.timestamp - b.timestamp));
    setSelectedMomentId(moment.id);
    showToast({ title: 'Moment marker added', message: 'Your marker is saved locally for this project.', type: 'success' });
  };
  const updateMoment = (id: string, changes: Partial<UserClipMoment>) => {
    setMoments(current => current.map(moment => moment.id === id ? { ...moment, ...changes } : moment));
    setSaveState('unsaved');
  };
  const removeMoment = (id: string) => {
    setMoments(current => current.filter(moment => moment.id !== id));
    if (selectedMomentId === id) setSelectedMomentId('');
  };

  return <div className="space-y-6 pb-8 sm:space-y-7">
    <header className="relative isolate overflow-hidden rounded-[1.65rem] bg-krew-bg-secondary px-5 py-7 sm:px-8 sm:py-8"><div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 -z-10 h-64 w-64 rounded-full bg-krew-purple/12 blur-[90px]"/><div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="krew-meta mb-2 flex items-center gap-2"><Scissors className="h-4 w-4 text-krew-rose"/>THE EDITOR’S WORKSPACE</p><h1 className="font-display text-3xl font-semibold tracking-tight text-krew-text-primary sm:text-4xl">Clip Intelligence</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-krew-text-secondary">Review your own footage, mark moments, and prepare notes. Automated video intelligence is reserved for the live hackathon sprint.</p></div><Button variant="secondary" onClick={openProduction} leftIcon={<ArrowLeft className="h-4 w-4"/>}>Back to Production Studio</Button></div></header>

    {loading ? <div role="status" className="space-y-3"><div className="h-24 animate-pulse rounded-2xl bg-krew-surface"/><div className="h-72 animate-pulse rounded-2xl bg-krew-surface"/><span className="sr-only">Loading your productions</span></div> : error ? <section role="alert" className="rounded-2xl bg-krew-surface p-6"><h2 className="font-display text-lg font-semibold text-krew-text-primary">Projects could not load</h2><p className="mt-2 text-sm text-krew-text-secondary">{error}</p><Button className="mt-4" variant="secondary" onClick={loadProjects}>Retry</Button></section> : projects.length === 0 ? <section className="rounded-2xl bg-krew-surface px-6 py-12 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-krew-purple/15 text-krew-lavender"><Clapperboard className="h-5 w-5"/></span><h2 className="mt-4 font-display text-xl font-semibold text-krew-text-primary">Create a production to begin</h2><p className="mx-auto mt-2 max-w-md text-sm text-krew-text-secondary">Clip notes and local video previews are organized within a project. Your project library is currently empty.</p><Button className="mt-5" onClick={() => navigate('/production')}>Open Production Studio</Button></section> : <>
      <section className="flex flex-col gap-4 rounded-2xl bg-krew-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div className="min-w-0"><p className="krew-meta">PROJECT CONTEXT</p>{project ? <><h2 className="mt-1 truncate font-display text-lg font-semibold text-krew-text-primary">{project.title}</h2><p className="mt-1 truncate text-xs text-krew-text-muted">{project.status.replace('_', ' ')} · {project.targetPlatforms.join(' · ') || 'No platforms selected'}</p></> : <p className="mt-1 text-sm text-krew-text-secondary">Select a production to keep its moments and notes organized.</p>}</div><div className="flex flex-col gap-2 sm:min-w-64 sm:flex-row sm:items-center"><label className="sr-only" htmlFor="clip-project-select">Select production</label><select id="clip-project-select" value={selectedProjectId} onChange={event => chooseProject(event.target.value)} className="krew-focus min-h-11 min-w-0 flex-1 rounded-xl bg-krew-bg-secondary px-3 text-sm text-krew-text-primary"><option value="">Choose a production…</option>{projects.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select>{project && <Button size="sm" variant="ghost" onClick={openProduction}>Project details</Button>}</div></section>

      {selectedProjectId && !project ? <section role="alert" className="rounded-2xl bg-krew-surface p-6"><h2 className="font-display text-lg font-semibold text-krew-text-primary">Production not found</h2><p className="mt-2 text-sm text-krew-text-secondary">This project is not available in the current session. Choose another project or return to the studio.</p><Button className="mt-4" variant="secondary" onClick={() => chooseProject('')}>Choose another production</Button></section> : !project ? <section className="rounded-2xl bg-krew-surface px-6 py-10 text-center"><span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-krew-cyan/10 text-krew-cyan"><FileVideo2 className="h-5 w-5"/></span><h2 className="mt-4 font-display text-lg font-semibold text-krew-text-primary">Choose a production to begin</h2><p className="mx-auto mt-2 max-w-md text-sm text-krew-text-secondary">Select a project above. Its local video preview and user-created moment notes stay scoped to that production.</p></section> : <>
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(17rem,.65fr)]">
          <section className="min-w-0 space-y-4">
            <section className="overflow-hidden rounded-2xl bg-krew-surface p-3 sm:p-4"><div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div><p className="krew-meta">LOCAL VIDEO PREVIEW</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Review your source footage</h2></div>{file && <div className="flex items-center gap-2"><span className="max-w-40 truncate font-mono text-[10px] text-krew-text-muted sm:max-w-64">{file.name}</span><button type="button" aria-label="Remove selected video" onClick={() => { setFile(null); setVideoDuration(0); setCurrentTime(0); }} className="rounded-lg p-2 text-krew-text-muted hover:bg-white/[0.06] hover:text-krew-text-primary">×</button></div>}</div>
              <div className="relative aspect-video min-h-48 overflow-hidden rounded-xl bg-[#050507] sm:min-h-72">{videoUrl ? <video ref={videoRef} key={videoUrl} src={videoUrl} controls playsInline preload="metadata" className="h-full w-full object-contain" onLoadedMetadata={event => { const duration = event.currentTarget.duration; if (Number.isFinite(duration)) setVideoDuration(duration); }} onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)} onDurationChange={event => { const duration = event.currentTarget.duration; if (Number.isFinite(duration)) setVideoDuration(duration); }} onError={() => setVideoError('This local video could not be previewed by your browser. Try a supported video format.')} /> : <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-krew-cyan"><FileVideo2 className="h-6 w-6"/></span><h3 className="mt-4 font-display text-lg font-semibold text-krew-text-primary">No video selected</h3><p className="mt-2 max-w-sm text-xs leading-relaxed text-krew-text-muted">Choose a local video to preview it in this browser. The file is not uploaded, stored, or analyzed.</p><Button className="mt-4" variant="secondary" onClick={() => fileInputRef.current?.click()} leftIcon={<Upload className="h-4 w-4"/>}>Select local video</Button></div>}</div>
              {videoError && <p role="alert" className="mt-3 rounded-lg bg-krew-status-error/10 px-3 py-2 text-xs text-krew-status-error">{videoError}</p>}
              <input ref={fileInputRef} type="file" accept="video/*" className="sr-only" aria-label="Select local video file" onChange={event => chooseVideo(event.target.files?.[0])}/>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs text-krew-text-secondary"><Clock3 className="h-4 w-4 text-krew-cyan"/><span className="font-mono">{formatTime(currentTime)} / {videoDuration ? formatTime(videoDuration) : '--:--'}</span></div><div className="flex flex-wrap gap-2"><Button size="sm" variant="ghost" onClick={() => fileInputRef.current?.click()} leftIcon={<Upload className="h-4 w-4"/>}>{file ? 'Choose another video' : 'Browse video'}</Button><Button size="sm" onClick={addMoment} disabled={!file || !videoDuration} leftIcon={<BookmarkPlus className="h-4 w-4"/>}>Mark this moment</Button></div></div>
            </section>

            <section className="rounded-2xl bg-krew-surface p-4 sm:p-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="krew-meta">USER-DEFINED MOMENTS</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Timeline</h2></div><p className="text-[10px] text-krew-text-muted">{file && videoDuration ? `Source duration · ${formatTime(videoDuration)}` : 'Select a video to enable timeline markers'}</p></div>
              {file && videoDuration > 0 ? <><div className="mt-5"><div className="flex justify-between px-1 font-mono text-[9px] text-krew-text-muted">{Array.from({ length: 6 }, (_, index) => <span key={index}>{formatTime(videoDuration * index / 5)}</span>)}</div><div className="relative mt-2 h-16 rounded-lg bg-krew-bg-secondary" role="img" aria-label={`Video timeline, ${moments.length} user-created markers`}><div aria-hidden="true" className="absolute inset-x-2 top-1/2 h-px bg-white/10"/>{moments.map(moment => <button key={moment.id} type="button" aria-label={`Moment at ${formatTime(moment.timestamp)}${moment.description ? `: ${moment.description}` : ''}`} onClick={() => { setSelectedMomentId(moment.id); seek(moment.timestamp); }} className={`absolute top-2 h-12 w-2 -translate-x-1/2 rounded-full transition-colors ${moment.id === selectedMomentId ? 'bg-krew-cyan shadow-[0_0_14px_rgba(56,189,248,.55)]' : moment.reviewStatus === 'keep' ? 'bg-krew-status-success' : moment.reviewStatus === 'discard' ? 'bg-krew-status-error' : 'bg-krew-purple hover:bg-krew-lavender'}`} style={{ left: `${Math.min(100, Math.max(0, moment.timestamp / videoDuration * 100))}%` }}/>) }<div aria-hidden="true" className="absolute bottom-0 top-0 w-px bg-white" style={{ left: `${Math.min(100, currentTime / videoDuration * 100)}%` }}/></div><input type="range" aria-label="Seek video" min="0" max={videoDuration} step="0.1" value={Math.min(currentTime, videoDuration)} onChange={event => seek(Number(event.target.value))} className="mt-3 min-h-6 w-full accent-krew-cyan"/></div></> : <div className="mt-4 rounded-xl bg-krew-bg-secondary px-4 py-5 text-center"><p className="text-xs text-krew-text-muted">Timeline and time markers appear after a local video is selected.</p></div>}
              {moments.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{moments.slice().sort((a, b) => a.timestamp - b.timestamp).map(moment => <button key={moment.id} type="button" onClick={() => { setSelectedMomentId(moment.id); if (videoDuration) seek(moment.timestamp); }} className={`rounded-lg px-2.5 py-2 font-mono text-[10px] transition-colors ${moment.id === selectedMomentId ? 'bg-krew-cyan/15 text-krew-cyan' : 'bg-krew-bg-secondary text-krew-text-secondary hover:text-krew-text-primary'}`}>{formatTime(moment.timestamp)} · {moment.description || 'Untitled moment'}</button>)}</div>}
            </section>

            <section className="rounded-2xl bg-krew-surface p-4 sm:p-5"><div className="flex items-end justify-between gap-3"><div><p className="krew-meta">CREATOR REVIEW</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Key moments</h2></div><span className="font-mono text-[10px] text-krew-text-muted">{moments.length} {moments.length === 1 ? 'MARKER' : 'MARKERS'}</span></div>
              {!file ? <div className="mt-4 rounded-xl bg-krew-bg-secondary p-5 text-center"><p className="text-sm text-krew-text-secondary">Select a local video before adding timestamped moments.</p></div> : moments.length === 0 ? <div className="mt-4 rounded-xl bg-krew-bg-secondary p-5 text-center"><p className="text-sm text-krew-text-secondary">No moments marked yet.</p><p className="mt-1 text-xs text-krew-text-muted">Play or scrub your footage, then mark a moment to add your own description and notes.</p><Button className="mt-4" size="sm" variant="secondary" disabled={!videoDuration} onClick={addMoment} leftIcon={<Plus className="h-4 w-4"/>}>Add moment at current time</Button></div> : <div className="mt-4 space-y-3">{moments.slice().sort((a, b) => a.timestamp - b.timestamp).map(moment => <article key={moment.id} className={`rounded-xl p-4 transition-colors ${moment.id === selectedMomentId ? 'bg-krew-cyan/[0.07] ring-1 ring-krew-cyan/30' : 'bg-krew-bg-secondary'}`}><div className="flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={() => { setSelectedMomentId(moment.id); seek(moment.timestamp); }} className="font-mono text-xs text-krew-cyan hover:text-krew-text-primary">{formatTime(moment.timestamp)} <span aria-hidden="true">↗</span></button><div className="flex items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[10px] ${statusStyles[moment.reviewStatus]}`}>{statusNames[moment.reviewStatus]}</span><button type="button" aria-label="Remove moment" onClick={() => removeMoment(moment.id)} className="rounded-lg p-2 text-krew-text-muted hover:bg-white/[0.06] hover:text-krew-status-error"><Trash2 className="h-3.5 w-3.5"/></button></div></div><div className="mt-3 grid gap-3 sm:grid-cols-[1fr_8rem]"><Input label="Moment description" maxLength={300} value={moment.description} onChange={event => updateMoment(moment.id, { description: event.target.value })} placeholder="Describe what you noticed"/><Input label="Clip length (sec)" type="number" min="0.5" max={Math.max(0.5, videoDuration - moment.timestamp)} step="0.5" value={moment.duration} onChange={event => updateMoment(moment.id, { duration: Math.max(0.5, Math.min(videoDuration - moment.timestamp, Number(event.target.value) || 0.5)) })}/></div><div className="mt-3 grid gap-3 sm:grid-cols-[1fr_10rem]"><Textarea label="Creator notes" maxLength={2000} rows={2} value={moment.creatorNotes} onChange={event => updateMoment(moment.id, { creatorNotes: event.target.value })} placeholder="Personal review notes…"/><label className="block space-y-1.5 text-xs font-medium text-krew-text-secondary">Review status<select value={moment.reviewStatus} onChange={event => updateMoment(moment.id, { reviewStatus: event.target.value as ClipMomentReviewStatus })} className="krew-focus min-h-11 w-full rounded-xl bg-krew-surface px-3 text-sm text-krew-text-primary"><option value="unreviewed">Unreviewed</option><option value="keep">Keep</option><option value="discard">Discard</option></select></label></div></article>)}</div>}
              <p className="mt-4 text-[10px] leading-relaxed text-krew-text-muted">Moment timestamps, notes, and review choices are saved locally in this browser under this project. They are not sent to the backend or interpreted as AI findings. {saveState === 'saved' ? 'Saved on this device.' : saveState === 'unavailable' ? 'Browser storage is unavailable; edits remain in this session only.' : 'Saving locally…'}</p>
            </section>
          </section>

          <aside className="space-y-5">
            <section className="rounded-2xl bg-krew-surface p-5"><div className="flex items-start justify-between gap-3"><div><p className="krew-meta">ANALYSIS WORKSPACE</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">Clip insights</h2></div><WandSparkles className="h-5 w-5 text-krew-lavender"/></div><div className="mt-4 rounded-xl bg-krew-bg-secondary p-4"><Badge variant="neutral">Awaiting AI integration</Badge><p className="mt-3 text-sm leading-relaxed text-krew-text-secondary">No video analysis has been performed. There are no detected highlights, hooks, engagement estimates, or suggested clips to show.</p></div><ul className="mt-4 space-y-2 text-xs text-krew-text-muted"><li className="flex gap-2"><span className="text-krew-purple">01</span>Highlight detection — reserved</li><li className="flex gap-2"><span className="text-krew-purple">02</span>Hook and context analysis — reserved</li><li className="flex gap-2"><span className="text-krew-purple">03</span>Clip suggestions and quality signals — reserved</li></ul><p className="mt-4 border-t border-white/[0.06] pt-3 text-[10px] leading-relaxed text-krew-text-muted">All automated video intelligence is RESERVED FOR LIVE HACKATHON SPRINT.</p></section>

            {editor && <section className="overflow-hidden rounded-2xl bg-krew-surface"><AgentPortrait agent={editor} className="aspect-[16/8]"/><div className="p-5"><p className="krew-meta">FEATURED CREW MEMBER · 03</p><h2 className="mt-1 font-display text-xl font-semibold text-krew-text-primary">The Editor</h2><p className="mt-1 text-xs text-krew-rose">Video Intelligence Agent</p><p className="mt-3 text-sm leading-relaxed text-krew-text-secondary">{editor.tagline}</p><ul className="mt-4 space-y-2">{editor.responsibilities.map(responsibility => <li key={responsibility} className="flex gap-2 text-xs leading-relaxed text-krew-text-muted"><span className="text-krew-rose">·</span>{responsibility}</li>)}</ul><p className="mt-4 rounded-xl bg-krew-status-warning/10 px-3 py-2.5 text-[10px] leading-relaxed text-krew-status-warning">Autonomous video analysis is reserved for the live hackathon sprint. The Editor is not processing footage here.</p></div></section>}

            <section className="rounded-2xl bg-krew-surface p-5"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-krew-purple/15 text-krew-lavender"><Film className="h-4 w-4"/></span><div><p className="krew-meta">SESSION DETAILS</p><p className="mt-1 text-xs text-krew-text-primary">Browser-local preview only</p></div></div><p className="mt-3 text-[10px] leading-relaxed text-krew-text-muted">The selected video is previewed from a temporary browser URL. It is removed from the page when you switch projects or leave this workspace.</p></section>
          </aside>
        </div>
      </>}
    </>}
  </div>;
};
