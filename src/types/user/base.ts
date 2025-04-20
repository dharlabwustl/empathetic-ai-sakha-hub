
export interface UserSubscription {
  planId?: string;
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
    description?: string;
    progress?: number;
    status?: "completed" | "in-progress" | "not-started";
    dueDate?: string;
    targetDate?: Date;
  }[];
  areasOfInterest?: {
    id: string;
    name: string;
    level?: string;
  }[];
  subscription?: SubscriptionType | UserSubscription;
  joinDate?: string;
  lastActive?: string;
  gender?: "male" | "female" | "other";
  phoneNumber?: string;
  examPreparation?: string;
  loginCount?: number;
  completedOnboarding?: boolean;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  education?: {
    level?: string;
    institution?: string;
    fieldOfStudy?: string;
    graduationYear?: number;
  };
  // Add firstName and lastName fallbacks for backward compatibility
  firstName?: string;
  lastName?: string;
  studyStreak?: number;
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

// Changed to type string
export type PersonalityType = string;

export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium", 
  Group = "group",
  Institute = "institute",
  Corporate = "corporate",
  Enterprise = "enterprise", 
  School = "school"
}

// Define SubscriptionPlan interface
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular: boolean;
  type: SubscriptionType;
  maxMembers?: number;
}

// Update SubjectProgress to match what's used in the components
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  lastActive?: string;
  color?: string;
  topics?: {
    id: string;
    name: string;
    progress: number;
    status?: 'completed' | 'in-progress' | 'not-started';
    lastPracticed?: string;
    completed?: boolean;
    masteryLevel?: number;
  }[];
  quizzes?: {
    id: string;
    title: string;
    score: number;
    maxScore: number;
    completedOn: string;
  }[];
  quizScores?: {
    id: string;
    title: string;
    score: number;
    maxScore: number;
    date: string;
    timeTaken: string;
  }[];
  studyHours?: {
    date: string;
    hours: number;
  }[];
  weakAreas?: string[];
  strongAreas?: string[];
}

// Update StudyStreak to include current property
export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  studyDays: string[];
  current?: number;
  longest?: number;
  thisWeek?: number[];
  weeklyData?: {
    date: string;
    minutes: number;
  }[];
  monthlyData?: {
    date: string;
    minutes: number;
  }[];
}
