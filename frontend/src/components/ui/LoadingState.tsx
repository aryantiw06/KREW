import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export const LoadingState: React.FC<{ label?: string; className?: string }> = ({ label = 'Loading', className }) => (
  <div role="status" aria-live="polite" className={cn('flex items-center justify-center gap-2 py-10 text-sm text-krew-text-secondary', className)}>
    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin text-krew-lavender" />
    <span>{label}</span>
  </div>
);
