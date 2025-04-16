
// Base user profile type
export type UserProfileType = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  accountCreated: Date;
  lastLogin: Date;
  loginCount: number;
  bio?: string;
  phone?: string;
  location?: string;
  preferences: UserPreferences;
  badges: Badge[];
  goals: Goal[];
  mood?: MoodType;
  notifications: Notification[];
  // Additional fields needed to fix errors
  subscription?: 'Basic' | 'Premium' | 'Free';
  personalityType?: string;
  areasOfInterest?: Array<{id: string; name: string; level: string}>;
  joinDate?: string;
  completedOnboarding?: boolean;
  phoneNumber?: string;
};

// User roles - update to lowercase to match the string literals used in code
export type UserRole = 'student' | 'employee' | 'doctor' | 'founder' | 'admin' | 'teacher';

// Mood types for tracking emotional states
export type MoodType = 'motivated' | 'curious' | 'neutral' | 'tired' | 'stressed' | 'focused' | 'happy' | 'okay' | 'overwhelmed' | undefined;

// User preferences
export type UserPreferences = {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
  timezone: string;
  accessibility: {
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
};

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  acquiredAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  targetDate?: Date;
  progress: number;
  metrics?: {
    key: string;
    value: number;
    unit: string;
    targetValue: number;
  }[];
  // Add dueDate for compatibility with existing code
  dueDate?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  link?: string;
}

// Add SubscriptionType for FeatureCard
export type SubscriptionType = 'Basic' | 'Premium' | 'Free';
