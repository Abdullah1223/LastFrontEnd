export type UserRole = 'artist' | 'fan' | 'judge' | 'admin';

export interface UserPermissions {
  canJudge: boolean;
  canSubmit: boolean;
  canVote: boolean;
  canDonate: boolean;
  canModerate: boolean;
  isAdmin?: boolean;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  handle: string;
  bio: string;
  followers: number;
  following: boolean;
  donations?: number;
  permissions: UserPermissions;
}