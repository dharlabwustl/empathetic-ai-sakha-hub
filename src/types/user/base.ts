
export enum UserRole {
  Student = "student",
  Doctor = "doctor",
  Employee = "employee",
  Founder = "founder",
  Admin = "admin"
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
}

export interface UserSubscription {
  id: string;
  plan: string;
  expiresAt: string;
  status: "active" | "expired" | "cancelled" | "pending";
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
}

export interface AreaOfInterest {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export type PersonalityType = 
  "Strategic Thinker" | 
  "Creative Builder" | 
  "Detailed Analyzer" | 
  "Energetic Explorer";

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
  
  // Subscription details
  subscription?: UserSubscription;

  // Academic details (mainly for students)
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
