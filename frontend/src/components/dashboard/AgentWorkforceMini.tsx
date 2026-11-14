import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { KREW_AGENTS } from '../../data/agents';
import { AgentPortrait } from '../agents/AgentPortrait';

export const AgentWorkforceMini: React.FC = () => (
  <section className="overflow-hidden rounded-2xl bg-krew-surface">
    <div className="flex items-end justify-between gap-3 px-5 pb-4 pt-5 sm:px-6">
      <div><p className="krew-meta">THE PRODUCTION CREW</p><h2 className="mt-1 font-display text-lg font-semibold text-krew-text-primary">Six specialised roles</h2></div>
      <Link to="/crew" className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-krew-lavender transition-colors hover:text-krew-text-primary">Meet the KREW <ArrowRight className="h-3.5 w-3.5" /></Link>
    </div>
    <div className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-3">
      {KREW_AGENTS.map(agent => <Link key={agent.id} to="/crew" className="group min-w-0 bg-krew-surface transition-colors hover:bg-krew-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-krew-purple">
        <AgentPortrait agent={agent} className="aspect-[5/3] sm:aspect-[4/3]" />
        <div className="p-3 sm:p-4">
          <p className="truncate text-xs font-semibold text-krew-text-primary" style={{ color: agent.color }}>{agent.name}</p>
          <p className="mt-1 truncate text-[10px] text-krew-text-secondary">{agent.technicalIdentity}</p>
          <p className="mt-2 line-clamp-2 min-h-8 text-[10px] leading-relaxed text-krew-text-muted">{agent.tagline}</p>
          <p className="mt-3 text-[9px] leading-relaxed text-krew-text-muted">Contract ready · reserved for live sprint</p>
        </div>
      </Link>)}
    </div>
    <p className="px-5 py-3 text-[10px] leading-relaxed text-krew-text-muted sm:px-6">Role contracts and portraits are part of the product foundation; live agent execution is reserved for the hackathon sprint.</p>
  </section>
);
