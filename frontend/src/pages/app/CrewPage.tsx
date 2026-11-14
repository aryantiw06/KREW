import React, { useState } from 'react';
import { ArrowDown, ArrowRight, Dna, Orbit, Sparkles, Star } from 'lucide-react';
import { KREW_AGENTS } from '../../data/agents';
import { AgentDefinition } from '../../types/agent.types';
import { AgentCard } from '../../components/agents/AgentCard';
import { AgentDetailModal } from '../../components/agents/AgentDetailModal';
import { Button } from '../../components/common/Button';

export const CrewPage: React.FC = () => {
  const [selected, setSelected] = useState<AgentDefinition | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const inspect = (agent: AgentDefinition) => { setSelected(agent); setModalOpen(true); };

  return <div className="space-y-16 pb-10">
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-krew-bg-secondary px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
      <div className="pointer-events-none absolute -right-24 -top-36 -z-10 h-[28rem] w-[28rem] rounded-full bg-krew-purple/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-48 w-96 rounded-full bg-krew-cyan/5 blur-[80px]" />
      <p className="mb-4 flex items-center gap-2 font-mono text-xs tracking-[.15em] text-krew-lavender"><Sparkles className="h-4 w-4"/> YOUR PRODUCTION CREW</p>
      <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-krew-text-primary sm:text-6xl">Meet Your Crew.</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-krew-text-secondary sm:text-lg">Six specialised minds. One creative vision.</p>
      <div className="mt-8 flex flex-wrap items-center gap-3"><Button variant="secondary" onClick={() => document.getElementById('the-crew')?.scrollIntoView({ behavior: 'smooth' })} rightIcon={<ArrowDown className="h-4 w-4"/>}>Meet the specialists</Button><span className="text-xs text-krew-text-muted">Human-led production · agent contracts ready</span></div>
    </section>

    <section id="the-crew" className="scroll-mt-24 space-y-7">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="krew-meta mb-2">THE PEOPLE BEHIND THE PROCESS</p><h2 className="font-display text-2xl font-semibold text-krew-text-primary sm:text-3xl">A crew built around your voice.</h2></div><p className="max-w-md text-sm text-krew-text-secondary">Every role has a defined scope and contract. Select a portrait to explore how that role fits your production.</p></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {KREW_AGENTS.map((agent, index) => <AgentCard key={agent.id} agent={agent} number={agent.number} featured={index === 0} onInspect={inspect} />)}
      </div>
    </section>

    <section className="space-y-6">
      <div><p className="krew-meta mb-2">PLANNED HANDOFFS · CONTRACT MAP</p><h2 className="font-display text-2xl font-semibold text-krew-text-primary sm:text-3xl">Illustrative Collaboration Architecture</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-krew-text-secondary">The diagram describes the intended collaboration model around the creator. It is a visual contract map; autonomous real-time agent-to-agent execution is <strong className="font-medium text-krew-lavender">RESERVED FOR LIVE HACKATHON SPRINT</strong>.</p></div>
      <div className="relative overflow-hidden rounded-3xl bg-krew-bg-secondary p-5 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-25" style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,.18), transparent 60%)' }} />
        <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1.25fr_1fr_1fr] lg:grid-rows-[auto_auto] lg:gap-x-5 lg:gap-y-8">
          {KREW_AGENTS.map((agent, index) => {
            const gridPositions = ['lg:col-start-2 lg:row-start-1', 'lg:col-start-4 lg:row-start-1', 'lg:col-start-1 lg:row-start-2', 'lg:col-start-2 lg:row-start-2', 'lg:col-start-4 lg:row-start-2', 'lg:col-start-5 lg:row-start-2'];
            return <button key={agent.id} onClick={() => inspect(agent)} className={`group rounded-2xl bg-krew-surface p-4 text-left transition-colors hover:bg-krew-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krew-purple ${gridPositions[index]}`}>
              <div className="mb-3 flex items-center justify-between"><span className="font-mono text-[10px] text-krew-text-muted">{agent.number}</span><span className="h-2 w-2 rounded-full" style={{ backgroundColor: agent.color }} /></div><p className="font-display text-sm font-semibold text-krew-text-primary">{agent.name}</p><p className="mt-1 text-xs text-krew-text-muted">{agent.technicalIdentity}</p><span className="mt-3 flex items-center gap-1 text-[10px] text-krew-text-muted"><ArrowRight className="h-3 w-3"/>Contract handoff</span>
            </button>;
          })}
          <div className="order-first col-span-2 flex min-h-36 flex-col items-center justify-center rounded-2xl border border-krew-purple/25 bg-krew-purple/[0.07] p-5 text-center sm:col-span-3 lg:order-none lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-krew-purple/15 text-krew-lavender"><Star className="h-6 w-6"/></div><span className="font-mono text-[10px] tracking-[.18em] text-krew-lavender">THE STAR</span><h3 className="mt-1 font-display text-xl font-semibold text-krew-text-primary">The Creator</h3><p className="mt-2 max-w-xs text-xs leading-relaxed text-krew-text-secondary">Sets the vision, brings the voice, and approves every production decision.</p><div className="mt-4 flex items-center gap-1.5 text-[10px] text-krew-text-muted"><Dna className="h-3.5 w-3.5 text-krew-purple"/>Creator DNA · shared context schema</div>
          </div>
        </div>
        <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-4 text-center text-[11px] text-krew-text-muted"><span className="inline-flex items-center gap-1.5"><Orbit className="h-3.5 w-3.5 text-krew-purple"/>Illustrative only</span><span>Contracts and handoffs are planned; no autonomous execution is active.</span></div>
      </div>
    </section>

    <AgentDetailModal agent={selected} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
  </div>;
};
