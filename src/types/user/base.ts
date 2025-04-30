
export enum UserRole {
  Admin = "admin",
  Student = "student",
  Doctor = "doctor",
  Founder = "founder",
  Employee = "employee"
}

export enum SubscriptionType {
  Free = "Free",
  Basic = "Basic",
  Premium = "Premium",
  Pro = "Pro",
  Enterprise = "Enterprise",
  Trial = "Trial",
  Custom = "Custom"
}

export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | 'anxious' | 'tired' | 'stressed' | 'focused' | 'curious' | 'okay' | 'overwhelmed';

export interface UserSubscription {
  planType: SubscriptionType;
  expiryDate?: string;
  features?: string[];
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  avatar?: string;
  avatarUrl?: string;
  loginCount?: number;
  subscription?: UserSubscription | SubscriptionType;
  phone?: string;
  goals?: { title: string; deadline?: string }[];
  lastActive?: string;
  createdAt?: string;
  bio?: string;
  streak?: number;
  studyHours?: number;
  conceptsLearned?: number;
  testsCompleted?: number;
  achievements?: string[];
  verified?: boolean;
}

// For backward compatibility
export type UserProfileType = UserProfileBase;
