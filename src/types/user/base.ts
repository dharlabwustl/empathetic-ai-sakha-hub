
export enum UserRole {
  Student = 'student',
  Employee = 'employee',
  Doctor = 'doctor',
  Founder = 'founder',
  Admin = 'admin'
}

export enum SubscriptionType {
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise',
  Free = 'free',
  School = 'school',
  Corporate = 'corporate'
}

export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | 'anxious' | 'stressed' | 'tired' | 'focused' | 'overwhelmed' | 'curious' | 'okay';

export interface UserGoal {
  id: string;
  title: string;
  targetDate?: string;
  progress?: number;
}

export interface UserPermission {
  resource: string;
  actions: string[];
}

export interface UserSubscription {
  planType: SubscriptionType;
  startDate: string;
  endDate: string;
  isActive: boolean;
  expiryDate?: string;
  features?: string[];
}

export interface UserProfileBase {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  avatar?: string;
  createdAt?: string;
  goals?: UserGoal[];
  permissions?: UserPermission[];
  subscription?: UserSubscription | SubscriptionType;
  loginCount?: number;
  lastLogin?: string;
  streakDays?: number;
  mood?: MoodType;
  school?: string;
  grade?: string;
  bio?: string;
  socialLinks?: {
    [platform: string]: string;
  };
  joinDate?: string;
  personalityType?: string;
  location?: string; // Added location property
  gender?: string; // Added gender property
}

export type UserProfileType = UserProfileBase;
