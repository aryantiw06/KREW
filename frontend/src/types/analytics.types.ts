export interface MetricOverview {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  isDemonstrationData: boolean;
}

export interface PlatformEngagementData {
  platform: string;
  views: number;
  engagementRate: number;
  retentionPercent: number;
  growth: number;
}

export interface GrowthTimelinePoint {
  date: string;
  views: number;
  subscribers: number;
  engagement: number;
}

export interface ContentInsightItem {
  id: string;
  agentSource: string;
  title: string;
  observation: string;
  recommendation: string;
  potentialImpact: 'High' | 'Medium' | 'Breakthrough';
}

