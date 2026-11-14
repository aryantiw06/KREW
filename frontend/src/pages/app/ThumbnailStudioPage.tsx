import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Eye, EyeOff, ImagePlus, Layers3, Palette, Plus, Save, Type, Undo2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCreatorDna } from '../../contexts/CreatorDnaContext';
import { projectService } from '../../services/projectService';
import { ContentProject } from '../../types/project.types';
import { ThumbnailAspectRatio, ThumbnailTextLayer, ThumbnailVersion, ThumbnailWorkspaceData } from '../../types/thumbnail.types';
import { KREW_AGENTS } from '../../data/agents';
import { AgentPortrait } from '../../components/agents/AgentPortrait';
import { ThumbnailCanvas } from '../../components/thumbnails/ThumbnailCanvas';
import { ThumbnailLayerControls } from '../../components/thumbnails/ThumbnailLayerControls';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../hooks/useToast';

const aspects: ThumbnailAspectRatio[] = ['16:9', '1:1', '9:16'];
const isHex = (value: string) => /^#[\da-f]{6}$/i.test(value);
const colorOr = (value: string | undefined, fallback: string) => value && isHex(value) ? value : fallback;
const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const fontFromPreference = (preference: string) => preference.toLowerCase().includes('space') ? 'Space Grotesk' : preference.toLowerCase().includes('plex') ? 'IBM Plex Mono' : 'Inter';
const createVersion = (name: string, primaryColor: string): ThumbnailVersion => {
  const now = new Date().toISOString();
  return { id: makeId(), name, aspectRatio: '16:9', backgroundColor: primaryColor, backgroundAssetName: '', textLayers: [], createdAt: now, updatedAt: now };
};
const makeWorkspace = (profileColors: { primary: string; secondary: string; accent: string }): ThumbnailWorkspaceData => ({
  activeVersionId: '',
  versions: [],
  brandColors: { primary: colorOr(profileColors.primary, '#09090D'), secondary: colorOr(profileColors.secondary, '#201F2A'), accent: colorOr(profileColors.accent, '#A855F7') }
});
const safeWorkspace = (value: ThumbnailWorkspaceData | undefined, dnaColors: { primary: string; secondary: string; accent: string }): ThumbnailWorkspaceData => {
  if (value?.versions?.length && value.versions.some(version => version.id === value.activeVersionId)) return value;
  const workspace = makeWorkspace(dnaColors);
  const first = createVersion('Version 1', workspace.brandColors.primary);
  return { ...workspace, activeVersionId: first.id, versions: [first] };
};
interface CachedWorkspace { baselineUpdatedAt: string; workspace: ThumbnailWorkspaceData; }
const cacheKey = (projectId: string) => `krew_thumbnail_workspace_draft_${projectId}`;
const readCache = (project: ContentProject): ThumbnailWorkspaceData | null => {
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey(project.id)) || 'null') as CachedWorkspace | null;
    return cached?.baselineUpdatedAt === project.updatedAt && cached.workspace ? cached.workspace : null;
  } catch { return null; }
};

