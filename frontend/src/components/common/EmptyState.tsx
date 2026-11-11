import React from 'react';
import { Film } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-krew-border bg-krew-surface/40 my-4">
      <div className="w-14 h-14 rounded-2xl bg-krew-card border border-krew-border flex items-center justify-center text-krew-purple mb-4 shadow-studio-card">
        {icon || <Film className="w-7 h-7" />}
      </div>
      <h4 className="font-display text-lg font-semibold text-white mb-1.5">
        {title}
      </h4>
      <p className="text-sm text-krew-text-secondary max-w-md mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

