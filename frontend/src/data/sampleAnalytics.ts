import { MetricOverview, PlatformEngagementData, GrowthTimelinePoint, ContentInsightItem } from '../types/analytics.types';

export const SAMPLE_ANALYTICS_METRICS: MetricOverview[] = [
  {
    label: 'Total Cross-Platform Views',
    value: '2.48M',
    change: '+38.4%',
    isPositive: true,
    timeframe: 'Past 30 days',
    isDemonstrationData: true
  },
  {
    label: 'Audience Retention (Avg)',
    value: '64.2%',
    change: '+12.6%',
    isPositive: true,
    timeframe: 'vs. benchmark 48%',
    isDemonstrationData: true
  },
  {
    label: 'Click-Through Rate (CTR)',
    value: '9.8%',
    change: '+3.1%',
    isPositive: true,
    timeframe: 'Top 5% in tech niche',
    isDemonstrationData: true
  },
  {
    label: 'Autonomous Production Multiplier',
    value: '4.8x',
    change: '32 assets/video',
    isPositive: true,
    timeframe: 'Hours saved: ~68 hrs/mo',
    isDemonstrationData: true
  }
];

export const SAMPLE_PLATFORM_ENGAGEMENT: PlatformEngagementData[] = [
  { platform: 'YouTube Long-Form', views: 820000, engagementRate: 8.4, retentionPercent: 62, growth: 28 },
  { platform: 'YouTube Shorts', views: 640000, engagementRate: 11.2, retentionPercent: 74, growth: 42 },
  { platform: 'Instagram Reels', views: 580000, engagementRate: 9.8, retentionPercent: 68, growth: 36 },
  { platform: 'LinkedIn Video & Posts', views: 310000, engagementRate: 6.9, retentionPercent: 54, growth: 51 },
  { platform: 'Facebook Watch', views: 130000, engagementRate: 4.1, retentionPercent: 41, growth: 14 }
];

export const SAMPLE_GROWTH_TIMELINE: GrowthTimelinePoint[] = [
  { date: 'Oct 01', views: 180000, subscribers: 4200, engagement: 7.2 },
  { date: 'Oct 08', views: 240000, subscribers: 5800, engagement: 7.8 },
  { date: 'Oct 15', views: 390000, subscribers: 9100, engagement: 8.5 },
  { date: 'Oct 22', views: 510000, subscribers: 13400, engagement: 9.1 },
  { date: 'Oct 29', views: 720000, subscribers: 19800, engagement: 9.9 },
  { date: 'Nov 05', views: 980000, subscribers: 26500, engagement: 10.4 },
  { date: 'Nov 11', views: 1240000, subscribers: 34200, engagement: 11.1 }
];

export const SAMPLE_PRODUCER_INSIGHTS: ContentInsightItem[] = [
  {
    id: 'ins-001',
    agentSource: 'The Producer',
    title: 'Hook Optimization Opportunity in First 5 Seconds',
    observation: 'Viewers drop by 18% when video intros exceed 4 seconds without text caption overlay.',
    recommendation: 'Instruct The Writer and The Editor to enforce 3-second kinetic hooks with bold kinetic text overlays on all vertical reels.',
    potentialImpact: 'High'
  },
  {
    id: 'ins-002',
    agentSource: 'The Producer',
    title: 'LinkedIn Video Essay Repurposing Outperforming Expectations',
    observation: 'LinkedIn engagement rose 51% following slide-deck carousels paired with short commentary clips.',
    recommendation: 'Expand The Publicist agent directives to auto-generate PDF carousel drafts from Writer script outlines.',
    potentialImpact: 'Breakthrough'
  },
  {
    id: 'ins-003',
    agentSource: 'The Producer',
    title: 'Thumbnail Contrast Variant A Yields +2.4% Higher CTR',
    observation: 'The Cinematographer’s Anamorphic Teal & Purple grading outperformed monochrome slate layouts across 3 split tests.',
    recommendation: 'Update Creator DNA Visual Identity to prioritize dual-tone rim lighting as default thumbnail directive.',
    potentialImpact: 'Medium'
  }
];
