
// User Roles
export enum UserRole {
  Student = "student",
  Employee = "employee",
  Doctor = "doctor",
  Founder = "founder"
}

// Subscription Types
export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Enterprise = "enterprise",
  Trial = "trial",
  Pro_Annual = "pro_annual",
  Pro_Monthly = "pro_monthly"
}

// Psychology Types
export enum PersonalityType {
  Visual = "visual",
  Auditory = "auditory",
  ReadWrite = "read_write",
  Kinesthetic = "kinesthetic",
  Analytical = "analytical",
  Reflective = "reflective"
}

// Mood Types (expanded to include all options used throughout the app)
export type MoodType = 
  | "motivated" 
  | "curious" 
  | "neutral" 
  | "tired" 
  | "stressed" 
  | "focused" 
  | "happy" 
  | "sad"
  | "anxious"
  | "okay"
  | "overwhelmed"
  | "energetic"
  | "😊 Motivated"
  | "🤔 Curious" 
  | "😐 Neutral" 
  | "😓 Tired" 
  | "😔 Stressed";

// Goal Status
export enum GoalStatus {
  NotStarted = "not_started",
  InProgress = "in_progress",
  Completed = "completed",
  Overdue = "overdue"
}

// User Profile - Basic fields
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  streak?: number;
  subscriptionType?: SubscriptionType;
  goals?: Goal[];
  mood?: MoodType;
  personality?: PersonalityType;
  loginCount?: number;
}

// Goal interface
export interface Goal {
  id: string;
  title: string;
  description?: string;
  progress?: number; // 0-100
  status: GoalStatus;
  dueDate?: string;
  completed?: boolean;
  category?: string;
}
