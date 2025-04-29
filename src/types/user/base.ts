
export enum UserRole {
  Student = "student",
  Educator = "educator",
  Admin = "admin",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder"
}

export enum SubscriptionType {
  free = "free",
  premium = "premium",
  pro_student = "pro_student",
  pro_educator = "pro_educator"
}

export type MoodType = 'happy' | 'focused' | 'tired' | 'anxious' | 'stressed' | 'motivated' | 'neutral' | 'sad';

export interface UserSubscription {
  type: SubscriptionType;
  startDate: string;
  endDate: string;
  isActive: boolean;
  features: string[];
}

export interface UserGoal {
  id: string;
  title: string;
  progress: number;
  targetDate?: string;
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  profileImage?: string;
  loginCount?: number;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  goals?: UserGoal[];
  subscription?: UserSubscription;
  examPreparation?: string;
  preferences?: Record<string, any>;
}

export type UserProfileType = UserProfileBase;

export type UserAuthStatus = "authenticated" | "unauthenticated" | "loading";
