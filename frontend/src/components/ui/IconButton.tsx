import React from 'react';
import { cn } from '../../utils/cn';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: 'sm' | 'md';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ label, size = 'md', className, children, ...props }, ref) => (
  <button ref={ref} type="button" aria-label={label} title={label} className={cn('krew-focus inline-flex items-center justify-center rounded-xl text-krew-text-secondary transition-colors hover:bg-white/[0.06] hover:text-krew-text-primary disabled:pointer-events-none disabled:opacity-50', size === 'sm' ? 'h-8 w-8' : 'h-10 w-10', className)} {...props}>
    {children}
  </button>
));
IconButton.displayName = 'IconButton';
