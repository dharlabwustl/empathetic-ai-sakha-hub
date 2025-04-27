
export enum UserRole {
  Student = "student",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder",
  Admin = "admin",
}

export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Pro = "pro",
  Standard = "standard",
  School = "school",
  Corporate = "corporate",
}

export type MoodType = 'happy' | 'sad' | 'motivated' | 'neutral' | 'anxious' | 'overwhelmed' | 'curious' | 'okay';

export interface UserGoal {
  id: string;
  title: string;
  progress: number;
}

export interface UserSubscription {
  planType: SubscriptionType | string;
  isActive?: boolean;
  startDate?: string;
  expiryDate?: string;
  features?: string[];
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  goals?: UserGoal[];
  subscription?: UserSubscription | string;
  examPreparation?: string;
  personalityType?: string;
  loginCount?: number;
}

export type UserProfileType = UserProfileBase;

export interface MoodTheme {
  label: string;
  emoji: string;
  colors: {
    primary: string;
    secondary: string;
  };
  gradientClass: string;
  buttonClass: string;
}
