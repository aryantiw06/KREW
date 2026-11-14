import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  activeBorder?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  glowOnHover = false,
  activeBorder = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div
      className={cn(
        'rounded-2xl bg-krew-card transition-colors duration-200',
        glowOnHover && 'hover:border-krew-purple/50 hover:shadow-purple-glow hover:-translate-y-0.5',
        activeBorder && 'border-krew-purple/60 shadow-purple-glow',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

