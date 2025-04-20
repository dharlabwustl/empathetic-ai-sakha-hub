
export interface UserSubscription {
  planId: string;
  planType: "free" | "basic" | "premium" | "enterprise" | "school" | "corporate";
  batchCode?: string;
  batchName?: string;
  startDate?: string;
  endDate?: string;
  role?: "member" | "leader" | "admin";
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
