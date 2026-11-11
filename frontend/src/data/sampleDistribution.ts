import { DistributionCampaign } from '../types/distribution.types';

export const SAMPLE_DISTRIBUTION_CAMPAIGN: DistributionCampaign = {
  id: 'dist-camp-001',
  projectId: 'proj-001',
  campaignTitle: 'Global Launch Campaign: The Autonomous AI Crew Era',
  scheduledDate: '2026-11-15T15:30:00Z',
  posts: {
    YouTube: {
      platform: 'YouTube',
      title: 'The Death of the Solo Creator: Why Autonomous AI Crews are Winning in 2026',
      caption: 'Why do we expect digital video creators to act as screenwriter, director, camera operator, audio engineer, thumbnail designer, and marketing publicist all at once?\n\nIn this video essay, I break down why the solo creator model is reaching its biological limit—and how autonomous multi-agent production crews are setting the new gold standard for digital cinema.\n\n⏱ Timestamps:\n00:00 The Star vs The Crew Illusion\n02:35 Why Context Loss Kills Creative Output\n06:14 The Six Production Roles Reimagined with AI\n10:45 Creator DNA: Memory Engines vs One-Off Prompts\n14:10 The Future of Autonomous Storytelling',
      hashtags: ['#CreatorEconomy', '#ArtificialIntelligence', '#DigitalFilmmaking', '#VideoProduction', '#KREW'],
      recommendedScheduleTime: 'Thursday 5:30 PM IST (12:00 PM UTC)',
      contentFormat: '16:9 4K Video (14m 45s) + Custom Thumbnail',
      charCountLimit: 5000,
      seoKeywords: ['AI video agents', 'autonomous creator workforce', 'digital video production 2026', 'creator burnout solutions'],
      status: 'approved'
    },
    Instagram: {
      platform: 'Instagram',
      title: 'The Bollywood Film Star Illusion (Reels Cut)',
      caption: 'You think Shah Rukh Khan makes the movie alone? 🎬\n\nThe actor is the star. But without the director, screenwriter, editor, cinematographer, publicist, and producer—there is no movie.\n\nSo why are digital creators still trying to do all six jobs alone in 2026?\n\nMeet KREW: your autonomous AI production workforce. Swipe through or drop a comment with your biggest production bottleneck below 👇',
      hashtags: ['#reelsvideo', '#filmmakerslife', '#aiworkflow', '#contentcreators', '#cinematography', '#creatoreconomy'],
      recommendedScheduleTime: 'Thursday 7:00 PM IST',
      contentFormat: '9:16 Vertical Reel (56s) + 1:1 Feed Cover',
      charCountLimit: 2200,
      seoKeywords: ['creator burnout', 'instagram reels strategy', 'content creator tips'],
      status: 'approved'
    },
    LinkedIn: {
      platform: 'LinkedIn',
      title: 'The Unbundling of the Creator Economy Workforce',
      caption: 'Over the last 10 years, the creator economy convinced individuals that "freedom" meant doing every single operational task by yourself.\n\nYou wrote the script at 2 AM.\nYou recorded at 10 AM.\nYou edited until 8 PM.\nYou designed a thumbnail at midnight.\nYou wrote captions and tags while exhausted.\n\nThat isn’t creative liberation. That’s operational fragmentation.\n\nIn our latest research essay, we examine how autonomous agent architectures are decoupling creative performance from operational execution.\n\nThe creator remains the director and star. Specialized AI agents handle the production pipeline.\n\nWhat is your team’s biggest bottleneck today?',
      hashtags: ['#FutureOfWork', '#ArtificialIntelligence', '#MediaTech', '#CreativeWorkforce', '#VentureCapital'],
      recommendedScheduleTime: 'Friday 9:00 AM IST',
      contentFormat: 'Document Post (Carousels) + 1080p Video Embed',
      charCountLimit: 3000,
      seoKeywords: ['creator workforce', 'AI agents future of work', 'multimodal video workflows'],
      status: 'ready'
    },
    Facebook: {
      platform: 'Facebook',
      title: 'Why One-Man Creative Studios are Transitioning to AI Crews',
      caption: 'A deep-dive look into how modern content producers and filmmakers are producing studio-grade multi-platform campaigns with autonomous AI crew members.\n\nWatch the full breakdown and see the workflow in action.',
      hashtags: ['#Filmmaking', '#CreativeTech', '#DigitalCreators', '#Storytelling'],
      recommendedScheduleTime: 'Friday 6:00 PM IST',
      contentFormat: 'Standard Feed Video Post',
      charCountLimit: 63206,
      seoKeywords: ['filmmakers community', 'video production masterclass'],
      status: 'draft'
    }
  },
  checklist: [
    { id: 'chk-1', task: 'Director reviewed master messaging and core audience alignment', completed: true, assignedRole: 'The Director' },
    { id: 'chk-2', task: 'Writer verified platform voice tone against Creator DNA banned list', completed: true, assignedRole: 'The Writer' },
    { id: 'chk-3', task: 'Editor confirmed 9:16 crop framing and safe title margins', completed: true, assignedRole: 'The Editor' },
    { id: 'chk-4', task: 'Cinematographer checked thumbnail contrast on mobile OLED screens', completed: true, assignedRole: 'The Cinematographer' },
    { id: 'chk-5', task: 'Publicist finalized SEO keywords and peak engagement publishing slots', completed: false, assignedRole: 'The Publicist' },
    { id: 'chk-6', task: 'Human Creator final sign-off and approval', completed: false, assignedRole: 'Creator (Star)' }
  ]
};
