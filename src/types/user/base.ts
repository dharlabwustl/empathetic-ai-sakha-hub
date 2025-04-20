
import { SubscriptionType } from "./index";

export interface UserSubscription {
  planId?: string;
  planType: SubscriptionType;
  batchCode?: string;
  batchName?: string;
  startDate?: string;
  endDate?: string;
  role?: "member" | "leader" | "school_admin" | "corporate_admin";
}

export interface UserProfileType {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  bio?: string;
  avatar?: string;
  personalityType?: string;
  goals?: {
    id: string;
    title: string;
    description?: string;
    progress?: number;
    status?: "completed" | "in-progress" | "not-started";
    dueDate?: string;
    targetDate?: Date;
  }[];
  areasOfInterest?: {
    id: string;
    name: string;
    level?: string;
  }[];
  subscription?: SubscriptionType | UserSubscription;
  joinDate?: string;
  lastActive?: string;
  gender?: "male" | "female" | "other";
  phoneNumber?: string;
  examPreparation?: string;
  loginCount?: number;
  completedOnboarding?: boolean;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  education?: {
    level?: string;
    institution?: string;
    fieldOfStudy?: string;
    graduationYear?: number;
  };
  // Add firstName and lastName fallbacks for backward compatibility
  firstName?: string;
  lastName?: string;
}

export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Admin = "admin",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder"
}

export type MoodType = 
  | "happy"
  | "sad"
  | "tired"
  | "motivated"
  | "focused"
  | "stressed"
  | "overwhelmed"
  | "curious"
  | "neutral"
  | "okay";

// Changed to type string
export type PersonalityType = string;
