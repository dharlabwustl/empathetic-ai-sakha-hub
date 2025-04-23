
// Define the user roles enum
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
  Parent = "parent",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder"
}

// Define the subscription types
export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Pro = "pro",
  Elite = "elite",
  Group = "group",
  Enterprise = "enterprise"
}

// Define mood types
export type MoodType = 
  | "happy"
  | "sad" 
  | "neutral" 
  | "motivated" 
  | "tired" 
  | "stressed" 
  | "focused" 
  | "curious"
  | "overwhelmed"
  | "okay";

// Define personality types
export interface PersonalityType {
  type: string;
  traits: string[];
  learningStyle: string;
};

// Define goal status type
export type GoalStatus = "active" | "completed" | "abandoned" | "in_progress" | "not_started";

// Define user goal interface
export interface UserGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  targetDate: string;
  status: GoalStatus;
  examDate?: string; // Optional exam date
}

// Define study streak interface
export interface StudyStreak {
  current: number;
  best: number;
  lastStudyDate: string;
  thisWeek: number;
  thisMonth: number;
}

// Define user subscription interface
export interface UserSubscription {
  id: string;
  plan: string;
  expiresAt: string;
  status: string;
  planType?: SubscriptionType;
  isGroupLeader?: boolean;
  planName?: string;
  endDate?: string;
}

// Define exam preparation interface
export interface ExamPreparation {
  target: string;
  examDate: string;
  subjects: string[];
  daysLeft?: number;
  title?: string;
}

// Define the user profile type
export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  createdAt?: string;
  lastLogin?: string;
  onboarded?: boolean;
  loginCount?: number;
  completedOnboarding?: boolean;
  currentMood?: MoodType;
  personalityType?: PersonalityType;
  subscription?: UserSubscription | string;
  goals?: UserGoal[];
  subjects?: SubjectProgress[];
  studyStreak?: StudyStreak;
  examPreparation?: ExamPreparation | string;
  // Additional fields
  personalDetails?: {
    phoneNumber?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    dateOfBirth?: string;
    gender?: string;
    school?: string;
    grade?: string;
    board?: string;
    bio?: string;
    interests?: string[];
  };
  batchName?: string;
  batchCode?: string;
  isGroupLeader?: boolean;
  aiTutorHistory?: {
    lastSession?: string;
    totalSessions?: number;
    favoriteTopics?: string[];
    totalInteractions?: number;
  };
  // For doctor profile
  specialization?: string; 
  // For student profile
  peerRanking?: number;
  examDate?: string;
  school?: string;
  grade?: string;
  board?: string;
  city?: string;
  state?: string;
  // These were missing properties causing errors
  mood?: MoodType;
  totalStudyHours?: number;
  accuracyRate?: number;
  streakDays?: number;
  completedLessons?: number;
}

// Importing SubjectProgress from progress.ts to prevent circular dependencies
import { SubjectProgress } from "./progress";
