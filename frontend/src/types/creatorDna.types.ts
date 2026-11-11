export interface CreatorDnaProfile {
  id: string;
  creatorName: string;
  handle: string;
  bio: string;
  contentNiche: string[];
  primaryPlatforms: ('YouTube' | 'Instagram' | 'LinkedIn' | 'Facebook' | 'TikTok' | 'Podcast')[];
  targetAudience: {
    demographics: string;
    interests: string[];
    painPoints: string[];
  };
  communicationTone: {
    primary: string; // e.g. "Authoritative yet relatable"
    energyLevel: 'Calm & Reflective' | 'High Energy & Cinematic' | 'Conversational & Witty' | 'Technical & Deep';
    formality: 'Casual' | 'Semi-formal' | 'Story-driven';
  };
  vocabularyPreferences: {
    signaturePhrases: string[];
    bannedWords: string[];
    jargonLevel: 'Low' | 'Moderate' | 'High';
  };
  storytellingStyle: {
    hookStyle: string;
    pacing: 'Fast-paced punchy' | 'Cinematic documentary' | 'Step-by-step masterclass';
    callToActionPreference: string;
  };
  visualIdentity: {
    brandColors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    thumbnailStyle: 'Bold Expressive Face + High Contrast' | 'Minimalist Aesthetic' | 'Documentary Film Still' | 'Infographic Overlay';
    fontPreference: string;
  };
  contentGuidelines: string[];
  preferredVideoFormats: string[];
  memorySyncStatus: 'Initialized' | 'Syncing' | 'Live Memory Ready';
  updatedAt: string;
}
