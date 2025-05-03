
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Admin = "admin"
}

export enum MoodType {
  Energetic = "energetic",
  Focused = "focused",
  Calm = "calm",
  Tired = "tired",
  Anxious = "anxious",
  Motivated = "motivated",
  Distracted = "distracted",
  Bored = "bored"
}

export interface UserGoal {
  id: string;
  title: string;
  type: string;
  targetDate?: string;
  status: "active" | "completed" | "paused";
  progress: number;
}

export interface UserScore {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface UserProfileBase {
  id?: string;
  name: string;
  email?: string;
  mobile?: string;
  role?: UserRole;
  goals?: UserGoal[];
  scores?: UserScore[];
  loginCount?: number;
  createdAt?: string;
  lastLoginAt?: string;
  profileImage?: string;
  currentMood?: MoodType;
  personalityType?: PersonalityType;
  studyStreak?: number;
  targetExamDate?: string;
  examGoal?: string;
  subscription?: SubscriptionType | SubscriptionDetails;
  badges?: string[];
  hasStudyPlan?: boolean;
  hasSeenTour?: boolean;
}

export interface UserProfileType extends UserProfileBase {
  demographics?: Record<string, string>;
  habits?: Record<string, string>;
  interests?: string;
  lastStudySession?: string;
  studyPace?: string;
  studyTime?: string;
  dailyStudyHours?: number;
  mood?: MoodType;
}

export type PersonalityType = "Analyzer" | "Creative" | "Perfectionist" | "Explorer";

export type SubscriptionType = "free" | "basic" | "premium" | "pro" | "group";

export interface SubscriptionDetails {
  planType: SubscriptionType;
  startDate?: string;
  expiryDate?: string;
  status?: "active" | "expired" | "canceled" | "trial";
  autoRenew?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  type: SubscriptionType;
  name: string;
  price: number;
  currency: string;
  interval?: "month" | "year";
  description: string;
  features: string[];
  notIncluded: string[];
}
