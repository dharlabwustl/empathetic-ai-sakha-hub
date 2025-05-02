
export enum MoodType {
  Happy = 'happy',
  Focused = 'focused',
  Tired = 'tired',
  Stressed = 'stressed',
  Curious = 'curious',
  Okay = 'okay',
  Overwhelmed = 'overwhelmed',
  Anxious = 'anxious',
  Motivated = 'motivated',
  Confused = 'confused',
  Neutral = 'neutral',
  Sad = 'sad',
  Calm = 'calm',
}

export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  PREMIUM = 'premium',
}

export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  phoneNumber?: string;
  role: 'student' | 'teacher' | 'admin';
  subscription?: SubscriptionType | {
    planType: string;
    startDate?: Date | string;
    expiryDate?: Date | string;
    status?: 'active' | 'expired' | 'cancelled';
    autoRenew?: boolean;
  };
  goals?: {
    id: string;
    title: string;
    description?: string;
    targetDate?: Date;
    progress?: number;
  }[];
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
    emailAlerts?: boolean;
    language?: string;
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
  lastLogin?: Date | string;
  loginCount?: number;
}

export type UserProfileType = UserProfileBase;

// Additional types that might be useful
export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: Date;
}

export interface SubjectProgress {
  id?: string; // Added id property to fix TS error
  subject: string;
  progress: number;
  topicsTotal: number;
  topicsCompleted: number;
  quizzesCompleted: number;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'master';
}
