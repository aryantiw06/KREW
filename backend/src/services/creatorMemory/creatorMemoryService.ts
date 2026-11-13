import { CreatorProfileModel } from '../../models/CreatorProfile';
import { ICreatorProfile } from '../../interfaces/ICreatorProfile';
import { isDbConnected, getPersistenceMode } from '../../config/database';

export interface CreatorDnaMetadata { profileVersion: number; lastSyncRequestedAt: Date | null; syncStatus: 'saved' | 'sync-requested'; persistenceMode: 'mongodb' | 'in-memory'; persistenceAcrossRestarts: boolean }
const profiles = new Map<string, ICreatorProfile>();
const metadata = new Map<string, CreatorDnaMetadata>();

function defaults(creatorId: string): ICreatorProfile {
  return { creatorId, creatorName: 'Kabir Sharma', handle: '@kabircreates', bio: '', contentNiche: ['Creator Economy'], primaryPlatforms: ['YouTube', 'Instagram'], targetAudience: { demographics: 'Digital creators', interests: [], painPoints: [] }, communicationTone: { primary: 'Cinematic and insightful', energyLevel: 'High Energy & Cinematic', formality: 'Story-driven' }, vocabularyPreferences: { signaturePhrases: [], bannedWords: [], jargonLevel: 'Moderate' }, storytellingStyle: { hookStyle: '', pacing: 'Fast-paced punchy', callToActionPreference: '' }, visualIdentity: { brandColors: { primary: '#0B0B10', secondary: '#15151D', accent: '#A855F7' }, thumbnailStyle: 'Bold Expressive Face + High Contrast', fontPreference: 'Space Grotesk + Inter' }, contentGuidelines: [], preferredVideoFormats: [], memorySyncStatus: 'saved', profileVersion: 1, lastSyncRequestedAt: null, updatedAt: new Date() };
}

export class CreatorMemoryService {
  getProfile(): ICreatorProfile { return profiles.get('demo-creator') || defaults('demo-creator'); }
  async getOrCreateProfile(creatorId: string): Promise<ICreatorProfile> {
    if (isDbConnected()) {
      const existing = await CreatorProfileModel.findOne({ creatorId }).lean();
      if (existing) return existing as unknown as ICreatorProfile;
      const doc = await CreatorProfileModel.create(defaults(creatorId));
      return doc.toObject() as unknown as ICreatorProfile;
    }
    let profile = profiles.get(creatorId);
    if (!profile) { profile = defaults(creatorId); profiles.set(creatorId, profile); }
    return profile;
  }

  async saveProfile(creatorId: string, input: ICreatorProfile): Promise<ICreatorProfile> {
    const current = await this.getOrCreateProfile(creatorId);
    const saved = { ...current, ...input, creatorId, profileVersion: (current.profileVersion || 0) + 1, memorySyncStatus: 'saved', updatedAt: new Date() };
    if (isDbConnected()) {
      const doc = await CreatorProfileModel.findOneAndUpdate({ creatorId }, { $set: saved }, { upsert: true, new: true, runValidators: true });
      return doc.toObject() as unknown as ICreatorProfile;
    }
    profiles.set(creatorId, saved);
    const old = metadata.get(creatorId);
    if (old) metadata.set(creatorId, { ...old, profileVersion: saved.profileVersion!, syncStatus: 'saved' });
    return saved;
  }

  async recordSyncRequest(creatorId: string): Promise<CreatorDnaMetadata> {
    const profile = await this.getOrCreateProfile(creatorId);
    const lastSyncRequestedAt = new Date();
    const mode = getPersistenceMode();
    const result: CreatorDnaMetadata = { profileVersion: profile.profileVersion || 1, lastSyncRequestedAt, syncStatus: 'sync-requested', persistenceMode: mode.mode, persistenceAcrossRestarts: mode.persistenceAcrossRestarts };
    if (isDbConnected()) await CreatorProfileModel.updateOne({ creatorId }, { $set: { lastSyncRequestedAt, memorySyncStatus: 'sync-requested' } });
    else profiles.set(creatorId, { ...profile, lastSyncRequestedAt, memorySyncStatus: 'sync-requested' });
    metadata.set(creatorId, result);
    return result;
  }

  async getMetadata(creatorId: string): Promise<CreatorDnaMetadata> {
    const persistence = getPersistenceMode();
    const mode = { persistenceMode: persistence.mode, persistenceAcrossRestarts: persistence.persistenceAcrossRestarts };
    if (metadata.has(creatorId)) return { ...metadata.get(creatorId)!, ...mode };
    if (isDbConnected()) {
      const profile = await CreatorProfileModel.findOne({ creatorId }).select('profileVersion lastSyncRequestedAt memorySyncStatus').lean();
      if (profile) return { profileVersion: profile.profileVersion || 1, lastSyncRequestedAt: profile.lastSyncRequestedAt || null, syncStatus: profile.memorySyncStatus === 'sync-requested' ? 'sync-requested' : 'saved', ...mode };
    }
    const profile = profiles.get(creatorId);
    return { profileVersion: profile?.profileVersion || 0, lastSyncRequestedAt: profile?.lastSyncRequestedAt || null, syncStatus: profile?.memorySyncStatus === 'sync-requested' ? 'sync-requested' : 'saved', ...mode };
  }
}

export const creatorMemoryService = new CreatorMemoryService();
