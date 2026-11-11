export type AgentRole = 
  | 'director' 
  | 'writer' 
  | 'editor' 
  | 'cinematographer' 
  | 'publicist' 
  | 'producer';

export type AgentStatus = 'planned' | 'standby' | 'architected' | 'reserved_live';

export interface AgentCapability {
  title: string;
  description: string;
  isImplemented: boolean;
  implementationPhase: 'Pre-Event Scaffold' | 'Live 6h Sprint' | 'Post-Hackathon';
}

export interface AgentDefinition {
  id: string;
  role: AgentRole;
  name: string; // e.g. "The Director"
  cinematicRole: string; // "Director"
  technicalIdentity: string; // "Strategy Agent"
  personality: string;
  tagline: string;
  color: string;
  accentColor: string;
  avatarSeed: string;
  responsibilities: string[];
  capabilities: AgentCapability[];
  inputContract: string[];
  outputContract: string[];
  collaborationWith: AgentRole[];
  statusNote: string;
}

export interface AgentCollaborationEdge {
  from: AgentRole;
  to: AgentRole;
  dataContract: string;
  description: string;
}

