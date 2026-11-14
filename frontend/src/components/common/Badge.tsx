import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'neutral' | 'outline';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'sm',
  className = '',
  icon
}) => {
  const variantStyles = {
    purple: 'bg-krew-purple/15 text-krew-lavender border-krew-purple/30',
    cyan: 'bg-krew-cyan/15 text-krew-cyan border-krew-cyan/30',
    emerald: 'bg-krew-status-success/10 text-krew-status-success border-krew-status-success/25',
    amber: 'bg-krew-status-warning/10 text-krew-status-warning border-krew-status-warning/25',
    rose: 'bg-krew-status-error/10 text-krew-status-error border-krew-status-error/25',
    neutral: 'bg-krew-card text-krew-text-secondary border-krew-border',
    outline: 'bg-transparent text-krew-text-primary border-krew-border'
  };

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 font-medium tracking-wide',
    sm: 'text-xs px-2.5 py-1 font-medium',
    md: 'text-sm px-3 py-1.5 font-medium'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

