import React from 'react';
import { Sparkles, Database, Code, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatusPillProps {
  type: 'sample' | 'live_reserved' | 'architected' | 'ready';
  label?: string;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  type,
  label,
  className = ''
}) => {
  const configs = {
    sample: {
      text: label || 'Demonstration Sample Data',
      icon: <Database className="w-3 h-3 text-amber-400" />,
      style: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    },
    live_reserved: {
      text: label || 'Reserved for Live Sprint',
      icon: <Sparkles className="w-3 h-3 text-krew-purple" />,
      style: 'bg-krew-purple/15 text-krew-lavender border-krew-purple/30'
    },
    architected: {
      text: label || 'Pre-Event 50% Architecture',
      icon: <Code className="w-3 h-3 text-krew-cyan" />,
      style: 'bg-krew-cyan/15 text-krew-cyan border-krew-cyan/30'
    },
    ready: {
      text: label || 'Operational Interface',
      icon: <Info className="w-3 h-3 text-emerald-400" />,
      style: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
    }
  };

  const current = configs[type];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-mono tracking-wide',
        current.style,
        className
      )}
    >
      {current.icon}
      <span>{current.text}</span>
    </span>
  );
};
