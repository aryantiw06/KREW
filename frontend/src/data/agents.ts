import { SPECIALISED_AGENTS as contracts } from './sampleAgents';
import { AgentDefinition } from '../types/agent.types';

export interface CinematicAgent extends AgentDefinition {
  number: string;
  traits: string[];
  availability: 'Contract Ready · Reserved for Live Sprint';
}

const direction: Record<string, { number: string; name: string; technicalIdentity: string; color: string; traits: string[] }> = {
  director: { number: '01', name: 'THE DIRECTOR', technicalIdentity: 'Strategy Agent', color: '#A855F7', traits: ['Visionary', 'Decisive', 'Organised', 'Strategic'] },
  writer: { number: '02', name: 'THE WRITER', technicalIdentity: 'Script Agent', color: '#38BDF8', traits: ['Creative', 'Expressive', 'Articulate', 'Narrative-driven'] },
  editor: { number: '03', name: 'THE EDITOR', technicalIdentity: 'Video Intelligence Agent', color: '#F43F5E', traits: ['Analytical', 'Precise', 'Detail-oriented'] },
  cinematographer: { number: '04', name: 'THE CINEMATOGRAPHER', technicalIdentity: 'Visual Intelligence Agent', color: '#F59E0B', traits: ['Imaginative', 'Visual', 'Aesthetic', 'Detail-focused'] },
  publicist: { number: '05', name: 'THE PUBLICIST', technicalIdentity: 'Distribution Agent', color: '#22C55E', traits: ['Persuasive', 'Communicative', 'Audience-aware'] },
  producer: { number: '06', name: 'THE PRODUCER', technicalIdentity: 'Growth Intelligence Agent', color: '#8B5CF6', traits: ['Analytical', 'Pragmatic', 'Performance-oriented'] }
};

export const KREW_AGENTS: CinematicAgent[] = contracts.map((agent) => {
  const identity = direction[agent.role];
  return {
    ...agent,
    name: identity.name,
    technicalIdentity: identity.technicalIdentity,
    cinematicRole: identity.name.replace('THE ', ''),
    color: identity.color,
    accentColor: identity.color,
    traits: identity.traits,
    number: identity.number,
    availability: 'Contract Ready · Reserved for Live Sprint',
    statusNote: 'Contract Ready · Reserved for Live Sprint'
  };
});

export const AGENT_PORTRAIT_TONES: Record<string, string> = Object.fromEntries(
  KREW_AGENTS.map(({ role, color }) => [role, color])
);
