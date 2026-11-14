import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Dropdown = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, children, ...props }, ref) => (
  <div className="relative inline-flex">
    <select ref={ref} className={cn('krew-focus appearance-none rounded-xl bg-krew-surface py-2.5 pl-3.5 pr-9 text-sm text-krew-text-primary transition-colors hover:bg-krew-card', className)} {...props}>{children}</select>
    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-krew-text-muted" />
  </div>
));
Dropdown.displayName = 'Dropdown';
