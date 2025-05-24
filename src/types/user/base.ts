
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

export type SubscriptionTypeValue = 'free' | 'basic' | 'premium' | 'pro' | 'enterprise';

export interface UserSubscription {
  id: string;
  planType: SubscriptionTypeValue;
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  amount: number;
  currency: string;
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
  role?: 'student' | 'admin' | 'teacher';
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
