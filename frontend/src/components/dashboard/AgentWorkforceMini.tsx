import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { SPECIALISED_AGENTS } from '../../data/sampleAgents';
import { ArrowRight, Cpu, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AgentWorkforceMini: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between border-b border-krew-border/60 pb-3">
        <div>
          <h4 className="font-display font-bold text-white text-base">
            Workforce Readiness
          </h4>
          <p className="text-xs text-krew-text-secondary">
            Six specialised production roles surrounding the star.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          onClick={() => navigate('/crew')}
        >
          View KREW
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SPECIALISED_AGENTS.map((agent) => (
          <div
            key={agent.id}
            onClick={() => navigate('/crew')}
            className="p-3 rounded-xl bg-krew-surface hover:bg-krew-cardHover border border-krew-border hover:border-krew-purple/40 transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                style={{ backgroundColor: agent.color }}
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {agent.name}
                </p>
                <p className="text-[10px] text-krew-text-muted font-mono truncate">
                  {agent.technicalIdentity}
                </p>
              </div>
            </div>

            <Badge variant="outline" size="xs" className="shrink-0">
              Standby
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
