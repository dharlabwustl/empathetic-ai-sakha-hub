
// User role enum
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
  Parent = "parent"
}

// Mood type enum
export enum MoodType {
  Happy = "happy",
  Motivated = "motivated",
  Focused = "focused",
  Calm = "calm",
  Tired = "tired",
  Confused = "confused",
  Anxious = "anxious",
  Stressed = "stressed",
  Overwhelmed = "overwhelmed",
  Neutral = "neutral",
  Okay = "okay",
  Sad = "sad"
}

// Subscription type enum
export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  School = "school",
  Enterprise = "enterprise"
}

// Base user profile interface
export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  loginCount?: number;
  createdAt?: string;
  lastLogin?: string;
  goals?: { id: string; title: string; targetDate?: string }[];
  subscription?: {
    planType: SubscriptionType | string;
    isActive?: boolean;
    startDate?: string;
    expiryDate?: string;
    features?: string[];
  } | string;
}

// Aliases for backward compatibility
export type UserProfileType = UserProfileBase;
