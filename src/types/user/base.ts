
export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin'
}

export enum MoodType {
  Happy = 'happy',
  Focused = 'focused',
  Tired = 'tired',
  Stressed = 'stressed',
  Motivated = 'motivated',
  Confused = 'confused'
}

export interface Goal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
}

export interface UserRecentActivity {
  lastLogin: Date;
  lastStudySession?: Date;
  completedTasks: number;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  examPreparation?: string;
  bio?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  goals?: Goal[];
  subjects?: string[];
  preferences?: {
    studyReminders?: boolean;
    emailNotifications?: boolean;
    darkMode?: boolean;
  };
  recentActivity: UserRecentActivity;
  loginCount?: number;
  subscription?: SubscriptionType | string;
  studyStreak?: number;
  mood?: MoodType;
  location?: string;
  personalityType?: string;
}

// Alias for UserProfileType to maintain compatibility
export type UserProfileBase = UserProfileType;

export enum SubscriptionType {
  Free = 'free',
  Premium = 'premium',
  Pro = 'pro',
  Trial = 'trial'
}
