import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { SPECIALISED_AGENTS, AGENT_COLLABORATION_EDGES } from '../../data/sampleAgents';
import { AgentRole } from '../../types/agent.types';
import { ArrowRight, Dna, Sparkles, UserCheck, RefreshCw } from 'lucide-react';

export const AgentCollaborationDiagram: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<AgentRole>('director');

  const selectedAgent = SPECIALISED_AGENTS.find((a) => a.role === selectedRole);
  const outgoingEdges = AGENT_COLLABORATION_EDGES.filter((e) => e.from === selectedRole);
  const incomingEdges = AGENT_COLLABORATION_EDGES.filter((e) => e.to === selectedRole);

  return (
    <Card padding="lg" className="border-krew-purple/30 bg-krew-surface/60">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-krew-lavender">
              Multi-Agent Collaboration Architecture
            </span>
            <Badge variant="cyan" size="xs">
              Interactive Workflow
            </Badge>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            How The KREW Collaborates Around The Star
          </h3>
          <p className="text-xs text-krew-text-secondary mt-1">
            Click any production role to inspect its upstream inputs, downstream handoffs, and shared Creator DNA bindings.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-krew-card border border-krew-border text-xs font-mono">
          <Dna className="w-4 h-4 text-krew-purple" />
          <span className="text-krew-text-primary">Shared Backbone:</span>
          <span className="text-krew-lavender font-semibold">Creator DNA Engine</span>
        </div>
      </div>

      {/* Central Interactive Node Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {SPECIALISED_AGENTS.map((agent) => {
          const isSelected = agent.role === selectedRole;
          return (
            <button
              key={agent.id}
              onClick={() => setSelectedRole(agent.role)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group focus:outline-none ${
                isSelected
                  ? 'bg-krew-card border-krew-purple shadow-purple-glow -translate-y-1'
                  : 'bg-krew-surface hover:bg-krew-card border-krew-border text-krew-text-secondary'
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full mb-2"
                style={{ backgroundColor: agent.color }}
              />
              <p className="text-[10px] font-mono uppercase tracking-wider text-krew-text-muted">
                {agent.cinematicRole}
              </p>
              <p className="text-sm font-semibold text-white truncate">
                {agent.name.replace('The ', '')}
              </p>
              <p className="text-[10px] text-krew-lavender mt-1 truncate">
                {agent.technicalIdentity}
              </p>
              {isSelected && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: agent.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Node Inspector Detail */}
      {selectedAgent && (
        <div className="p-5 rounded-2xl bg-krew-card border border-krew-border grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Col 1: Selected Agent Identity */}
          <div className="space-y-3 border-b lg:border-b-0 lg:border-r border-krew-border/60 lg:pr-6">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedAgent.color }}
              />
              <h4 className="font-display text-lg font-bold text-white">
                {selectedAgent.name}
              </h4>
            </div>
            <p className="text-xs text-krew-lavender font-mono">
              Role: {selectedAgent.technicalIdentity}
            </p>
            <p className="text-xs text-krew-text-secondary leading-relaxed">
              {selectedAgent.personality}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono text-krew-text-muted uppercase tracking-wider block mb-1">
                Creator DNA Binding:
              </span>
              <div className="p-2.5 rounded-xl bg-krew-surface border border-krew-border/60 text-xs text-krew-text-primary flex items-center gap-2">
                <Dna className="w-3.5 h-3.5 text-krew-purple shrink-0" />
                <span>Reads vocabulary & tone profile directly from shared memory.</span>
              </div>
            </div>
          </div>

          {/* Col 2: Incoming Handoffs */}
          <div className="space-y-3 border-b lg:border-b-0 lg:border-r border-krew-border/60 lg:pr-6">
            <h5 className="text-xs font-mono uppercase tracking-wider text-krew-text-muted flex items-center gap-1.5">
              <span>Upstream Inputs & Context:</span>
            </h5>
            <div className="space-y-2">
              {incomingEdges.length > 0 ? (
                incomingEdges.map((edge, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-krew-lavender">
                      <span>From: The {edge.from}</span>
                      <ArrowRight className="w-3 h-3 text-krew-text-muted" />
                    </div>
                    <p className="font-medium text-white">{edge.dataContract}</p>
                    <p className="text-[11px] text-krew-text-muted">{edge.description}</p>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-krew-surface/40 border border-dashed border-krew-border text-xs text-krew-text-muted">
                  Direct entrypoint: Receives primary seed instruction from the human Creator (Star).
                </div>
              )}
            </div>
          </div>

          {/* Col 3: Outgoing Handoffs */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-krew-text-muted flex items-center gap-1.5">
              <span>Downstream Output Deliverables:</span>
            </h5>
            <div className="space-y-2">
              {outgoingEdges.length > 0 ? (
                outgoingEdges.map((edge, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                      <span>Hands off to: The {edge.to}</span>
                      <ArrowRight className="w-3 h-3 text-emerald-400" />
                    </div>
                    <p className="font-medium text-white">{edge.dataContract}</p>
                    <p className="text-[11px] text-krew-text-muted">{edge.description}</p>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-krew-surface/40 border border-dashed border-krew-border text-xs text-krew-text-muted">
                  Final stage deliverable: Feeds audit directives back to the Director and Creator DNA.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
