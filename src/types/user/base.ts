
export enum MoodType {
  HAPPY = "happy",
  MOTIVATED = "motivated",
  FOCUSED = "focused",
  CALM = "calm",
  TIRED = "tired",
  CONFUSED = "confused",
  ANXIOUS = "anxious",
  STRESSED = "stressed",
  SAD = "sad",
  OVERWHELMED = "overwhelmed",
  NEUTRAL = "neutral",
  OKAY = "okay"
}

export enum SubscriptionType {
  FREE = "free",
  BASIC = "basic",
  PRO = "pro",
  ENTERPRISE = "enterprise"
}

export interface UserPreferences {
  theme?: "light" | "dark" | "system";
  sidebar?: boolean;
  notifications?: boolean;
  voiceEnabled?: boolean;
  language?: "en" | "hi" | "te" | "ta" | "kn" | "ml" | "bn" | "mr" | "gu" | "pa";
  sound?: boolean;
  email?: {
    marketing?: boolean;
    updates?: boolean;
    reminders?: boolean;
  };
  studyPreferences?: {
    preferredTopics?: string[];
    difficultyLevel?: "beginner" | "intermediate" | "advanced";
    studyDuration?: number;
    preferredDaysOfWeek?: Array<"mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun">;
    preferredTimeOfDay?: "morning" | "afternoon" | "evening" | "night";
  };
}

export interface BasePlan {
  id: string;
  name: string;
  features: string[];
  price?: number;
  billingCycle?: "monthly" | "yearly";
  currencyCode?: string;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  progress?: number;
  category?: string;
  status?: "active" | "completed" | "abandoned";
}

export interface Badge {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  unlockedAt?: string;
  category?: string;
  conditionMet?: boolean;
}

export interface UserProfileBase {
  id: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  role?: UserRole;
  preferences?: UserPreferences;
  subscription?: UserSubscription;
  emailVerified?: boolean;
  createdAt?: string;
  lastLogin?: string;
  loginCount?: number;
  goals?: Goal[];
  badges?: Badge[];
  tier?: "free" | "basic" | "premium" | "enterprise";
  isFirstTimeUser?: boolean;
}

export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Admin = "admin"
}

export interface UserSubscription {
  status: "active" | "inactive" | "trialing" | "past_due" | "canceled";
  plan?: BasePlan;
  startDate?: string;
  endDate?: string;
  trialEndsAt?: string;
  canceledAt?: string;
  paymentMethod?: "card" | "paypal" | "bank_transfer" | "upi";
  autoRenew?: boolean;
  type?: SubscriptionType;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}
