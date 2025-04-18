
/**
 * Enum for user roles in the system
 */
export enum UserRole {
  Student = "student",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder",
  Admin = "admin"
}

/**
 * Types of moods a user can select
 */
export type MoodType = 
  | "motivated"
  | "curious" 
  | "neutral" 
  | "tired" 
  | "stressed" 
  | "focused" 
  | "happy" 
  | "okay" 
  | "overwhelmed" 
  | "sad";

/**
 * Types of personalities a user can have
 */
export type PersonalityType = 
  | "analytical" 
  | "creative" 
  | "practical" 
  | "social" 
  | "independent";

/**
 * User gender types
 */
export type GenderType = "male" | "female" | "other" | "prefer-not-to-say";

/**
 * Subscription type
 */
export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Enterprise = "enterprise"
}

/**
 * Base user profile type
 */
export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
  // Additional properties
  personalityType?: string;
  subscription?: SubscriptionType;
  subscriptionPlan?: string; // Added for subscription plan name
  subscriptionEndDate?: string; // Added for subscription end date
  joinDate?: string;
  lastActive?: string;
  phoneNumber?: string;
  gender?: GenderType;
  areasOfInterest?: Array<{id: string, name: string, level: string}>;
  goals: Array<{id: string, title: string, description?: string, progress: number, status?: string, dueDate?: string, targetDate?: Date}>;
  loginCount?: number;
  completedOnboarding?: boolean;
  examPreparation?: string;
  bio?: string;
  avatar?: string;
  institute?: string; // Added for institute
}
