
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Admin = "admin",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder"
}

export enum MoodType {
  Happy = "happy",
  Sad = "sad",
  Motivated = "motivated",
  Tired = "tired",
  Stressed = "stressed",
  Focused = "focused",
  Curious = "curious",
  Okay = "okay",
  Overwhelmed = "overwhelmed",
  Anxious = "anxious",
  Confused = "confused",
  Neutral = "neutral",
  Calm = "calm"
}

export enum SubscriptionType {
  FREE = "free",
  TRIAL = "trial",
  BASIC = "basic",
  PREMIUM = "premium",
  PRO_MONTHLY = "pro_monthly",
  PRO_ANNUAL = "pro_annual",
  GROUP_SMALL = "group_small",
  GROUP_MEDIUM = "group_medium",
  GROUP_LARGE = "group_large",
  ENTERPRISE = "enterprise"
}

export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  goals?: UserGoal[];
  subscription?: string | SubscriptionInfo;
  loginCount?: number;
  createdAt?: string;
  lastLogin?: string;
  image?: string;
  avatar?: string;
  pronouns?: string;
  isActive?: boolean;
  profile?: UserProfile;
  mood?: MoodType;
  personalityType?: PersonalityType;
}

export interface UserGoal {
  id: string;
  title: string;
  targetDate?: string;
  progress?: number;
}

export interface UserProfile {
  bio?: string;
  location?: string;
  interests?: string[];
  skills?: string[];
  education?: string[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
  permissions: string[];
}

export interface SubscriptionInfo {
  planType: string;
  expiryDate?: string;
  startDate?: string;
  isActive?: boolean;
  features?: string[];
}

export enum PersonalityType {
  Visual = "visual",
  Auditory = "auditory",
  ReadWrite = "readwrite",
  Kinesthetic = "kinesthetic",
  Mixed = "mixed"
}

export type UserProfileType = UserProfileBase;
