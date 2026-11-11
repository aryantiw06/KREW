import React from 'react';
import { AgentDefinition } from '../../types/agent.types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Sparkles, ArrowRight, CheckCircle2, CircleDashed, Cpu } from 'lucide-react';

interface AgentCardProps {
  agent: AgentDefinition;
  onInspect: (agent: AgentDefinition) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onInspect }) => {
  return (
    <Card
      glowOnHover
      padding="lg"
      className="flex flex-col justify-between border-krew-border relative overflow-hidden group"
    >
      {/* Top Accent Gradient Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: agent.color }}
      />

      <div>
        {/* Header: Cinematic Role & Technical Identity */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-krew-text-muted">
                {agent.cinematicRole}
              </span>
              <span className="w-1 h-1 rounded-full bg-krew-border"></span>
              <Badge variant="outline" size="xs">
                {agent.technicalIdentity}
              </Badge>
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              {agent.name}
            </h3>
          </div>

          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
            style={{ backgroundColor: `${agent.color}15`, color: agent.color }}
          >
            <Cpu className="w-5 h-5" />
          </div>
        </div>

        {/* Personality & Tagline */}
        <p className="text-xs text-krew-lavender font-mono mb-3">
          "{agent.tagline}"
        </p>
        <p className="text-xs text-krew-text-secondary leading-relaxed mb-5">
          <strong className="text-krew-text-primary">Tone & Persona:</strong> {agent.personality}
        </p>

        {/* Responsibilities */}
        <div className="space-y-2 mb-6">
          <p className="text-[11px] font-mono uppercase tracking-wider text-krew-text-muted">
            Core Production Scope:
          </p>
          <ul className="space-y-1.5">
            {agent.responsibilities.slice(0, 3).map((resp, idx) => (
              <li key={idx} className="text-xs text-krew-text-secondary flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: agent.color }} />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Planned Capabilities Preview */}
        <div className="p-3 rounded-xl bg-krew-surface/60 border border-krew-border/60 mb-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-krew-text-muted mb-2">
            <span>Live Sprint Capabilities</span>
            <span className="text-amber-400">Reserved (50%)</span>
          </div>
          <div className="space-y-1">
            {agent.capabilities.map((cap, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-krew-text-primary">
                <CircleDashed className="w-3 h-3 text-krew-lavender shrink-0" />
                <span className="truncate">{cap.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Status and Inspection Button */}
      <div className="pt-4 border-t border-krew-border/60 flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-krew-lavender">
          {agent.statusNote}
        </span>
        <Button
          variant="outline"
          size="sm"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => onInspect(agent)}
        >
          Contracts
        </Button>
      </div>
    </Card>
  );
};

