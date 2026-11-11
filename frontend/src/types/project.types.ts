import { AgentRole } from './agent.types';

export type ProjectStatus = 'draft' | 'in_production' | 'review_ready' | 'scheduled' | 'completed';

export interface ContentProject {
  id: string;
  title: string;
  description: string;
  sourceType: 'raw_video' | 'topic_brief' | 'podcast_audio' | 'screen_recording';
  sourceFileName?: string;
  sourceDuration?: number; // seconds
  fileSizeBytes?: number;
  status: ProjectStatus;
  targetPlatforms: string[];
  activeAgents: AgentRole[];
  pipelineStep: number; // 1: Strategy, 2: Script/Hook, 3: Video Clips, 4: Thumbnails, 5: Distribution
  createdAt: string;
  updatedAt: string;
  clipsCount?: number;
  thumbnailCount?: number;
}

