import { AgentRole } from './agent.types';
import { ThumbnailWorkspaceData } from './thumbnail.types';

export type ProjectStatus = 'draft' | 'queued' | 'in_production' | 'review_ready' | 'approved' | 'archived';

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
  pipelineStep: number; // 0: Idea, 1: Strategy, 2: Script, 3–4: Production, 5: Distribution
  createdAt: string;
  updatedAt: string;
  clipsCount?: number;
  thumbnailCount?: number;
  fileMetadata?: { mimeType?: string; originalName?: string; fileSizeBytes?: number };
  productionBrief?: {
    objective?: string;
    targetAudience?: string;
    contentFormat?: string;
    tone?: string;
  };
  creativeWorkspace?: {
    idea?: string;
    outline?: string;
    scriptDraft?: string;
    talkingPoints?: string[];
    creativeNotes?: string;
  };
  thumbnailWorkspace?: ThumbnailWorkspaceData;
}

