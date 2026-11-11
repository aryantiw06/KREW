export interface IUser {
  id: string;
  name: string;
  email: string;
  handle: string;
  role: 'creator_star' | 'collaborator' | 'admin';
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

