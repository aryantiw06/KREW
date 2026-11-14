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
  thumbnailWorkspace?: {
    activeVersionId: string;
    versions: Array<{
      id: string;
      name: string;
      aspectRatio: '16:9' | '9:16' | '1:1';
      backgroundColor: string;
      backgroundAssetName: string;
      textLayers: Array<{
        id: string;
        role: 'headline' | 'subtitle' | 'custom';
        text: string;
        x: number;
        y: number;
        width: number;
        fontSize: number;
        color: string;
        align: 'left' | 'center' | 'right';
        fontFamily: string;
        bold: boolean;
        visible: boolean;
        order: number;
      }>;
      createdAt: string;
      updatedAt: string;
    }>;
    brandColors: { primary: string; secondary: string; accent: string };
  };
}