export const ThumbnailStudioPage: React.FC = () => {
  const { user } = useAuth();
  const { profile } = useCreatorDna();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProjectId = searchParams.get('projectId') || '';
  const [projects, setProjects] = useState<ContentProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [workspace, setWorkspace] = useState<ThumbnailWorkspaceData | null>(null);
  const [savedWorkspace, setSavedWorkspace] = useState<ThumbnailWorkspaceData | null>(null);
  const [workspaceProjectId, setWorkspaceProjectId] = useState('');
  const [selectedLayerId, setSelectedLayerId] = useState('');
  const [filesByVersion, setFilesByVersion] = useState<Record<string, File>>({});
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [localDraftStatus, setLocalDraftStatus] = useState<'saved' | 'unavailable'>('saved');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
  const cinematographer = KREW_AGENTS.find(agent => agent.role === 'cinematographer');
  const currentVersion = workspace?.versions.find(version => version.id === workspace.activeVersionId);
  const activeFile = currentVersion ? filesByVersion[currentVersion.id] : undefined;
  const activeImageUrl = currentVersion ? imageUrls[currentVersion.id] : undefined;
  const isDirty = Boolean(workspace && JSON.stringify(workspace) !== JSON.stringify(savedWorkspace));
  const validWorkspace = Boolean(workspace?.versions.length && workspace.versions.length <= 12 && workspace.versions.every(version => version.name.trim().length > 0 && version.name.length <= 80));
  const selectedLayer = currentVersion?.textLayers.find(layer => layer.id === selectedLayerId);

  useEffect(() => {
    if (!project) { setWorkspace(null); setSavedWorkspace(null); setWorkspaceProjectId(''); return; }
    const remote = project.thumbnailWorkspace || null;
    const initial = safeWorkspace(remote || undefined, profile.visualIdentity.brandColors);
    const cached = readCache(project);
    setWorkspace(cached || initial);
    setSavedWorkspace(remote);
    setWorkspaceProjectId(project.id);
    setSaveError('');
    setLocalDraftStatus('saved');
  }, [project?.id, project?.updatedAt]);

  useEffect(() => {
    setFilesByVersion({});
    setSelectedLayerId('');
  }, [project?.id]);

  useEffect(() => {
    const urls: Record<string, string> = {};
    Object.entries(filesByVersion).forEach(([versionId, file]) => { urls[versionId] = URL.createObjectURL(file); });
    setImageUrls(urls);
    return () => Object.values(urls).forEach(url => URL.revokeObjectURL(url));
  }, [filesByVersion]);

  useEffect(() => {
    if (!workspace || !project || workspaceProjectId !== project.id || !isDirty) return;
    try {
      localStorage.setItem(cacheKey(project.id), JSON.stringify({ baselineUpdatedAt: project.updatedAt, workspace } satisfies CachedWorkspace));
      setLocalDraftStatus('saved');
    } catch { setLocalDraftStatus('unavailable'); }
  }, [workspace, project, workspaceProjectId, isDirty]);

  useEffect(() => {
    if (!isDirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [isDirty]);

  const changeProject = (nextId: string) => {
    if (isDirty && !window.confirm('Switch production? Your unsaved edits will be kept as a local draft for this project.')) return;
    setSearchParams(nextId ? { projectId: nextId } : {});
  };
  const leaveStudio = () => {
    if (isDirty && !window.confirm('Leave Thumbnail Studio? Your unsaved edits will remain as a local draft on this device.')) return;
    navigate(project ? `/production?projectId=${encodeURIComponent(project.id)}` : '/production');
  };
  const updateWorkspace = (updater: (current: ThumbnailWorkspaceData) => ThumbnailWorkspaceData) => setWorkspace(current => current ? updater(current) : current);
  const updateVersion = (versionId: string, changes: Partial<ThumbnailVersion>) => updateWorkspace(current => ({
    ...current,
    versions: current.versions.map(version => version.id === versionId ? { ...version, ...changes, updatedAt: new Date().toISOString() } : version)
  }));
  const updateLayer = (layerId: string, changes: Partial<ThumbnailTextLayer>) => {
    if (!currentVersion) return;
    updateVersion(currentVersion.id, { textLayers: currentVersion.textLayers.map(layer => layer.id === layerId ? { ...layer, ...changes } : layer) });
  };
  const moveLayer = (layerId: string, direction: 'up' | 'down') => {
    if (!currentVersion) return;
    const ordered = currentVersion.textLayers.slice().sort((a, b) => a.order - b.order);
    const index = ordered.findIndex(layer => layer.id === layerId);
    const targetIndex = direction === 'up' ? index + 1 : index - 1;
    if (index < 0 || targetIndex < 0 || targetIndex >= ordered.length) return;
    const current = ordered[index];
    const target = ordered[targetIndex];
    const layers = currentVersion.textLayers.map(layer => layer.id === current.id ? { ...layer, order: target.order } : layer.id === target.id ? { ...layer, order: current.order } : layer);
    updateVersion(currentVersion.id, { textLayers: layers });
  };
  const addLayer = (role: ThumbnailTextLayer['role']) => {
    if (!currentVersion || currentVersion.textLayers.length >= 8) return;
    const layer: ThumbnailTextLayer = {
      id: makeId(), role, text: '', x: 8, y: role === 'headline' ? 56 : role === 'subtitle' ? 78 : 42,
      width: 84, fontSize: role === 'headline' ? 72 : role === 'subtitle' ? 30 : 36,
      color: '#FFFFFF', align: 'left', fontFamily: fontFromPreference(profile.visualIdentity.fontPreference), bold: role !== 'subtitle', visible: true,
      order: currentVersion.textLayers.length
    };
    updateVersion(currentVersion.id, { textLayers: [...currentVersion.textLayers, layer] });
    setSelectedLayerId(layer.id);
  };
  const removeLayer = (layerId: string) => {
    if (!currentVersion) return;
    updateVersion(currentVersion.id, { textLayers: currentVersion.textLayers.filter(layer => layer.id !== layerId).map((layer, index) => ({ ...layer, order: index })) });
    if (selectedLayerId === layerId) setSelectedLayerId('');
  };
  const createNewVersion = () => {
    if (!workspace || !currentVersion || workspace.versions.length >= 12) return;
    const id = makeId();
    const now = new Date().toISOString();
    const version: ThumbnailVersion = { ...currentVersion, id, name: `Version ${workspace.versions.length + 1}`, textLayers: currentVersion.textLayers.map(layer => ({ ...layer, id: makeId() })), createdAt: now, updatedAt: now };
    updateWorkspace(current => ({ ...current, activeVersionId: id, versions: [...current.versions, version] }));
    if (activeFile) setFilesByVersion(current => ({ ...current, [id]: activeFile }));
    setSelectedLayerId('');
  };
  const setAsset = (file?: File) => {
    if (!file || !currentVersion) return;
    if (!file.type.startsWith('image/')) { setSaveError('Choose a valid image file.'); return; }
    setSaveError('');
    setFilesByVersion(current => ({ ...current, [currentVersion.id]: file }));
    updateVersion(currentVersion.id, { backgroundAssetName: file.name });
  };
  const clearAsset = () => {
    if (!currentVersion) return;
    setFilesByVersion(current => { const next = { ...current }; delete next[currentVersion.id]; return next; });
    updateVersion(currentVersion.id, { backgroundAssetName: '' });
  };
  const changeBrandColor = (key: keyof ThumbnailWorkspaceData['brandColors'], color: string) => updateWorkspace(current => ({ ...current, brandColors: { ...current.brandColors, [key]: color } }));
  const discardChanges = () => {
    if (!project || !workspace || !isDirty || !window.confirm('Discard the unsaved design changes?')) return;
    try { localStorage.removeItem(cacheKey(project.id)); } catch { /* In-memory state is still reset below. */ }
    const reset = safeWorkspace(project.thumbnailWorkspace, profile.visualIdentity.brandColors);
    setWorkspace(reset);
    setSavedWorkspace(project.thumbnailWorkspace || null);
    setFilesByVersion({});
    setSelectedLayerId('');
  };
  const saveWorkspace = async () => {
    if (!user?.token || !project || !workspace || !validWorkspace) return;
    setSaving(true); setSaveError('');
    try {
      const result = await projectService.update(user.token, project.id, { thumbnailWorkspace: workspace });
      if (!result.success || !result.data) throw new Error(result.message || 'Could not save thumbnail workspace');
      const savedProject = result.data.project;
      const saved = savedProject.thumbnailWorkspace || workspace;
      try { localStorage.removeItem(cacheKey(project.id)); } catch { /* Backend remains the saved source. */ }
      setProjects(current => current.map(item => item.id === project.id ? savedProject : item));
      setWorkspace(saved);
      setSavedWorkspace(saved);
      setSaveError('');
      showToast({ title: 'Design saved', message: 'Version metadata and typography are saved to this production.', type: 'success' });
    } catch (reason) { setSaveError(reason instanceof Error ? reason.message : 'Could not save thumbnail workspace'); }
    finally { setSaving(false); }
  };

  return <div className="space-y-6 pb-8 sm:space-y-7">
    <header className="relative isolate overflow-hidden rounded-[1.65rem] bg-krew-bg-secondary px-5 py-7 sm:px-8 sm:py-8"><div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 -z-10 h-64 w-64 rounded-full bg-krew-purple/12 blur-[90px]"/><div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="krew-meta mb-2 flex items-center gap-2"><Palette className="h-4 w-4 text-krew-lavender"/>VISUAL PRODUCTION WORKSPACE</p><h1 className="font-display text-3xl font-semibold tracking-tight text-krew-text-primary sm:text-4xl">Thumbnail Studio</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-krew-text-secondary">Shape the frame, hierarchy, and brand language yourself. Image generation and AI composition are reserved for the live hackathon sprint.</p></div><Button variant="secondary" onClick={leaveStudio} leftIcon={<ArrowLeft className="h-4 w-4"/>}>Back to Production Studio</Button></div></header>

    {loading ? <div role="status" className="space-y-3"><div className="h-20 animate-pulse rounded-2xl bg-krew-surface"/><div className="h-96 animate-pulse rounded-2xl bg-krew-surface"/><span className="sr-only">Loading your productions</span></div> : error ? <section role="alert" className="rounded-2xl bg-krew-surface p-6"><h2 className="font-display text-lg font-semibold text-krew-text-primary">Project library unavailable</h2><p className="mt-2 text-sm text-krew-text-secondary">{error}</p><Button className="mt-4" variant="secondary" onClick={loadProjects}>Retry</Button></section> : projects.length === 0 ? <section className="rounded-2xl bg-krew-surface px-6 py-12 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-krew-purple/15 text-krew-lavender"><Layers3 className="h-5 w-5"/></span><h2 className="mt-4 font-display text-xl font-semibold text-krew-text-primary">Start with a production</h2><p className="mx-auto mt-2 max-w-md text-sm text-krew-text-secondary">Thumbnail versions belong to a production. Create a project in Production Studio to begin a design.</p><Button className="mt-5" onClick={() => navigate('/production')}>Open Production Studio</Button></section> : <>
      <section className="flex flex-col gap-4 rounded-2xl bg-krew-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div className="min-w-0"><p className="krew-meta">PROJECT CANVAS</p>{project ? <><h2 className="mt-1 truncate font-display text-lg font-semibold text-krew-text-primary">{project.title}</h2><p className="mt-1 text-xs text-krew-text-muted">{project.status.replace('_', ' ')} · Updated {new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(project.updatedAt))}</p></> : <p className="mt-1 text-sm text-krew-text-secondary">Choose a project to create project-specific visual drafts.</p>}</div><div className="flex flex-col gap-2 sm:min-w-64 sm:flex-row sm:items-center"><label className="sr-only" htmlFor="thumbnail-project-select">Select production</label><select id="thumbnail-project-select" value={selectedProjectId} onChange={event => changeProject(event.target.value)} className="krew-focus min-h-11 min-w-0 flex-1 rounded-xl bg-krew-bg-secondary px-3 text-sm text-krew-text-primary"><option value="">Choose a production…</option>{projects.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select>{project && <Button size="sm" variant="ghost" onClick={leaveStudio}>Project details</Button>}</div></section>

      {selectedProjectId && !project ? <section role="alert" className="rounded-2xl bg-krew-surface p-6"><h2 className="font-display text-lg font-semibold text-krew-text-primary">Production not found</h2><p className="mt-2 text-sm text-krew-text-secondary">Choose another production or return to the project library.</p><Button className="mt-4" variant="secondary" onClick={() => changeProject('')}>Choose another production</Button></section> : !project ? <section className="rounded-2xl bg-krew-surface px-6 py-10 text-center"><h2 className="font-display text-lg font-semibold text-krew-text-primary">Choose a production to begin</h2><p className="mt-2 text-sm text-krew-text-secondary">Each project's thumbnail drafts and versions are saved separately.</p></section> : workspaceProjectId !== project.id ? <div role="status" className="h-72 animate-pulse rounded-2xl bg-krew-surface"><span className="sr-only">Loading this project’s thumbnail workspace</span></div> : workspace && currentVersion && <>
        {(saveError) && <div role="alert" className="rounded-xl bg-krew-status-error/10 px-4 py-3 text-sm text-krew-status-error">{saveError}</div>}
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(18rem,.65fr)]">
          <section className="min-w-0 space-y-5">
            <section className="rounded-2xl bg-krew-surface p-4 sm:p-5"><div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div className="min-w-0"><p className="krew-meta">ACTIVE COMPOSITION</p><div className="mt-1 flex flex-wrap items-center gap-3"><Input aria-label="Version name" value={currentVersion.name} maxLength={80} onChange={event => updateVersion(currentVersion.id, { name: event.target.value })} className="max-w-56 border-0 bg-transparent px-0 py-1 font-display text-base font-semibold text-krew-text-primary shadow-none"/><span className={`inline-flex items-center gap-1.5 text-[10px] ${isDirty ? 'text-krew-status-warning' : 'text-krew-status-success'}`}><span className={`h-1.5 w-1.5 rounded-full ${isDirty ? 'bg-krew-status-warning' : 'bg-krew-status-success'}`}/>{isDirty ? 'Unsaved changes' : 'Saved to project'}</span></div></div><div className="flex flex-wrap gap-2"><Button size="sm" variant="ghost" disabled={!isDirty} onClick={discardChanges} leftIcon={<Undo2 className="h-4 w-4"/>}>Discard edits</Button><Button size="sm" onClick={() => void saveWorkspace()} disabled={!isDirty || !validWorkspace || saving} isLoading={saving} leftIcon={<Save className="h-4 w-4"/>}>Save design</Button></div></div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-1 rounded-xl bg-krew-bg-secondary p-1">{aspects.map(aspect => <button key={aspect} type="button" aria-pressed={currentVersion.aspectRatio === aspect} onClick={() => updateVersion(currentVersion.id, { aspectRatio: aspect })} className={`min-h-9 rounded-lg px-3 font-mono text-[10px] transition-colors ${currentVersion.aspectRatio === aspect ? 'bg-krew-purple text-white' : 'text-krew-text-muted hover:text-krew-text-primary'}`}>{aspect}{aspect === '16:9' ? ' · Widescreen' : ''}</button>)}</div><p className="font-mono text-[10px] text-krew-text-muted">{currentVersion.aspectRatio} · {currentVersion.name}</p></div>
              <div className={`relative mx-auto w-full overflow-hidden rounded-xl bg-krew-bg-secondary shadow-2xl ring-1 ring-white/[0.07] ${currentVersion.aspectRatio === '9:16' ? 'max-w-[420px]' : 'max-w-5xl'}`}><ThumbnailCanvas version={currentVersion} imageUrl={activeImageUrl} brandColors={workspace.brandColors} selectedLayerId={selectedLayerId} onSelectLayer={setSelectedLayerId}/></div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs text-krew-text-secondary"><ImagePlus className="h-4 w-4 text-krew-cyan"/>{activeFile ? <><span className="max-w-64 truncate">{activeFile.name}</span><span className="text-krew-text-muted">· local preview only</span></> : currentVersion.backgroundAssetName ? <span className="text-krew-status-warning">{currentVersion.backgroundAssetName} · reselect to preview</span> : <span>No background image</span>}</div><div className="flex gap-2"><input ref={fileInputRef} type="file" accept="image/*" className="sr-only" aria-label="Select local image asset" onChange={event => { setAsset(event.target.files?.[0]); event.currentTarget.value = ''; }}/><Button size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()}>{activeFile ? 'Replace image' : 'Add local image'}</Button>{activeFile && <Button size="sm" variant="ghost" onClick={clearAsset}>Remove</Button>}</div></div><p className="mt-2 text-[10px] leading-relaxed text-krew-text-muted">Local image previews use a temporary browser URL and are not uploaded. The saved version stores the filename only; reselect the image to preview it after returning.</p>
            </section>

            <section className="rounded-2xl bg-krew-surface p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="krew-meta">VERSION HISTORY</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Design versions</h2></div><Button size="sm" variant="secondary" disabled={workspace.versions.length >= 12} onClick={createNewVersion} leftIcon={<Plus className="h-4 w-4"/>}>New version</Button></div><p className="mt-1 text-[10px] text-krew-text-muted">Saved versions are project metadata. Select a version to edit or compare its composition.</p><div className="mt-4 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">{workspace.versions.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(version => <button key={version.id} type="button" onClick={() => { updateWorkspace(current => ({ ...current, activeVersionId: version.id })); setSelectedLayerId(''); }} className={`min-w-0 overflow-hidden rounded-xl text-left transition-colors ${version.id === currentVersion.id ? 'bg-krew-purple/10 ring-1 ring-krew-purple/60' : 'bg-krew-bg-secondary hover:bg-krew-surface-elevated'}`}><ThumbnailCanvas compact version={version} imageUrl={imageUrls[version.id]} brandColors={workspace.brandColors}/><span className="flex items-center justify-between gap-2 p-3"><span className="truncate text-xs font-medium text-krew-text-primary">{version.name}</span><span className="font-mono text-[9px] text-krew-text-muted">{version.aspectRatio}</span></span></button>)}</div></section>
          </section>

          <aside className="space-y-5">
            <section className="rounded-2xl bg-krew-surface p-4 sm:p-5"><div className="flex items-center justify-between gap-3"><div><p className="krew-meta">CANVAS LAYERS</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Build your hierarchy</h2></div><Layers3 className="h-4 w-4 text-krew-lavender"/></div><div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="secondary" onClick={() => addLayer('headline')} disabled={currentVersion.textLayers.length >= 8} leftIcon={<Plus className="h-3.5 w-3.5"/>}>Headline</Button><Button size="sm" variant="secondary" onClick={() => addLayer('subtitle')} disabled={currentVersion.textLayers.length >= 8} leftIcon={<Plus className="h-3.5 w-3.5"/>}>Subtitle</Button><Button size="sm" variant="ghost" onClick={() => addLayer('custom')} disabled={currentVersion.textLayers.length >= 8} leftIcon={<Plus className="h-3.5 w-3.5"/>}>Text</Button></div><div className="mt-4"><ThumbnailLayerControls layers={currentVersion.textLayers} selectedId={selectedLayerId} onSelect={setSelectedLayerId} onChange={updateLayer} onMove={moveLayer} onRemove={removeLayer}/></div>{selectedLayer && !selectedLayer.visible && <p className="mt-3 flex items-center gap-2 text-[10px] text-krew-text-muted"><EyeOff className="h-3.5 w-3.5"/>Selected layer is hidden from the canvas.</p>}{selectedLayer?.visible && <p className="mt-3 flex items-center gap-2 text-[10px] text-krew-text-muted"><Eye className="h-3.5 w-3.5"/>Select layer text on the canvas or adjust position below.</p>}</section>

            <section className="rounded-2xl bg-krew-surface p-4 sm:p-5"><div><p className="krew-meta">BRAND IDENTITY</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Project palette</h2><p className="mt-1 text-[10px] text-krew-text-muted">Starts from Creator DNA; saved with this project and shared by its versions.</p></div><div className="mt-4 space-y-3">{(['primary', 'secondary', 'accent'] as const).map(key => <div key={key} className="flex items-center gap-3"><Input label={`${key} colour`} type="color" value={workspace.brandColors[key]} onChange={event => changeBrandColor(key, event.target.value)} className="h-10 w-14 cursor-pointer p-1"/><span className="font-mono text-[10px] uppercase text-krew-text-muted">{workspace.brandColors[key]}</span></div>)}<Input label="Canvas background" type="color" value={currentVersion.backgroundColor} onChange={event => updateVersion(currentVersion.id, { backgroundColor: event.target.value })}/></div><div className="mt-4 border-t border-white/[0.06] pt-4"><p className="krew-meta">CREATOR DNA REFERENCE</p><p className="mt-2 text-xs text-krew-text-secondary">{profile.visualIdentity.fontPreference || 'Typography not configured'}</p><p className="mt-1 text-xs text-krew-text-muted">{profile.visualIdentity.thumbnailStyle || 'Visual style not configured'}</p><p className="mt-2 text-[10px] text-krew-text-muted">Typography can be selected per text layer above.</p></div></section>

            <section className="rounded-2xl bg-krew-surface p-4 sm:p-5"><p className="krew-meta">ASSET LIBRARY</p><h2 className="mt-1 font-display text-base font-semibold text-krew-text-primary">Project image assets</h2>{project.sourceFileName && <div className="mt-3 rounded-xl bg-krew-bg-secondary p-3"><p className="text-xs font-medium text-krew-text-primary">{project.sourceFileName}</p><p className="mt-1 text-[10px] text-krew-text-muted">Project source reference · {project.sourceType.replace('_', ' ')} · file bytes are not available to this workspace.</p></div>}<p className="mt-3 text-xs leading-relaxed text-krew-text-secondary">{activeFile ? `${activeFile.name} is previewed locally for ${currentVersion.name}.` : 'No local image is currently loaded for this version.'}</p><p className="mt-2 text-[10px] leading-relaxed text-krew-text-muted">The project source is shown as metadata only. Choose an image above to preview it; image files are not permanently stored.</p></section>

            {cinematographer && <section className="overflow-hidden rounded-2xl bg-krew-surface"><AgentPortrait agent={cinematographer} className="aspect-[16/8]"/><div className="p-5"><p className="krew-meta">VISUAL CREW · 04</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">The Cinematographer</h2><p className="mt-1 text-xs text-krew-status-warning">Visual Intelligence Agent</p><p className="mt-3 text-sm leading-relaxed text-krew-text-secondary">{cinematographer.tagline}</p><ul className="mt-4 space-y-2">{cinematographer.responsibilities.map(item => <li key={item} className="flex gap-2 text-xs leading-relaxed text-krew-text-muted"><span className="text-krew-status-warning">·</span>{item}</li>)}</ul><p className="mt-4 rounded-xl bg-krew-status-warning/10 px-3 py-2.5 text-[10px] leading-relaxed text-krew-status-warning">AI-based visual intelligence and thumbnail generation are reserved for the live hackathon sprint. The Cinematographer is not executing in this workspace.</p></div></section>}

            <section className="rounded-2xl bg-krew-surface p-4 sm:p-5"><p className="krew-meta">WORKSPACE SAVE</p><p className="mt-2 text-xs leading-relaxed text-krew-text-secondary">{isDirty ? localDraftStatus === 'saved' ? 'Unsaved changes are cached locally while you work.' : 'Browser storage is unavailable; keep this tab open until you save to the project.' : 'Version metadata is saved on the selected project.'}</p>{saveError && <p role="alert" className="mt-3 text-xs text-krew-status-error">{saveError}</p>}<Button className="mt-4 w-full" onClick={() => void saveWorkspace()} disabled={!isDirty || !validWorkspace || saving} isLoading={saving} leftIcon={<Save className="h-4 w-4"/>}>Save to project</Button></section>
          </aside>
        </div>
      </>}
    </>}
  </div>;
};
