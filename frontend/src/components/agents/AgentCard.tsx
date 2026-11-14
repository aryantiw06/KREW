import React from 'react';
import { AgentDefinition } from '../../types/agent.types';
import { ArrowUpRight } from 'lucide-react';
import { AgentPortrait } from './AgentPortrait';

interface AgentCardProps { agent: AgentDefinition; number?: string; onInspect: (agent: AgentDefinition) => void; }

export const AgentCard: React.FC<AgentCardProps> = ({ agent, number = '01', onInspect }) => (
  <button type="button" onClick={() => onInspect(agent)} className="group relative block w-full overflow-hidden rounded-2xl bg-krew-surface text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krew-purple">
    <AgentPortrait agent={agent} />
    <div className="relative p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-krew-text-muted">AGENT {number}</span>
        <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] text-krew-text-secondary">Contract Ready · Reserved for Live Sprint</span>
      </div>
      <h3 className="font-display text-xl font-semibold tracking-tight text-krew-text-primary sm:text-2xl">{agent.name}</h3>
      <p className="mt-1 text-sm" style={{ color: agent.color }}>{agent.technicalIdentity}</p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-krew-text-secondary">{agent.tagline}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">{(agent.traits || agent.personality.split(',').slice(0, 3)).slice(0, 4).map((trait) => <span key={trait} className="rounded-md bg-krew-bg-secondary px-2 py-1 text-[11px] text-krew-text-muted">{trait.trim().replace(/\.$/, '')}</span>)}</div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-krew-text-secondary transition-colors group-hover:bg-krew-purple group-hover:text-white"><ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </div>
    <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: agent.color }} />
  </button>
);
