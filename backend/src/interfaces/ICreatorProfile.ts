export interface ICreatorProfile {
  creatorId: string;
  creatorName: string;
  handle: string;
  bio: string;
  contentNiche: string[];
  primaryPlatforms: string[];
  targetAudience: {
    demographics: string;
    interests: string[];
    painPoints: string[];
  };
  communicationTone: {
    primary: string;
    energyLevel: string;
    formality: string;
  };
  vocabularyPreferences: {
    signaturePhrases: string[];
    bannedWords: string[];
    jargonLevel: string;
  };
  storytellingStyle: {
    hookStyle: string;
    pacing: string;
    callToActionPreference: string;
  };
  visualIdentity: {
    brandColors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    thumbnailStyle: string;
    fontPreference: string;
  };
  contentGuidelines: string[];
  preferredVideoFormats: string[];
  memorySyncStatus: string;
  profileVersion?: number;
  lastSyncRequestedAt?: Date | null;
  updatedAt: Date;
}

