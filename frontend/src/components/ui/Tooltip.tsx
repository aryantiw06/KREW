import React from 'react';
import { cn } from '../../utils/cn';

export const Tooltip: React.FC<{ content: string; children: React.ReactElement; className?: string }> = ({ content, children, className }) => (
  (() => {
    const id = React.useId();
    return <span className={cn('group/tooltip relative inline-flex', className)}>
      {React.cloneElement(children, { 'aria-describedby': id })}
      <span id={id} role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-krew-surface-elevated px-2.5 py-1.5 text-xs text-krew-text-primary opacity-0 shadow-xl transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100">{content}</span>
    </span>;
  })()
);
