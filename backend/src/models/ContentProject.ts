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
    status: {
      type: String,
      enum: ['draft', 'in_production', 'review_ready', 'scheduled', 'completed'],
      default: 'in_production'
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
