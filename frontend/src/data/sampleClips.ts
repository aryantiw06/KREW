import { ClipSegment } from '../types/clip.types';

export const SAMPLE_CLIPS: ClipSegment[] = [
  {
    id: 'clip-001',
    projectId: 'proj-001',
    title: 'The Bollywood Film Star Illusion',
    startTime: 142,
    endTime: 198,
    duration: 56,
    suggestedHook: 'You think Shah Rukh Khan makes the movie alone? Let me show you what happens behind the camera.',
    summary: 'Kabir compares solo YouTubers to actors attempting to direct, write, light, and distribute their own film without a crew.',
    platformFormat: '9:16 Vertical',
    targetPlatforms: ['Instagram Reels', 'YouTube Shorts', 'TikTok'],
    viralPotentialScore: 94,
    speakerEmotion: 'Dramatic',
    transcriptSnippet: 'Think about a film set. The actor is the star, yes. But who wrote the dialogue? Who balanced the lighting? Who edited the timeline? When you try to be all six people as a creator, you don’t scale—you burn out.',
    isApproved: true,
    status: 'approved'
  },
  {
    id: 'clip-002',
    projectId: 'proj-001',
    title: 'Why AI Agents Beat Standalone Tools',
    startTime: 320,
    endTime: 368,
    duration: 48,
    suggestedHook: 'Stop paying for 7 different AI subscriptions that cannot talk to each other.',
    summary: 'Explanation of how fragmented creative tooling creates friction versus a collaborative multi-agent workforce.',
    platformFormat: '9:16 Vertical',
    targetPlatforms: ['Instagram Reels', 'YouTube Shorts', 'LinkedIn Video'],
    viralPotentialScore: 89,
    speakerEmotion: 'Provocative',
    transcriptSnippet: 'The real bottleneck in 2026 isn’t generating words or pictures. It’s the context loss between your script tool, your video cutter, and your distribution scheduler. That’s why a shared Creator DNA changes everything.',
    isApproved: false,
    status: 'suggested'
  },
  {
    id: 'clip-003',
    projectId: 'proj-001',
    title: 'The 3-Second Retention Rule in 2026',
    startTime: 512,
    endTime: 554,
    duration: 42,
    suggestedHook: 'If your first frame doesn’t pose an unanswered visual question, your viewer is already gone.',
    summary: 'Cinematographer and Editor breakdown on psychological friction in mobile social feeds.',
    platformFormat: '9:16 Vertical',
    targetPlatforms: ['YouTube Shorts', 'TikTok'],
    viralPotentialScore: 86,
    speakerEmotion: 'Insightful',
    transcriptSnippet: 'Notice what happens in the first three seconds here. We didn’t say hello. We didn’t introduce ourselves. We placed the paradox front and center on screen before the audio track even peaked.',
    isApproved: true,
    status: 'approved'
  },
  {
    id: 'clip-004',
    projectId: 'proj-001',
    title: 'Autonomous Creator Squads: The Math',
    startTime: 710,
    endTime: 765,
    duration: 55,
    suggestedHook: 'How one creator produced 32 high-retention assets from a single 15-minute studio recording.',
    summary: 'Concrete breakdown of the multiplication factor when Director, Editor, and Publicist work collaboratively.',
    platformFormat: '9:16 Vertical',
    targetPlatforms: ['LinkedIn Video', 'Instagram Reels'],
    viralPotentialScore: 91,
    speakerEmotion: 'Excited',
    transcriptSnippet: 'One recording session. Four vertical reels, three YouTube thumbnail variations, platform-native copy for LinkedIn and Twitter, and a scheduled 2-week campaign. That’s the KREW equation.',
    isApproved: false,
    status: 'suggested'
  }
];

