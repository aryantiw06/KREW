import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { StatusPill } from '../common/StatusPill';
import { Clapperboard, Users2, Dna, Zap, ArrowUpRight } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useAuth } from '../../contexts/AuthContext';

export const CommandCenterStats: React.FC = () => {
  const { user } = useAuth(); const [counts, setCounts] = useState<{total:number;draft:number;production:number;review:number}|null>(null); const [error,setError]=useState('');
  useEffect(()=>{ if(!user?.token)return; projectService.list(user.token).then(r=>{if(!r.success||!r.data)throw new Error(r.message); const items=r.data.items.filter(p=>p.status!=='archived'); setCounts({total:items.length,draft:items.filter(p=>p.status==='draft').length,production:items.filter(p=>p.status==='in_production').length,review:items.filter(p=>p.status==='review_ready').length});}).catch(e=>setError(e instanceof Error?e.message:'Unable to load project counts'));},[user?.token]);
  const stats = [
    {
      label: 'Active Productions',
      value: counts ? `${counts.total} Total · ${counts.draft} Draft` : error ? 'Unavailable' : 'Loading…',
      subtext: `In Production: ${counts?.production ?? '—'} · Review Ready: ${counts?.review ?? '—'}`,
      icon: <Clapperboard className="w-5 h-5 text-krew-purple" />,
      color: 'border-krew-purple/30'
    },
    {
      label: 'Agent Workforce',
      value: '6 Contract Ready',
      subtext: 'Execution reserved for live sprint',
      icon: <Users2 className="w-5 h-5 text-krew-cyan" />,
      color: 'border-krew-cyan/30'
    },
    {
      label: 'Creator DNA Sync',
      value: 'Not synchronized',
      subtext: 'Live agent sync reserved for live sprint',
      icon: <Dna className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30'
    },
    {
      label: 'Production Multiplier',
      value: 'Sample only',
      subtext: 'Illustrative demo analytics',
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
        <StatusPill type="sample" label="Project counts live · other widgets illustrative" />
      </div>
      {error && <p role="alert" className="text-xs text-rose-300">{error}</p>}

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

