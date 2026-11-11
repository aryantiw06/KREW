export interface ClipSegment {
  id: string;
  projectId: string;
  title: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  duration: number; // in seconds
  suggestedHook: string;
  summary: string;
  platformFormat: '9:16 Vertical' | '16:9 Landscape' | '1:1 Square';
  targetPlatforms: ('Instagram Reels' | 'YouTube Shorts' | 'TikTok' | 'LinkedIn Video')[];
  viralPotentialScore: number; // 0-100 (illustrative sample)
  speakerEmotion: 'Excited' | 'Provocative' | 'Insightful' | 'Dramatic';
  transcriptSnippet: string;
  isApproved: boolean;
  status: 'suggested' | 'approved' | 'rejected' | 'rendering_pipeline';
}
