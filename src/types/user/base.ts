
export enum UserRole {
  Student = 'student',
  Doctor = 'doctor',
  Admin = 'admin',
  Employee = 'employee',
  Founder = 'founder',
}

export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | undefined;

export interface Goal {
  id: string;
  title: string;
  description?: string;
  examDate?: string;
  progress?: number;
}

export interface Education {
  school?: string;
  grade?: string;
  board?: string;
  university?: string;
  degree?: string;
  year?: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface UserSubscription {
  id: string;
  plan: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'canceled' | 'pending';
}

export enum SubscriptionType {
  Free = 'Free',
  Basic = 'Basic',
  Premium = 'Premium',
  Enterprise = 'Enterprise',
  Group = 'Group',
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  role: UserRole | string;
  goals?: Goal[];
  education?: Education;
  address?: Address;
  subscription?: UserSubscription | SubscriptionType;
  studyStreak?: number;
  lastLogin?: string;
  loginCount?: number;
  language?: string;
  timezone?: string;
  isGroupLeader?: boolean;
  batchName?: string;
  batchCode?: string;
  peerRanking?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: UserRole | string;
  avatar?: string;
}
