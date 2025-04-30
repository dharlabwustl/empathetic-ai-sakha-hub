
export enum MoodType {
  Happy = "happy",
  Focused = "focused",
  Tired = "tired",
  Stressed = "stressed",
  Okay = "okay",
  Overwhelmed = "overwhelmed",
  Anxious = "anxious",
  Motivated = "motivated",
  Confused = "confused",
  Calm = "calm",
  Neutral = "neutral",
  Sad = "sad",
  Curious = "curious"
}

export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Admin = "admin"
}

export type SubscriptionType = 'free' | 'basic' | 'premium' | 'pro_monthly' | 'pro_annual' | 'enterprise' | 'trial' | 'custom';

export interface UserSubscription {
  planType: SubscriptionType;
  startDate?: string;
  expiryDate?: string;
  features?: string[];
  status?: 'active' | 'expired' | 'pending';
  autoRenew?: boolean;
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  avatar?: string;
  loginCount?: number;
  lastLogin?: string;
  subscription?: UserSubscription | SubscriptionType;
  profileCompleted?: boolean;
  onboardingCompleted?: boolean;
  streak?: number;
  studyHours?: number;
  conceptsLearned?: number;
  testsCompleted?: number;
  goals?: Array<{
    id: string;
    title: string;
    targetDate?: string;
    progress?: number;
  }>;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super_admin";
  permissions?: string[];
}

export interface UserWithPreferences extends UserProfileBase {
  preferences: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    studyPreferences?: {
      preferredTimeOfDay?: string[];
      preferredDaysOfWeek?: string[];
      preferredSessionDuration?: number;
    };
  };
}

export enum TaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
  Missed = "missed",
  Partial = "partial"
}
