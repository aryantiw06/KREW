import { Schema, model, Document } from 'mongoose';
import { IContentProject } from '../interfaces/IContentProject';

export interface ContentProjectDocument extends Omit<IContentProject, 'id'>, Document {}

const ContentProjectSchema = new Schema<ContentProjectDocument>(
  {
    creatorId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    sourceType: {
      type: String,
      enum: ['raw_video', 'topic_brief', 'podcast_audio', 'screen_recording'],
      default: 'raw_video'
    },
    sourceFileName: { type: String },
    sourceDuration: { type: Number },
    fileSizeBytes: { type: Number },
    fileMetadata: { type: Schema.Types.Mixed, default: {} },
    productionBrief: {
      objective: { type: String, default: '' },
      targetAudience: { type: String, default: '' },
      contentFormat: { type: String, default: '' },
      tone: { type: String, default: '' }
    },
    creativeWorkspace: {
      idea: { type: String, default: '' },
      outline: { type: String, default: '' },
      scriptDraft: { type: String, default: '' },
      talkingPoints: { type: [String], default: [] },
      creativeNotes: { type: String, default: '' }
    },
    thumbnailWorkspace: { type: Schema.Types.Mixed },
    status: {
      type: String,
      enum: ['draft', 'queued', 'in_production', 'review_ready', 'approved', 'archived'],
      default: 'draft'
    },
    targetPlatforms: [{ type: String }],
    activeAgents: [{ type: String }],
    pipelineStep: { type: Number, default: 1 }
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

export const ContentProjectModel = model<ContentProjectDocument>('ContentProject', ContentProjectSchema);

