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
export type PersonalityType = {
  type: string;
  traits: string[];
  learningStyle: string;
};

// Define goal status type
export type GoalStatus = "active" | "completed" | "abandoned" | "in_progress";

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

// Define user subscription interface
export interface UserSubscription {
  id: string;
  plan: string;
  expiresAt: string;
  status: string;
}

// Define exam preparation interface
export interface ExamPreparation {
  target: string;
  examDate: string;
  subjects: string[];
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
  subscription?: UserSubscription;
  goals?: UserGoal[];
  subjects?: SubjectProgress[];
  studyStreak?: StudyStreak;
  // Add missing fields
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
  examPreparation?: {
    target: string;
    examDate: string;
    subjects: string[];
  };
  batchName?: string;
  batchCode?: string;
  isGroupLeader?: boolean;
  aiTutorHistory?: {
    lastSession?: string;
    totalSessions?: number;
    favoriteTopics?: string[];
  };
}

export interface UserSubscription {
  id: string;
  plan: string;
  expiresAt: string;
  status: string;
  planType?: SubscriptionType;
  isGroupLeader?: boolean;
}

export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Pro = "pro",
  Elite = "elite",
  Group = "group",
  Enterprise = "enterprise"
}
