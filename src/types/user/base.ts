
export interface UserSubscription {
  planId: string;
  planType: "free" | "basic" | "premium" | "enterprise";
  batchCode?: string;
  batchName?: string;
  startDate?: string;
  endDate?: string;
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
}

export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Admin = "admin"
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

export interface SubscriptionType {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  description?: string;
}
