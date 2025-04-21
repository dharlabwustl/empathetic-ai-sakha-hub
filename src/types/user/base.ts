
export enum UserRole {
  Student = "student",
  Doctor = "doctor",
  Employee = "employee",
  Founder = "founder",
  Admin = "admin"
}

export enum SubscriptionType {
  Basic = "basic",
  Free = "free", // Added Free option since it's used in the code
  Premium = "premium",
  Elite = "elite",
  Enterprise = "enterprise"
}

export type MoodType = "happy" | "sad" | "neutral" | "motivated" | "tired" | "stressed" | "focused" | "curious" | "overwhelmed" | "okay";

export type GoalStatus = "not_started" | "in_progress" | "completed";

export interface Goal {
  id: string;
  title: string;
  description?: string;
  progress: number;
  status: GoalStatus;
  examDate?: string;
  targetDate?: Date;
  dueDate?: string; // Added dueDate since it's used in founderProfile
}

export interface UserSubscription {
  id: string;
  plan: string;
  planType?: SubscriptionType;
  expiresAt: string;
  status: "active" | "expired" | "cancelled" | "pending";
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  startDate: string;
  endDate: string;
  totalDaysStudied: number;
  weeklyConsistency: number;
  monthlyConsistency: number;
  lastMonth?: string[];
}

export interface AreaOfInterest {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export type PersonalityType = {
  type: string;
  traits: string[];
  learningStyle: string;
};

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
  lastLogin?: string;
  onboarded?: boolean;
  loginCount?: number;
  completedOnboarding?: boolean;
  personalityType?: PersonalityType;
  specialization?: string; // For doctor profile
  examPreparation?: string; // Added for AIChatTutor
  studyStreak?: StudyStreak; // Added for DashboardHeader
  
  // Subscription details
  subscription?: UserSubscription;

  // Academic details (mainly for students)
  subjects?: Subject[]; // Added for StudyProgress
  batchName?: string;
  batchCode?: string;
  isGroupLeader?: boolean;
  peerRanking?: number;
  examDate?: string;
  school?: string;
  grade?: string;
  board?: string;
  city?: string;
  state?: string;
  goals?: Goal[];
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  emailVerified?: boolean;
  profile?: UserProfileType;
  subscription?: UserSubscription; // Added for FounderDashboard
}
