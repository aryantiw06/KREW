import { Schema, model, Document } from 'mongoose';
import { ICreatorProfile } from '../interfaces/ICreatorProfile';

export interface CreatorProfileDocument extends ICreatorProfile, Document {}

const CreatorProfileSchema = new Schema<CreatorProfileDocument>(
  {
    creatorId: { type: String, required: true, index: true },
    creatorName: { type: String, required: true },
    handle: { type: String, required: true },
    bio: { type: String, default: '' },
    contentNiche: [{ type: String }],
    primaryPlatforms: [{ type: String }],
    targetAudience: {
      demographics: { type: String, default: '' },
      interests: [{ type: String }],
      painPoints: [{ type: String }]
    },
    communicationTone: {
      primary: { type: String, default: 'Cinematic and insightful' },
      energyLevel: { type: String, default: 'High Energy & Cinematic' },
      formality: { type: String, default: 'Story-driven' }
    },
    vocabularyPreferences: {
      signaturePhrases: [{ type: String }],
      bannedWords: [{ type: String }],
      jargonLevel: { type: String, default: 'Moderate' }
    },
    storytellingStyle: {
      hookStyle: { type: String, default: '' },
      pacing: { type: String, default: 'Fast-paced punchy' },
      callToActionPreference: { type: String, default: '' }
    },
    visualIdentity: {
      brandColors: {
        primary: { type: String, default: '#0B0B10' },
        secondary: { type: String, default: '#15151D' },
        accent: { type: String, default: '#A855F7' }
      },
      thumbnailStyle: { type: String, default: 'Bold Expressive Face + High Contrast' },
      fontPreference: { type: String, default: 'Space Grotesk + Inter' }
    },
    contentGuidelines: [{ type: String }],
    preferredVideoFormats: [{ type: String }],
    memorySyncStatus: { type: String, default: 'saved' },
    profileVersion: { type: Number, default: 1, min: 1 },
  lastSyncRequestedAt: { type: Date, default: null }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const CreatorProfileModel = model<CreatorProfileDocument>('CreatorProfile', CreatorProfileSchema);

