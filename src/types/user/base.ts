
// Define as both type and enum for UserRole
export type UserRole = "student" | "parent" | "teacher" | "admin";

// Create an enum that can be used as values
export enum UserRoleEnum {
  Student = "student",
  Parent = "parent",
  Teacher = "teacher",
  Admin = "admin"
}

export type MoodType = "happy" | "motivated" | "focused" | "curious" | "neutral" | "tired" | "stressed" | "sad" | "overwhelmed" | "okay";

export interface UserBasicInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  currentMood?: MoodType;
  moodHistory?: Array<{
    mood: MoodType;
    timestamp: string;
  }>;
  // Add missing properties referenced in components
  joinDate?: string;
  personalityType?: PersonalityType;
  areasOfInterest?: Array<{ id: string; name: string; level: string }>;
  loginCount?: number;
  completedOnboarding?: boolean;
  bio?: string;
  phoneNumber?: string;
}

// Define as both type and enum for SubscriptionType
export type SubscriptionType = "free" | "basic" | "premium" | "enterprise";

// Create an enum that can be used as values
export enum SubscriptionTypeEnum {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Enterprise = "enterprise"
}

export type PersonalityType = "visual" | "auditory" | "kinesthetic" | "reading" | "analytical" | "creative" | "practical" | "social" | "independent";

// Role-specific types
export type StudentProfile = UserBasicInfo & {
  role: "student";
  grade?: string;
  subjects?: string[];
  goals?: {
    id: string;
    title: string;
    progress: number;
    description?: string;
  }[];
  subscription?: SubscriptionType;
  personality?: PersonalityType;
  achievements?: string[];
};

export type ParentProfile = UserBasicInfo & {
  role: "parent";
  children?: string[];
  subscription?: SubscriptionType;
  goals?: {
    id: string;
    title: string;
    progress: number;
  }[];
};

export type TeacherProfile = UserBasicInfo & {
  role: "teacher";
  subjects?: string[];
  classes?: string[];
  subscription?: SubscriptionType;
  specializations?: string[];
  goals?: {
    id: string;
    title: string;
    progress: number;
  }[];
};

export type AdminProfile = UserBasicInfo & {
  role: "admin";
  permissions?: string[];
  department?: string;
  subscription?: SubscriptionType;
  goals?: {
    id: string;
    title: string;
    progress: number;
  }[];
};

export type UserProfile = StudentProfile | ParentProfile | TeacherProfile | AdminProfile;
export type UserProfileType = StudentProfile | ParentProfile | TeacherProfile | AdminProfile;
