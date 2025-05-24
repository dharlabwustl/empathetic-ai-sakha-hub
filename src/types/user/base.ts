
export enum MoodType {
  HAPPY = 'happy',
  MOTIVATED = 'motivated',
  STRESSED = 'stressed',
  CONFIDENT = 'confident',
  ANXIOUS = 'anxious',
  EXCITED = 'excited',
  TIRED = 'tired',
  FOCUSED = 'focused',
  CALM = 'calm',
  CONFUSED = 'confused',
  OVERWHELMED = 'overwhelmed',
  NEUTRAL = 'neutral',
  SAD = 'sad',
  CURIOUS = 'curious',
  OKAY = 'okay'
}

export enum UserRole {
  Student = 'student',
  Admin = 'admin', 
  Teacher = 'teacher'
}

export type SubscriptionTypeValue = 'free' | 'basic' | 'premium' | 'pro' | 'enterprise' | 'pro_monthly' | 'pro_yearly' | 'group';

export type SubscriptionType = SubscriptionTypeValue;

export enum StudyPlanStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  DRAFT = 'draft'
}

export interface StudyPlanTopic {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  estimatedTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StudyPlan {
  id: string;
  title: string;
  description?: string;
  status: StudyPlanStatus;
  topics: StudyPlanTopic[];
  startDate?: Date;
  endDate?: Date;
  progressPercent: number;
  estimatedHours?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

export interface MoodTheme {
  background: string;
  textColor: string;
}

export interface UserSubscription {
  id: string;
  planType: SubscriptionTypeValue;
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  amount: number;
  currency: string;
  batchName?: string;
  batchId?: string;
  maxMembers?: number;
}

export interface UserGoal {
  id: string;
  title: string;
  description?: string;
  targetDate?: Date;
  progress?: number;
  isActive?: boolean;
}

export interface UserProfileBase {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
  photoURL?: string;
  examPreparation?: string;
  examGoal?: string;
  goals?: UserGoal[];
  loginCount?: number;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  currentMood?: MoodType;
  mood?: MoodType;
  role?: UserRole;
  subscription?: UserSubscription | SubscriptionTypeValue;
  studyStreak?: number;
  studyHoursToday?: number;
  completionRate?: number;
  lastActive?: string;
  preferences?: {
    theme?: 'light' | 'dark';
    language?: string;
    notifications?: boolean;
  };
}

export type UserProfileType = UserProfileBase;
