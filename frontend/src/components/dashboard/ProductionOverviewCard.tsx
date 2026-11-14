import React from 'react';
import { ArrowRight, Clapperboard, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ContentProject } from '../../types/project.types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';


export const ProductionOverviewCard: React.FC<{ project?: ContentProject; unavailable?: boolean }> = ({ project, unavailable = false }) => {
  const navigate = useNavigate();
  if (!project) return <section className="relative isolate overflow-hidden rounded-3xl bg-krew-bg-secondary p-6 sm:p-9">
    <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-20 -z-10 h-64 w-64 rounded-full bg-krew-purple/10 blur-3xl" />
    <div className="relative max-w-2xl"><span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-krew-purple/15 text-krew-lavender"><Clapperboard className="h-5 w-5" /></span><p className="krew-meta">{unavailable ? 'PROJECT LIBRARY' : 'YOUR NEXT FEATURE'}</p><h2 className="mt-2 font-display text-2xl font-semibold text-krew-text-primary sm:text-3xl">{unavailable ? 'Your productions could not load.' : 'Your next production starts here.'}</h2><p className="mt-2 max-w-xl text-sm text-krew-text-secondary">{unavailable ? 'Reconnect to your project library to see your active slate.' : 'Bring an idea, a video, or a rough brief into your studio. Your first step is yours to shape.'}</p><Button className="mt-5" onClick={() => navigate('/production')} rightIcon={<ArrowRight className="h-4 w-4" />}>{unavailable ? 'Open Production Studio' : 'Start a Production'}</Button></div>
  </section>;

  const statusVariant = project.status === 'review_ready' ? 'cyan' : project.status === 'approved' ? 'emerald' : project.status === 'draft' || project.status === 'archived' ? 'neutral' : 'purple';
  return <section className="relative isolate overflow-hidden rounded-3xl bg-krew-bg-secondary">
    <div aria-hidden="true" className="absolute inset-y-0 right-0 w-full sm:w-1/2" style={{ background: `radial-gradient(ellipse at 70% 45%, ${project.status === 'review_ready' ? 'rgba(56,189,248,.20)' : 'rgba(168,85,247,.22)'}, transparent 68%)` }} />
    <div className="relative grid min-h-56 lg:grid-cols-[1.2fr_.8fr]">
      <div className="flex flex-col justify-center p-6 sm:p-9"><div className="mb-4 flex flex-wrap items-center gap-2"><span className="krew-meta">FEATURED PRODUCTION</span><Badge variant={statusVariant}>{project.status.replace('_', ' ')}</Badge></div><h2 className="max-w-2xl font-display text-2xl font-semibold tracking-tight text-krew-text-primary sm:text-3xl">{project.title}</h2><p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-krew-text-secondary">{project.description || 'A production brief ready for your next creative decision.'}</p><div className="mt-5 flex flex-wrap items-center gap-3"><Button size="sm" onClick={() => navigate('/production')}>Open Production <ArrowRight className="ml-2 h-4 w-4" /></Button><span className="krew-meta">{project.targetPlatforms.slice(0, 3).join(' · ') || 'Platforms not set'}</span></div></div>
      <div className="relative hidden min-h-56 items-center justify-center lg:flex"><div aria-hidden="true" className="absolute h-48 w-48 rounded-full border border-white/[0.07]" /><div aria-hidden="true" className="absolute h-36 w-36 rounded-full border border-white/[0.07]" /><div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-krew-surface text-krew-lavender shadow-2xl"><Film className="h-10 w-10" /></div><span className="absolute bottom-7 right-8 font-mono text-xs text-krew-text-muted">KREW · PRODUCTION {project.id.slice(-4).toUpperCase()}</span></div>
    </div>
  </section>;
};
