
export type UserRole = 'student' | 'tutor' | 'admin' | 'parent';

export type MoodType = 'happy' | 'sad' | 'neutral' | 'motivated' | 'tired' | 'stressed' | 'focused' | 'curious' | 'overwhelmed' | 'okay';

export type PersonalityType = string;

export type SubscriptionType = 
  | 'free'
  | 'basic'
  | 'premium'
  | 'pro'
  | 'elite'
  | 'group';

export interface UserGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  examDate?: string;
  progress: number;
  status: 'active' | 'completed' | 'abandoned';
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  lastWeekProgress?: number;
  weakTopics?: string[];
  strongTopics?: string[];
}

export interface StudyStreak {
  current: number;
  best: number;
  lastStudyDate: string;
  thisWeek: number;
  thisMonth: number;
}

export interface UserSubscription {
  id: string;
  plan: SubscriptionType;
  status: 'active' | 'inactive' | 'pending' | 'expired';
  expiresAt: string;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  goals?: UserGoal[];
  examDate?: string;
  subscription?: UserSubscription | SubscriptionType;
  createdAt?: string;
  updatedAt?: string;
  loginCount?: number;
  lastLogin?: string;
  studyStreak?: StudyStreak;
  subjects?: Subject[];
  batchName?: string;
  batchCode?: string;
  isGroupLeader?: boolean;
  examPreparation?: {
    target: string;
    examDate: string;
    subjects: string[];
  };
}

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  subscription?: UserSubscription | SubscriptionType;
};
