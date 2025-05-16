
// User roles
export enum UserRole {
  Admin = "admin",
  Student = "student",
  Teacher = "teacher",
  Parent = "parent"
}

// User types
export interface UserProfileBase {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  photoURL?: string;
  role: UserRole;
  joinedAt?: Date;
  lastLogin?: Date;
  isActive?: boolean;
  settings?: UserSettings;
  bio?: string;
  loginCount?: number;
  goals?: UserGoal[];
}

export interface UserSettings {
  theme?: string;
  language?: string;
  notifications?: boolean;
  emailNotifications?: boolean;
}

export interface UserGoal {
  id: string;
  title: string;
  description?: string;
  targetDate?: Date;
  progress?: number;
  isCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Admin user
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
}

// Mood types for tracking student emotional states
export enum MoodType {
  HAPPY = "HAPPY",
  MOTIVATED = "MOTIVATED",
  FOCUSED = "FOCUSED",
  CALM = "CALM",
  TIRED = "TIRED",
  CONFUSED = "CONFUSED",
  ANXIOUS = "ANXIOUS",
  STRESSED = "STRESSED",
  OVERWHELMED = "OVERWHELMED",
  NEUTRAL = "NEUTRAL",
  OKAY = "OKAY",
  SAD = "SAD",
  CURIOUS = "CURIOUS"
}

// Subscription types
export enum SubscriptionType {
  FREE = "FREE",
  BASIC = "BASIC",
  PRO = "PRO",
  PREMIUM = "PREMIUM"
}

// Study plan topic type
export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  priority: "high" | "medium" | "low";
  status: "not_started" | "in_progress" | "completed" | "skipped";
}
