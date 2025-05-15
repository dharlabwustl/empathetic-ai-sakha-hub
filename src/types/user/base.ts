
export enum UserRole {
  Student = "student",
  Parent = "parent",
  Teacher = "teacher",
  Admin = "admin"
}

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
  SAD = "SAD"
}

export enum SubscriptionType {
  FREE = "FREE",
  PRO = "PRO",
  PREMIUM = "PREMIUM"
}

export interface UserProfileType {
  id?: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  role?: UserRole;
  goals?: UserGoalType[];
  interests?: string[];
  subscription?: SubscriptionType | UserSubscription;
  preferences?: UserPreferencesType;
  stats?: UserStatsType;
  loginCount?: number;
}

export interface UserGoalType {
  id: string;
  title: string;
  targetDate?: string;
  progress?: number;
}

export interface UserSubscription {
  planType: SubscriptionType;
  expiryDate?: string;
  features?: string[];
}

export interface UserPreferencesType {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  notifications?: NotificationPreferences;
  accessibility?: AccessibilityPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface AccessibilityPreferences {
  fontSize?: 'small' | 'medium' | 'large';
  highContrast?: boolean;
  reducedMotion?: boolean;
}

export interface UserStatsType {
  totalStudyHours?: number;
  averageScore?: number;
  streakDays?: number;
  completedTopics?: number;
  testsTaken?: number;
}
