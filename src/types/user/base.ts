
// Define base user profile types
export interface UserProfileBase {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  joinDate?: string;
  lastLogin?: string;
  loginCount?: number;
  goals?: Goal[];
  subjects?: string[];
  progress?: number;
  preferences?: UserPreferences;
  subscription?: SubscriptionType | Subscription;
  lastActive?: string;
  streak?: number;
  studyHours?: number;
  conceptsLearned?: number;
  testsCompleted?: number;
}

export interface Goal {
  id?: string;
  title: string;
  description?: string;
  targetDate?: string;
  progress?: number;
  subjects?: string[];
  chapters?: string[];
  concepts?: string[];
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
  studyReminders?: boolean;
  timezone?: string;
  language?: string;
}

export enum MoodType {
  Motivated = 'motivated',
  Focused = 'focused',
  Tired = 'tired',
  Anxious = 'anxious',
  Stressed = 'stressed',
  Happy = 'happy',
  Curious = 'curious',
  Confused = 'confused',
  Overwhelmed = 'overwhelmed',
  Neutral = 'neutral',
  Okay = 'okay',
  Sad = 'sad',
  Bored = 'bored',
}

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise',
}

export interface Subscription {
  planType: SubscriptionType | string;
  startDate?: string;
  expiryDate?: string;
  amount?: number;
  status?: 'active' | 'expired' | 'paused';
  autoRenew?: boolean;
  features?: string[];
  discount?: number;
  paymentMethod?: string;
}

export enum UserRole {
  Student = 'student',
  Instructor = 'instructor',
  Admin = 'admin'
}

export type UserProfileType = UserProfileBase;
