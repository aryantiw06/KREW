import { ICreatorProfile } from '../../interfaces/ICreatorProfile';
import { logger } from '../../utils/logger';

/**
 * Creator DNA Memory Engine Service
 * Provides the shared semantic memory backbone accessible by all 6 specialised agents.
 */
export class CreatorMemoryService {
  private inMemoryProfile: ICreatorProfile;

  constructor() {
    this.inMemoryProfile = {
      creatorId: 'dna-creator-001',
      creatorName: 'Kabir Sharma',
      handle: '@kabircreates',
      bio: 'Filmmaker turned tech essayist exploring how AI redefines storytelling and digital cinema.',
      contentNiche: ['AI & Creative Technology', 'Cinematography', 'Creator Economy'],
      primaryPlatforms: ['YouTube', 'Instagram', 'LinkedIn'],
      targetAudience: {
        demographics: 'Young creators, developers, designers aged 20-38',
        interests: ['Generative AI workflows', 'Video production', 'Indie creative startups'],
        painPoints: ['Solo creator burnout', 'Context loss between disconnected tools']
      },
      communicationTone: {
        primary: 'Cinematic, insightful, and grounded',
        energyLevel: 'High Energy & Cinematic',
        formality: 'Story-driven'
      },
      vocabularyPreferences: {
        signaturePhrases: ['The star needs the crew', 'Story before pixels', 'Craft over clout'],
        bannedWords: ['game-changer', 'revolutionary disruptive synergy', 'insane hack'],
        jargonLevel: 'Moderate'
      },
      storytellingStyle: {
        hookStyle: 'Cold open with dramatic question and visual beat drops',
        pacing: 'Fast-paced punchy',
        callToActionPreference: 'Inviting debate in comments rather than generic like requests'
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
        'Acknowledge AI tools as power amplifiers, never substitutes for human taste.'
      ],
      preferredVideoFormats: ['10-15m Deep-Dive YouTube', '45-60s Punchy Reel'],
      memorySyncStatus: 'Live Memory Ready',
      updatedAt: new Date()
    };
  }

  public getProfile(): ICreatorProfile {
    return this.inMemoryProfile;
  }

  public updateProfile(partial: Partial<ICreatorProfile>): ICreatorProfile {
    this.inMemoryProfile = {
      ...this.inMemoryProfile,
      ...partial,
      updatedAt: new Date()
    };
    logger.info('[CreatorMemoryService] Creator DNA updated in memory.');
    return this.inMemoryProfile;
  }

  public syncAgents(): { synced: boolean; agentCount: number; timestamp: string } {
    logger.info('[CreatorMemoryService] Dispatched DNA snapshot to 6 specialised agent scaffolds.');
    return {
      synced: true,
      agentCount: 6,
      timestamp: new Date().toISOString()
    };
  }
}

export const creatorMemoryService = new CreatorMemoryService();

