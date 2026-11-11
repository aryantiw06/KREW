import { Schema, model, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

export interface UserDocument extends Omit<IUser, 'id'>, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    handle: { type: String, required: true },
    role: { type: String, enum: ['creator_star', 'collaborator', 'admin'], default: 'creator_star' },
    avatarUrl: { type: String }
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

export const UserModel = model<UserDocument>('User', UserSchema);
