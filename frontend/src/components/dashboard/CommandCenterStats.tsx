import React from 'react';
import { Card } from '../common/Card';
import { StatusPill } from '../common/StatusPill';
import { Clapperboard, Users2, Dna, Zap, ArrowUpRight } from 'lucide-react';

export const CommandCenterStats: React.FC = () => {
  const stats = [
    {
      label: 'Active Productions',
      value: '4 In Progress',
      subtext: '1 Master Essay in Review',
      icon: <Clapperboard className="w-5 h-5 text-krew-purple" />,
      color: 'border-krew-purple/30'
    },
    {
      label: 'Agent Workforce',
      value: '6 Agents Ready',
      subtext: 'Pre-event scaffolding mapped',
      icon: <Users2 className="w-5 h-5 text-krew-cyan" />,
      color: 'border-krew-cyan/30'
    },
    {
      label: 'Creator DNA Sync',
      value: '100% Synced',
      subtext: 'Vocabulary & tone active',
      icon: <Dna className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30'
    },
    {
      label: 'Production Multiplier',
      value: '4.8x Output',
      subtext: 'Illustrative benchmark',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-bold text-white text-base">
          Studio Telemetry
        </h4>
        <StatusPill type="sample" label="Illustrative Demonstration Data" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} padding="md" className={`border ${stat.color} bg-krew-surface/60`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-krew-text-muted">
                {stat.label}
              </span>
              <div className="p-2 rounded-xl bg-krew-card border border-krew-border">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold font-display text-white mb-1">
              {stat.value}
            </div>
            <p className="text-xs text-krew-text-secondary">
              {stat.subtext}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
