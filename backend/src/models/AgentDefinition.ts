import { Schema, model, Document } from 'mongoose';

export interface AgentDefinitionDocument extends Document {
  role: string;
  name: string;
  cinematicRole: string;
  technicalIdentity: string;
  personality: string;
  tagline: string;
  color: string;
  responsibilities: string[];
  inputContract: string[];
  outputContract: string[];
  statusNote: string;
}

const AgentDefinitionSchema = new Schema<AgentDefinitionDocument>(
  {
    role: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    cinematicRole: { type: String, required: true },
    technicalIdentity: { type: String, required: true },
    personality: { type: String, required: true },
    tagline: { type: String, required: true },
    color: { type: String, required: true },
    responsibilities: [{ type: String }],
    inputContract: [{ type: String }],
    outputContract: [{ type: String }],
    statusNote: { type: String, default: 'Designed for live-sprint implementation.' }
  },
  {
    timestamps: true
  }
);

export const AgentDefinitionModel = model<AgentDefinitionDocument>('AgentDefinition', AgentDefinitionSchema);
