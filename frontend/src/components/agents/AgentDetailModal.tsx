import React from 'react';
import { AgentDefinition } from '../../types/agent.types';
import { Modal } from '../common/Modal';
import { StatusPill } from '../common/StatusPill';
import { AgentPortrait } from './AgentPortrait';

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
      title={`${agent.name} — Character Dossier`}
      subtitle={`${agent.cinematicRole} · ${agent.technicalIdentity}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Status Pill & Boundary Notice */}
        <AgentPortrait agent={agent} className="rounded-xl" />
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-krew-surface p-3">
          <StatusPill type="live_reserved" label="Contract Ready · Reserved for Live Sprint" />
          <span className="text-[11px] font-mono text-krew-text-muted">Illustrative role contract</span>
        </div>

        {/* Personality & Purpose */}
        <div className="space-y-2">
          <h5 className="text-xs font-mono uppercase tracking-wider text-krew-text-muted">
            Production Personality & Philosophy
          </h5>
          <p className="text-sm text-krew-text-secondary leading-relaxed bg-krew-surface p-3.5 rounded-xl border border-krew-border">
            {agent.personality} {agent.traits?.length ? `Traits: ${agent.traits.join(' · ')}.` : ''}
          </p>
        </div>

        {/* Full Capabilities List */}
        <div className="space-y-3">
          <h5 className="text-xs font-mono uppercase tracking-wider text-krew-text-muted">
            Core responsibilities
          </h5>
          <div className="space-y-2">
            {agent.responsibilities.map((responsibility, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-krew-surface px-3 py-2.5 text-sm text-krew-text-secondary"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: agent.color }} />
                <span>{responsibility}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-krew-surface p-4 text-sm text-krew-text-secondary"><h5 className="mb-1 text-xs font-mono text-krew-lavender">CREATOR DNA RELATIONSHIP</h5>This role is designed to use the creator’s saved voice, audience, and visual preferences as context. Live agent access and memory-driven execution are reserved for the live hackathon sprint.</div>

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

      </div>
    </Modal>
  );
};

