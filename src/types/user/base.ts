
export interface UserSubscription {
  planId: string;
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
  }[];
  areasOfInterest?: {
    id: string;
    name: string;
  }[];
  subscription?: UserSubscription;
  joinDate?: string;
  gender?: "male" | "female" | "other";
  phoneNumber?: string;
  examPreparation?: string;
  loginCount?: number;
  completedOnboarding?: boolean;
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

export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Enterprise = "enterprise",
  School = "school",
  Corporate = "corporate"
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  description?: string;
  type: SubscriptionType;
  maxMembers?: number;
}

export interface PersonalityType {
  id: string;
  name: string;
  description: string;
}
