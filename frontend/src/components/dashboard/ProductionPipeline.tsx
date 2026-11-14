import React from 'react';
import { ContentProject } from '../../types/project.types';
import { ArrowRight } from 'lucide-react';

const stages = ['Idea', 'Strategy', 'Script', 'Production', 'Distribution'];
const currentStage = (project?: ContentProject) => {
  if (!project || project.status === 'draft') return 0;
  if (project.pipelineStep <= 1) return 1;
  if (project.pipelineStep === 2) return 2;
  if (project.pipelineStep <= 4) return 3;
  return 4;
};

export const ProductionPipeline: React.FC<{ project?: ContentProject }> = ({ project }) => {
  const active = currentStage(project);
  return <section className="rounded-2xl bg-krew-bg-secondary p-5 sm:p-6"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><p className="krew-meta">FROM SPARK TO RELEASE</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">The production pipeline</h2></div>{project ? <p className="text-xs text-krew-text-secondary">Current project: <span className="text-krew-lavender">{stages[active]}</span></p> : <span className="krew-meta">WORKFLOW OVERVIEW</span>}</div><ol className="mt-5 grid grid-cols-5 gap-2 sm:gap-3">{stages.map((stage, index) => <li key={stage} aria-current={project && index === active ? 'step' : undefined} className="min-w-0"><div className="flex items-center gap-1.5"><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] ${project && index === active ? 'bg-krew-purple text-white' : 'bg-krew-surface text-krew-text-muted'}`}>{String(index + 1).padStart(2, '0')}</span>{index < stages.length - 1 && <span className={`h-px flex-1 ${project && index < active ? 'bg-krew-purple/60' : 'bg-white/[0.1]'}`}><ArrowRight className="-mt-[7px] ml-auto h-3 w-3 text-krew-text-muted"/></span>}</div><p className={`mt-2 truncate text-[10px] sm:text-xs ${project && index === active ? 'font-medium text-krew-text-primary' : 'text-krew-text-muted'}`}>{stage}</p></li>)}</ol><p className="mt-4 text-[10px] leading-relaxed text-krew-text-muted">The highlighted marker reflects the project’s stored workflow position. It does not mean an AI agent has completed work.</p></section>;
};
