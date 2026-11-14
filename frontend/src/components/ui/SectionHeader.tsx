import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, eyebrow, action, className, ...props }) => (
  <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)} {...props}>
    <div className="min-w-0">
      {eyebrow && <p className="krew-meta mb-1">{eyebrow}</p>}
      <h2 className="krew-section-heading">{title}</h2>
      {description && <p className="mt-1 max-w-2xl text-sm text-krew-text-secondary">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
