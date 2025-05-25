
// Enhanced user types with proper exports
export enum UserRole {
  Student = "student",
  Admin = "admin",
  Teacher = "teacher"
}

export enum MoodType {
  EXCITED = "excited",
  MOTIVATED = "motivated", 
  FOCUSED = "focused",
  RELAXED = "relaxed",
  STRESSED = "stressed",
  OVERWHELMED = "overwhelmed",
  CONFIDENT = "confident",
  ANXIOUS = "anxious"
}

export enum SubscriptionType {
  FREE = "free",
  PRO = "pro",
  PREMIUM = "premium"
}

export interface UserProfileType {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
  photoURL?: string;
  role: UserRole;
  subscription?: SubscriptionType | {
    planType: string;
    expiryDate?: string;
  };
  goals?: Array<{
    id: string;
    title: string;
    targetDate: string;
  }>;
  loginCount?: number;
  createdAt?: string;
  lastLoginAt?: string;
}

// Fix for missing exports
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  color: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed?: boolean;
  type: string;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  bestValue?: boolean;
  isExamCredits?: boolean;
}

export interface MoodTheme {
  background: string;
  textColor?: string;
}
