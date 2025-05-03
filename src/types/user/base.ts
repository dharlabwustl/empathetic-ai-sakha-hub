
// File: src/types/user/base.ts
// Define base types for user profiles across the application

// User role enumeration
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin"
}

// Mood type enumeration
export enum MoodType {
  Happy = "Happy",
  Sad = "Sad",
  Focused = "Focused",
  Tired = "Tired",
  Motivated = "Motivated",
  Stressed = "Stressed",
  Curious = "Curious",
  Anxious = "Anxious",
  Confused = "Confused",
  Overwhelmed = "Overwhelmed",
  Neutral = "Neutral",
  Okay = "Okay",
  Calm = "Calm"
}

// Personality type enumeration
export enum PersonalityType {
  Visual = "visual",
  Auditory = "auditory",
  Reading = "reading",
  Kinesthetic = "kinesthetic"
}

// Subscription type enumeration
export enum SubscriptionType {
  FREE = "free",
  BASIC = "basic", 
  PRO = "pro",
  PREMIUM = "premium"
}

// Base user profile interface
export interface UserProfileBase {
  id?: string;
  name: string;
  email?: string;
  mobile?: string;
  role?: UserRole;
  avatar?: string;
  createdAt?: string;
  loginCount?: number;
  lastLogin?: string;
  onboardingCompleted?: boolean;
  personalityType?: PersonalityType;
  examPreference?: string;
  mood?: MoodType;
  goals?: Array<{ id: string; title: string; targetDate?: string }>;
  subscription?: SubscriptionType | {
    planType: SubscriptionType;
    startDate: string;
    expiryDate?: string;
    isAutoRenew?: boolean;
  };
}

// Extend for specific user types as needed
export type StudentProfile = UserProfileBase & {
  // Add student-specific properties here
  currentCourse?: string;
  schoolName?: string;
  grade?: string;
  examDate?: string;
};

export type TeacherProfile = UserProfileBase & {
  // Add teacher-specific properties here
  subjects?: string[];
  institution?: string;
  yearsOfExperience?: number;
};

export type AdminProfile = UserProfileBase & {
  // Add admin-specific properties here
  permissions?: string[];
  department?: string;
};
