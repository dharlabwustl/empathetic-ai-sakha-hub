
// User type definitions for the application

export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
  Parent = "parent"
}

export enum SubscriptionType {
  FREE = "free",
  BASIC = "basic",
  PRO = "pro",
  PREMIUM = "premium"
}

export enum MoodType {
  HAPPY = "HAPPY",
  MOTIVATED = "MOTIVATED",
  FOCUSED = "FOCUSED",
  NEUTRAL = "NEUTRAL",
  TIRED = "TIRED",
  ANXIOUS = "ANXIOUS",
  STRESSED = "STRESSED",
  SAD = "SAD",
  CONFUSED = "CONFUSED",
  CALM = "CALM",
  OVERWHELMED = "OVERWHELMED",
  OKAY = "OKAY"
}

export type UserNotification = {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  date: string;
};

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
  emailAlerts?: boolean;
  language?: string;
  studySessionLength?: number;
  breakDuration?: number;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  target?: number;
  current?: number;
  dueDate?: string;
  completed?: boolean;
  status?: "pending" | "in_progress" | "completed" | "overdue";
}

export interface UserProfileType {
  id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  photoURL?: string;
  role?: string;
  phone?: string;
  school?: string;
  grade?: string;
  subjects?: string[];
  notifications?: UserNotification[];
  preferences?: UserPreferences;
  goals?: Goal[];
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  loginCount?: number;
  subscription?: string | { planType: string; expiryDate?: string };
  completedLessons?: number;
  totalLessons?: number;
  stats?: {
    studyHours?: number;
    questionsAnswered?: number;
    accuracy?: number;
    streak?: number;
    ranking?: number;
  };
  timezone?: string;
  location?: string;
  bio?: string;
  interests?: string[];
  badges?: string[];
  achievements?: string[];
  testScores?: any[];
  calendar?: any[];
  mood?: MoodType;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
}

export interface MoodTheme {
  backgroundColor: string;
  textColor: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  gradients: {
    primary: string;
    secondary: string;
  };
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  priority: "high" | "medium" | "low";
  status: "not_started" | "in_progress" | "completed";
}
