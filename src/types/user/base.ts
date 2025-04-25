
export type UserRole = "student" | "employee" | "doctor" | "founder" | "admin";

export type MoodType = "happy" | "neutral" | "sad" | "motivated";

export type PersonalityType = "analytical" | "creative" | "practical" | "social";

export type SubscriptionType = "free" | "basic" | "premium" | "ultimate";

export interface UserSubscription {
  plan: string;
  status: string;
  expiresAt: string;
  features: string[];
}

export interface UserGoal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  subjects?: string[];
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
  actionUrl?: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  emailNotifications: boolean;
  pushNotifications: boolean;
  studyReminders: boolean;
}

export interface UserActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  subject?: string;
  duration?: number;
  score?: number;
  completed: boolean;
  url?: string;
}
