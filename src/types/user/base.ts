

export enum MoodType {
  Happy = 'happy',
  Focused = 'focused',
  Motivated = 'motivated',
  Tired = 'tired',
  Stressed = 'stressed',
  Confused = 'confused',
  Anxious = 'anxious',
  Overwhelmed = 'overwhelmed',
  Curious = 'curious',
  Bored = 'bored',
  Neutral = 'neutral',
  Okay = 'okay',
  Sad = 'sad'
}

export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Parent = 'parent',
  Admin = 'admin'
}

export type SubscriptionType = 'free' | 'basic' | 'premium' | 'pro';

export interface SubscriptionDetails {
  planType: SubscriptionType;
  startDate?: string;
  expiryDate?: string;
  autoRenew?: boolean;
  features?: string[];
}

export interface UserProfileBase {
  id?: string;
  name: string;
  email?: string;
  avatar?: string; 
  role?: string;
  level?: number;
  xp?: number;
  verified?: boolean;
  subscription?: SubscriptionType | SubscriptionDetails;
  onboardingComplete?: boolean;
  createdAt?: string;
  updatedAt?: string;
  loginCount?: number;
  lastActive?: string;
  streak?: number;
  studyHours?: number;
  conceptsLearned?: number;
  testsCompleted?: number;
  goals?: {
    id: string;
    title: string;
    targetDate?: string;
  }[];
  mood?: MoodType;
}

export interface UserPreferencesBase {
  theme?: 'light' | 'dark' | 'system';
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  };
  studyReminders?: boolean;
  weeklyReports?: boolean;
  language?: string;
}

export interface StudentProfile extends UserProfileBase {
  school?: string;
  grade?: string;
  targetExams?: string[];
  subjects?: string[];
  studyPreferences?: {
    preferredTimeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
    sessionDuration?: number;
    breakFrequency?: number;
    weeklyGoalHours?: number;
  };
}

export interface TeacherProfile extends UserProfileBase {
  school?: string;
  department?: string;
  subjects?: string[];
  yearsOfExperience?: number;
  bio?: string;
  credentials?: string[];
}

export interface ParentProfile extends UserProfileBase {
  children?: {
    id: string;
    name: string;
    grade?: string;
  }[];
  accessLevel?: 'full' | 'limited' | 'reports-only';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
}
