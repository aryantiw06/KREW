import { Schema, model, Document } from 'mongoose';

export interface DistributionPlanDocument extends Document {
  projectId: string;
  campaignTitle: string;
  scheduledDate: Date;
  posts: Record<string, any>;
  checklist: Array<{
    task: string;
    completed: boolean;
    assignedRole: string;
  }>;
}

const DistributionPlanSchema = new Schema<DistributionPlanDocument>(
  {
    projectId: { type: String, required: true, index: true },
    campaignTitle: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    posts: { type: Schema.Types.Mixed, default: {} },
    checklist: [
      {
        task: { type: String, required: true },
        completed: { type: Boolean, default: false },
        assignedRole: { type: String, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
);

export const DistributionPlanModel = model<DistributionPlanDocument>('DistributionPlan', DistributionPlanSchema);
