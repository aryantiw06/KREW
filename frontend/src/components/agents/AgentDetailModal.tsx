import React from 'react';
import { AgentDefinition } from '../../types/agent.types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { StatusPill } from '../common/StatusPill';
import { Cpu, ArrowRight, Dna, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface AgentDetailModalProps {
  agent: AgentDefinition | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  agent,
  isOpen,
  onClose
}) => {
  if (!agent) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${agent.name} — Technical Architecture`}
      subtitle={`${agent.cinematicRole} • ${agent.technicalIdentity}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Status Pill & Boundary Notice */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-krew-purple/10 border border-krew-purple/20">
          <StatusPill type="live_reserved" label="Live Sprint AI Implementation" />
          <span className="text-[11px] font-mono text-krew-lavender">
            Status: {agent.statusNote}
          </span>
        </div>

        {/* Personality & Purpose */}
        <div className="space-y-2">
          <h5 className="text-xs font-mono uppercase tracking-wider text-krew-text-muted">
            Production Personality & Philosophy
          </h5>
          <p className="text-sm text-krew-text-secondary leading-relaxed bg-krew-surface p-3.5 rounded-xl border border-krew-border">
            {agent.personality}
          </p>
        </div>

        {/* Full Capabilities List */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono uppercase tracking-wider text-krew-text-muted">
            Sprint Capabilities & Autonomous Tool Execution
          </h5>
          <div className="space-y-2">
            {agent.capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-krew-surface border border-krew-border flex items-start justify-between gap-3"
              >
                <div>
                  <h6 className="text-sm font-semibold text-white">{cap.title}</h6>
                  <p className="text-xs text-krew-text-secondary mt-0.5">
                    {cap.description}
                  </p>
                </div>
                <Badge variant="purple" size="xs">
                  {cap.implementationPhase}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Input & Output Data Contracts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-krew-surface border border-krew-border space-y-2">
            <h6 className="text-xs font-mono uppercase tracking-wider text-krew-cyan flex items-center gap-1.5">
              <span>Input Contract</span>
            </h6>
            <ul className="space-y-1.5 text-xs text-krew-text-secondary">
              {agent.inputContract.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-krew-cyan shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-krew-surface border border-krew-border space-y-2">
            <h6 className="text-xs font-mono uppercase tracking-wider text-krew-lavender flex items-center gap-1.5">
              <span>Output Contract</span>
            </h6>
            <ul className="space-y-1.5 text-xs text-krew-text-secondary">
              {agent.outputContract.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-krew-purple shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Extension Point Code Snippet */}
        <div className="p-4 rounded-xl bg-krew-bg border border-krew-border space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-krew-text-muted">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-krew-purple" />
              <span>Backend Contract Binding:</span>
            </span>
            <span className="text-[11px] text-krew-lavender">
              backend/src/services/{agent.role}Agent/
            </span>
          </div>
          <pre className="text-[11px] font-mono text-krew-text-secondary overflow-x-auto p-2 bg-krew-charcoal rounded-lg border border-krew-border/40">
{`// Live Sprint Extension Contract
export interface I${agent.name.replace(/\s+/g, '')}Service {
  execute(context: ProductionContext): Promise<${agent.technicalIdentity.replace(/\s+/g, '')}Result>;
  bindCreatorDna(memory: CreatorDnaProfile): void;
}`}
          </pre>
        </div>
      </div>
    </Modal>
  );
};
