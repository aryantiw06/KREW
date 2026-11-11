import { ContentProject } from '../types/project.types';

export const SAMPLE_PROJECTS: ContentProject[] = [
  {
    id: 'proj-001',
    title: 'The Death of the Solo Creator: Why Autonomous AI Crews are Winning in 2026',
    description: 'A deep-dive video essay exploring how modern digital filmmakers and YouTubers use collaborative AI agents to scale quality without burnout.',
    sourceType: 'raw_video',
    sourceFileName: 'master_essay_ai_crews_4k_prores.mov',
    sourceDuration: 885, // 14 mins 45 secs
    fileSizeBytes: 2450000000,
    status: 'review_ready',
    targetPlatforms: ['YouTube', 'Instagram', 'LinkedIn'],
    activeAgents: ['director', 'writer', 'editor', 'cinematographer', 'publicist'],
    pipelineStep: 4,
    createdAt: '2026-11-09T08:15:00Z',
    updatedAt: '2026-11-11T12:00:00Z',
    clipsCount: 4,
    thumbnailCount: 3
  },
  {
    id: 'proj-002',
    title: 'Deconstructing Christopher Nolan’s Sound Design for Mobile Screens',
    description: 'Analyzing frequency curves, dynamic range compression, and dialogue clarity when translating blockbuster audio to phone speakers.',
    sourceType: 'raw_video',
    sourceFileName: 'nolan_audio_breakdown_raw.mp4',
    sourceDuration: 620, // 10 mins 20 secs
    fileSizeBytes: 1240000000,
    status: 'in_production',
    targetPlatforms: ['YouTube', 'Instagram', 'LinkedIn'],
    activeAgents: ['director', 'writer', 'editor'],
    pipelineStep: 3,
    createdAt: '2026-11-10T11:30:00Z',
    updatedAt: '2026-11-11T16:20:00Z',
    clipsCount: 3,
    thumbnailCount: 2
  },
  {
    id: 'proj-003',
    title: 'Why Bollywood Film Sets Produce the World’s Most Resilient Creative Workforces',
    description: 'A cultural and operational comparison between large-scale Mumbai film sets and agile Silicon Valley AI development teams.',
    sourceType: 'topic_brief',
    sourceFileName: 'concept_brief_bollywood_crews.pdf',
    status: 'draft',
    targetPlatforms: ['YouTube', 'LinkedIn'],
    activeAgents: ['director', 'writer'],
    pipelineStep: 1,
    createdAt: '2026-11-11T09:00:00Z',
    updatedAt: '2026-11-11T14:45:00Z',
    clipsCount: 0,
    thumbnailCount: 0
  },
  {
    id: 'proj-004',
    title: 'Camera Sensors in 2026: Does 8K Actually Matter for Short-Form Video?',
    description: 'Laboratory crop tests and bitrate breakdown comparing flagship mirrorless footage downscaled for social platforms.',
    sourceType: 'raw_video',
    sourceFileName: 'sensor_benchmarks_8k_vs_4k.mp4',
    sourceDuration: 740,
    fileSizeBytes: 1800000000,
    status: 'scheduled',
    targetPlatforms: ['YouTube', 'Instagram', 'Facebook'],
    activeAgents: ['director', 'publicist', 'producer'],
    pipelineStep: 5,
    createdAt: '2026-11-04T10:00:00Z',
    updatedAt: '2026-11-08T18:30:00Z',
    clipsCount: 5,
    thumbnailCount: 4
  }
];
