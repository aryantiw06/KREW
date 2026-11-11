import { CreatorDnaProfile } from '../types/creatorDna.types';

export const INITIAL_CREATOR_DNA: CreatorDnaProfile = {
  id: 'dna-creator-001',
  creatorName: 'Kabir Sharma',
  handle: '@kabircreates',
  bio: 'Filmmaker turned tech essayist. Explaining how artificial intelligence and creative autonomy will redefine cinema, storytelling, and digital culture in India and across the world.',
  contentNiche: [
    'AI & Creative Technology',
    'Cinematography & Film Direction',
    'Creator Economy Insights',
    'Tech Product Breakdowns'
  ],
  primaryPlatforms: ['YouTube', 'Instagram', 'LinkedIn'],
  targetAudience: {
    demographics: 'Young creators, developers, designers, and media founders aged 20-38 across South Asia and global diaspora.',
    interests: [
      'Generative AI workflows',
      'High-end video production gear',
      'Storytelling craft & screenwriting',
      'Building indie creative businesses'
    ],
    painPoints: [
      'Burning out from doing editing, scripting, and publishing alone',
      'Struggling to translate complex tech into cinematic, emotional stories',
      'Inconsistent distribution across multi-platform feeds'
    ]
  },
  communicationTone: {
    primary: 'Cinematic, insightful, deeply enthusiastic, yet grounded and honest.',
    energyLevel: 'High Energy & Cinematic',
    formality: 'Story-driven'
  },
  vocabularyPreferences: {
    signaturePhrases: [
      'The star needs the crew',
      'Cinematic framing in everyday life',
      'Story before pixels',
      'Craft over clout',
      'Let’s break down the frame'
    ],
    bannedWords: [
      'game-changer',
      'revolutionary disruptive synergy',
      'crush the algorithm',
      'insane hack you will not believe',
      'guru'
    ],
    jargonLevel: 'Moderate'
  },
  storytellingStyle: {
    hookStyle: 'Cold open with a dramatic visual question or philosophical paradox, followed by quick rhythmic beat drops.',
    pacing: 'Fast-paced punchy',
    callToActionPreference: 'Thought-provoking question inviting debate in the comments rather than desperate plea for likes.'
  },
  visualIdentity: {
    brandColors: {
      primary: '#0B0B10',
      secondary: '#15151D',
      accent: '#A855F7'
    },
    thumbnailStyle: 'Bold Expressive Face + High Contrast',
    fontPreference: 'Space Grotesk + Inter'
  },
  contentGuidelines: [
    'Every video must teach one actionable technical or creative principle.',
    'Never compromise on audio clarity and color grade authenticity.',
    'Acknowledge AI tools as power amplifiers, never substitutes for human taste.'
  ],
  preferredVideoFormats: [
    '10-15 min Long-Form Deep-Dive Essay (16:9 YouTube)',
    '45-60 sec Punchy Concept Reel (9:16 Instagram & Shorts)',
    'Detailed Slide-Deck Breakdown (1:1 LinkedIn PDF Carousel)'
  ],
  memorySyncStatus: 'Live Memory Ready',
  updatedAt: '2026-11-10T14:30:00Z'
};
