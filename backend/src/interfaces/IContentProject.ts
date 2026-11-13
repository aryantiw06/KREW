export interface IContentProject {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  sourceType: 'raw_video' | 'topic_brief' | 'podcast_audio' | 'screen_recording';
  sourceFileName?: string;
  sourceDuration?: number;
  fileSizeBytes?: number;
  status: 'draft' | 'queued' | 'in_production' | 'review_ready' | 'approved' | 'archived';
  targetPlatforms: string[];
  activeAgents: string[];
  pipelineStep: number;
  createdAt: Date;
  updatedAt: Date;
  fileMetadata?: { mimeType?: string; originalName?: string; fileSizeBytes?: number };
}

