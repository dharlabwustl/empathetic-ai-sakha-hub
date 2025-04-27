
export enum UserRole {
  Student = "student",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder",
  Admin = "admin",
}

export enum SubscriptionPlan {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Enterprise = "enterprise",
}

export type UserProfileBase = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  loginCount?: number;
};

export type StudentProfile = {
  goals?: { id: string; title: string; progress: number }[];
  examPreparation?: string;
  personalityType?: string;
  studyHabits?: string;
  learningPreferences?: string;
  subscription?: SubscriptionType | SubscriptionDetails;
};

export type SubscriptionDetails = {
  planId?: string;
  planType: SubscriptionType | string;
  isActive: boolean;
  startDate: string;
  expiryDate: string;
  features: string[];
};

export type UserProfileType = UserProfileBase & StudentProfile;

// Add MoodType enumeration
export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | 'focused' | 'tired' | 'confused' | 'anxious' | 'stressed' | 'overwhelmed' | 'curious' | 'okay';

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Enterprise = 'enterprise'
}
