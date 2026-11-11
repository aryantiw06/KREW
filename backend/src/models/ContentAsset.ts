import { Schema, model, Document } from 'mongoose';

export interface ContentAssetDocument extends Document {
  projectId: string;
  assetType: 'clip_segment' | 'thumbnail_concept' | 'script_outline' | 'platform_copy';
  title: string;
  metadata: Record<string, any>;
  isApproved: boolean;
  assignedAgent: string;
}

const ContentAssetSchema = new Schema<ContentAssetDocument>(
  {
    projectId: { type: String, required: true, index: true },
    assetType: {
      type: String,
      enum: ['clip_segment', 'thumbnail_concept', 'script_outline', 'platform_copy'],
      required: true
    },
    title: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    isApproved: { type: Boolean, default: false },
    assignedAgent: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const ContentAssetModel = model<ContentAssetDocument>('ContentAsset', ContentAssetSchema);

