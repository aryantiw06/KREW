import React, { useState } from 'react';
import { SPECIALISED_AGENTS } from '../../data/sampleAgents';
import { AgentDefinition } from '../../types/agent.types';
import { AgentCard } from '../../components/agents/AgentCard';
import { AgentCollaborationDiagram } from '../../components/agents/AgentCollaborationDiagram';
import { AgentDetailModal } from '../../components/agents/AgentDetailModal';
import { StatusPill } from '../../components/common/StatusPill';
import { Badge } from '../../components/common/Badge';
import { Users2, Sparkles, Film, ArrowRight } from 'lucide-react';

export const CrewPage: React.FC = () => {
  const [inspectedAgent, setInspectedAgent] = useState<AgentDefinition | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInspect = (agent: AgentDefinition) => {
    setInspectedAgent(agent);
    setModalOpen(true);
  };

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-krew-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-krew-lavender bg-krew-purple/15 px-2.5 py-0.5 rounded-full border border-krew-purple/30 flex items-center gap-1.5">
              <Users2 className="w-3.5 h-3.5 text-krew-purple" />
              <span>THE PRODUCTION WORKFORCE</span>
            </span>
            <StatusPill type="live_reserved" label="Live Sprint AI Implementation" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white tracking-tight">
            Meet the KREW
          </h1>
          <p className="text-xs sm:text-sm text-krew-text-secondary mt-1 max-w-2xl">
            Six role contracts define responsibilities and input/output shapes. Availability is scaffolding only; execution and agent-to-agent communication are RESERVED FOR LIVE HACKATHON SPRINT.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="sm">
            6 Specialized Roles
          </Badge>
          <Badge variant="purple" size="sm">
            Contract Ready
          </Badge>
        </div>
      </div>

      {/* Interactive Collaboration Workflow Diagram */}
      <AgentCollaborationDiagram />

      {/* Six Agent Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-white">
            Specialised Agent Workforce
          </h3>
          <span className="text-xs font-mono text-krew-text-muted">
            All agents bind to Creator DNA Memory
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALISED_AGENTS.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onInspect={handleInspect}
            />
          ))}
        </div>
      </div>

      {/* Inspection Modal */}
      <AgentDetailModal
        agent={inspectedAgent}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

