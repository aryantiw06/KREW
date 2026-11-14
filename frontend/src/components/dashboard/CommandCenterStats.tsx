import React from 'react';
import { Clapperboard, FileText, Film, Eye } from 'lucide-react';

export interface ProductionCounts { total: number; drafts: number; inProduction: number; awaitingReview: number; }

export const CommandCenterStats: React.FC<{ counts: ProductionCounts; loading?: boolean; unavailable?: boolean }> = ({ counts, loading = false, unavailable = false }) => {
  const metrics = [
    { label: 'Total Productions', value: counts.total, icon: Clapperboard },
    { label: 'Drafts', value: counts.drafts, icon: FileText },
    { label: 'In Production', value: counts.inProduction, icon: Film },
    { label: 'Awaiting Review', value: counts.awaitingReview, icon: Eye }
  ];
  return <section aria-label="Production metrics" className="grid grid-cols-2 divide-x divide-white/[0.07] rounded-2xl bg-krew-surface px-2 py-4 sm:grid-cols-4">
    {metrics.map(({ label, value, icon: Icon }) => <div key={label} className="flex items-center gap-3 px-3 sm:px-5"><span className="hidden h-9 w-9 items-center justify-center rounded-xl bg-krew-bg-secondary text-krew-lavender sm:flex"><Icon className="h-4 w-4"/></span><div><p className="font-display text-xl font-semibold text-krew-text-primary">{loading ? '…' : unavailable ? '—' : value}</p><p className="text-[11px] text-krew-text-muted sm:text-xs">{label}</p></div></div>)}
  </section>;
};
