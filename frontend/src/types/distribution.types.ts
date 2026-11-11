export type SocialPlatform = 'YouTube' | 'Instagram' | 'LinkedIn' | 'Facebook';

export interface PlatformPostDraft {
  platform: SocialPlatform;
  title: string;
  caption: string;
  hashtags: string[];
  recommendedScheduleTime: string;
  contentFormat: string;
  charCountLimit: number;
  seoKeywords: string[];
  status: 'draft' | 'approved' | 'scheduled' | 'ready';
}

export interface DistributionCampaign {
  id: string;
  projectId: string;
  campaignTitle: string;
  scheduledDate: string;
  posts: Record<SocialPlatform, PlatformPostDraft>;
  checklist: {
    id: string;
    task: string;
    completed: boolean;
    assignedRole: string;
  }[];
}
