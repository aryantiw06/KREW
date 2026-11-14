import React from 'react';
import { AgentDefinition } from '../../types/agent.types';

export const AgentPortrait: React.FC<{ agent: AgentDefinition; className?: string }> = ({ agent, className = '' }) => {
  const portraitId = React.useId();
  return <div className={`relative isolate aspect-[4/3] overflow-hidden bg-[#101016] ${className}`} style={{ '--portrait-accent': agent.color } as React.CSSProperties} aria-hidden="true">
    <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(ellipse at 50% 22%, color-mix(in srgb, var(--portrait-accent) 45%, transparent), transparent 58%)' }} />
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(120deg, transparent 35%, var(--portrait-accent) 35.2%, transparent 35.7%), linear-gradient(60deg, transparent 70%, white 70.2%, transparent 70.5%)' }} />
    <svg viewBox="0 0 480 360" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id={`coat-${portraitId}`} x1="0" x2="1" y1="0" y2="1"><stop stopColor={agent.color} stopOpacity=".75"/><stop offset="1" stopColor="#201F2A"/></linearGradient><radialGradient id={`light-${portraitId}`}><stop stopColor={agent.color} stopOpacity=".38"/><stop offset="1" stopColor={agent.color} stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="238" cy="338" rx="176" ry="88" fill={`url(#coat-${portraitId})`} opacity=".85" />
      <path d="M122 354c12-79 52-117 117-117 68 0 108 39 120 117" fill="#16161F" stroke={agent.color} strokeOpacity=".45" strokeWidth="2" />
      <path d="M173 173c0-66 28-103 67-103 45 0 70 38 70 102 0 52-26 83-69 83-42 0-68-31-68-82Z" fill="#4b3b3c" />
      <path d="M165 164c-5-71 20-119 77-119 60 0 83 45 72 113-13-21-25-47-30-67-18 25-60 42-119 45Z" fill="#09090D" />
      <path d="M194 154c14-7 28-7 39-1m22 0c13-6 25-6 37 0" fill="none" stroke="#09090D" strokeWidth="7" strokeLinecap="round" />
      <path d="M218 205c12 7 28 7 41 0" fill="none" stroke="#1b1015" strokeWidth="4" strokeLinecap="round" />
      <circle cx="242" cy="159" r="110" fill={`url(#light-${portraitId})`} />
      <path d="M60 40h44M60 40v44m360-44h-44m44 0v44M60 320h44m-44 0v-44m360 44h-44m44 0v-44" fill="none" stroke={agent.color} strokeOpacity=".55" strokeWidth="2" />
    </svg>
    <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[.18em] text-white/60">KREW · {agent.role.toUpperCase()}</div>
  </div>;
};
