
export enum UserRole {
  Admin = "admin",
  Tutor = "tutor",
  Student = "student",
  Guest = "guest",
}

export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Ultimate = "ultimate",
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  avatarUrl?: string;
  createdAt?: Date | string;
  isActive?: boolean;
  subscription?: SubscriptionType;
  loginCount?: number;
  completedOnboarding?: boolean;
  examPreparation?: string;
  goals?: Array<{ id: string; title: string; date: string }>;
  studyStreak?: number;
  [key: string]: any; // Allow additional properties
}

// Define available mood types
export type MoodType = 'motivated' | 'curious' | 'neutral' | 'tired' | 'stressed' | 'focused' | 'happy' | 'okay' | 'overwhelmed' | 'sad';

// Interface for mood history entries
export interface MoodHistoryEntry {
  mood: MoodType;
  timestamp: string;
  note?: string;
  energyLevel?: number;
}
