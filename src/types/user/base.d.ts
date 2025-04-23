
import { UserSubscription } from './subscription';

export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated';

export type UserRole = 'student' | 'teacher' | 'admin' | 'parent';

export interface UserGoal {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  progress?: number;
}

export interface SubscriptionType {
  id?: string;
  plan?: string;
  expiresAt?: string;
  isActive?: boolean;
  features?: string[];
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
  goals?: UserGoal[];
  subscription?: string | UserSubscription;
  loginCount?: number;
  lastLogin?: string;
  isVerified?: boolean;
  isPremium?: boolean;
  isOnboardingComplete?: boolean;
  isGroupLeader?: boolean;
  batchName?: string;
  batchCode?: string;
  batchMembers?: number;
  preferredLanguage?: string;
  subjects?: string[];
  preferences?: Record<string, any>;
  badges?: string[];
  achievements?: string[];
  streakDays?: number;
  totalStudyHours?: number;
  completedLessons?: number;
  completedQuizzes?: number;
  accuracyRate?: number;
  mood?: MoodType;
}
