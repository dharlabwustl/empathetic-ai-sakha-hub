
export enum UserRole {
  Student = 'student',
  Tutor = 'tutor',
  Admin = 'admin',
  Guest = 'guest'
}

export enum PersonalityType {
  Introvert = 'introvert',
  Extrovert = 'extrovert',
  Thinker = 'thinker',
  Feeler = 'feeler',
  Intuitive = 'intuitive',
  Sensor = 'sensor',
  Judger = 'judger',
  Perceiver = 'perceiver'
}

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
  Calm = 'calm'
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
  };
  subscription?: SubscriptionType | string | null;
  isSubscribed?: boolean;
  loginCount?: number;
  lastLogin?: Date;
  paymentMethods?: PaymentMethod[];
  billingHistory?: BillingRecord[];
  isBatchLeader?: boolean;
  batch?: {
    id: string;
    name: string;
  };
  studyStreak?: StudyStreak;
  examPreparation?: {
    examName: string;
    targetDate: string;
    subjects: string[];
  };
}

export interface SubjectProgress {
  subjectId: string;
  name: string;
  completedTopics: number;
  totalTopics: number;
  lastStudied?: Date;
}

export interface StudyStreak {
  startDate: Date;
  endDate: Date;
  days: number;
}

export interface SubscriptionType {
  type: string;
  isActive: boolean;
  planType: string;
  features: string[];
  memberLimit: number;
  startDate: string;
  endDate: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'other';
  details: any;
  isDefault: boolean;
}

export interface BillingRecord {
  id: string;
  date: Date;
  amount: number;
  description: string;
  status: 'paid' | 'failed' | 'pending';
}

export type SubscriptionTypeValue = 'free' | 'basic' | 'premium' | 'pro' | 'pro_monthly' | 'pro_yearly' | 'group';
export type UserProfileType = UserProfileBase;
