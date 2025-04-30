
export enum UserRole {
  Student = "student",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder",
  Admin = "admin"
}

export enum MoodType {
  Happy = "happy",
  Motivated = "motivated",
  Neutral = "neutral",
  Tired = "tired",
  Stressed = "stressed",
  Confused = "confused",
  Focused = "focused",
  Anxious = "anxious",
  Sad = "sad"
}

export enum PersonalityType {
  Visual = "visual",
  Auditory = "auditory",
  Reading = "reading",
  Kinesthetic = "kinesthetic"
}

export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  ProAnnual = "pro_annual",
  ProMonthly = "pro_monthly",
  Enterprise = "enterprise",
  Trial = "trial"
}

// Base user profile type
export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  goals?: { id: string; title: string }[];
  subscription?: SubscriptionType | { planType: string; expiryDate?: string };
  loginCount?: number;
  lastLogin?: string;
  createdAt?: string;
}

export type UserProfileType = UserProfileBase;
