
// User roles enum
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
  Moderator = "moderator",
  Parent = "parent"
}

// Subscription type definition
export type SubscriptionType = 'free' | 'basic' | 'premium' | 'pro' | string;

// Mood tracking types
export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | 'stressed' | 'confused' | 'tired' | 'anxious' | 'focused' | 'overwhelmed' | 'curious' | 'okay' | 'energetic';

export interface MoodEntry {
  mood: MoodType;
  timestamp: Date;
  note?: string;
}

// Base user profile interface that all user roles extend
export interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  loginCount?: number;
  moodHistory?: MoodEntry[];
  currentMood?: MoodType;
  onboardingCompleted?: boolean;
  goals?: UserGoal[];
  timezone?: string;
  preferences?: UserPreferences;
  subscription?: SubscriptionType | {
    planType: SubscriptionType;
    expiryDate?: Date;
    features?: string[];
    startDate?: Date;
  };
  lastActive?: Date;
  streak?: number;
  studyHours?: number;
  conceptsLearned?: number;
  testsCompleted?: number;
  targetExamDate?: Date;
}

// User goal interface
export interface UserGoal {
  id: string;
  title: string;
  description?: string;
  targetDate?: Date;
  progress?: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'abandoned';
  createdAt?: Date;
  updatedAt?: Date;
}

// User preferences
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  studyReminders?: boolean;
  language?: string;
  focusMode?: boolean;
  showMotivationalQuotes?: boolean;
  studySessionDuration?: number; // in minutes
}

// Personality type
export type PersonalityType = 'visual' | 'auditory' | 'kinesthetic' | 'analytical' | 'creative' | 'practical' | 'reflective';
