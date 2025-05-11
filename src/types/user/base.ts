
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
  Parent = 'parent',
}

export enum PlanStatus {
  Active = 'active',
  Inactive = 'inactive',
  Completed = 'completed',
  Pending = 'pending',
}

export enum MoodType {
  Happy = 'Happy',
  Sad = 'Sad',
  Motivated = 'Motivated',
  Tired = 'Tired',
  Stressed = 'Stressed',
  Focused = 'Focused',
  Confused = 'Confused',
  Overwhelmed = 'Overwhelmed',
}

export enum SubscriptionType {
  FREE = 'free',
  PRO = 'pro',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

export interface UserSubscription {
  planType: SubscriptionType | string;
  expiryDate?: string;
  startDate?: string;
  features?: string[];
  isActive?: boolean;
  paymentMethod?: string;
  recurring?: boolean;
}

export interface UserExperience {
  level: number;
  points: number;
  badges?: string[];
  achievements?: string[];
}

export interface UserGoal {
  id: string;
  title: string;
  description?: string;
  targetDate?: Date;
  progress?: number;
  isCompleted?: boolean;
  createdAt?: Date;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
  emailNotifications?: boolean;
  studyReminders?: boolean;
  language?: string;
  timezone?: string;
  accessibility?: {
    highContrast?: boolean;
    largeText?: boolean;
    screenReader?: boolean;
  };
}

export interface UserPerformance {
  averageScore?: number;
  testsCompleted?: number;
  conceptsMastered?: number;
  studyStreak?: number;
  lastActivity?: Date;
  studyHours?: number;
  weeklyStudyHours?: number;
  monthlyProgress?: number;
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role: UserRole;
  isActive?: boolean;
  createdAt?: Date;
  lastLoginAt?: Date;
  subscription?: UserSubscription | string;
  goals?: UserGoal[];
  preferences?: UserPreferences;
  performance?: UserPerformance;
  loginCount?: number;
  firstName?: string;
  lastName?: string;
  bio?: string;
  studyPlan?: any;
  examDate?: string | Date;
}

export type UserProfileType = UserProfileBase & {
  [key: string]: any;
};
