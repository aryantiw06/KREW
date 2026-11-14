import React from 'react';
import { AgentDefinition, AgentRole } from '../../types/agent.types';

const portraits: Record<AgentRole, string> = {
  director: '/images/agents/director.jpg',
  writer: '/images/agents/writer.jpg',
  editor: '/images/agents/editor.jpg',
  cinematographer: '/images/agents/cinematographer.jpg',
  publicist: '/images/agents/publicist.jpg',
  producer: '/images/agents/producer.jpg'
};

const focalPoints: Record<AgentRole, string> = {
  director: '50% 20%',
  writer: '52% 18%',
  editor: '50% 18%',
  cinematographer: '62% 50%',
  publicist: '50% 18%',
  producer: '50% 15%'
};

export const AgentPortrait: React.FC<{ agent: AgentDefinition; className?: string }> = ({ agent, className = '' }) => (
  <div className={`relative isolate aspect-[4/3] overflow-hidden bg-krew-bg-secondary ${className}`}>
    <img
      src={portraits[agent.role]}
      alt={`${agent.name} cinematic portrait`}
      loading="lazy"
      decoding="async"
      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
      className="h-full w-full object-cover"
      style={{ objectPosition: focalPoints[agent.role] }}
    />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to top, rgba(9,9,13,.78), transparent 42%), linear-gradient(135deg, ${agent.color}16, transparent 55%)` }} />
    <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[.18em] text-white/75">KREW · {agent.role.toUpperCase()}</div>
    <span aria-hidden="true" className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full shadow-lg" style={{ backgroundColor: agent.color, boxShadow: `0 0 18px ${agent.color}90` }} />
  </div>
);
