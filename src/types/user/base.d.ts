
// Define all base user types

export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
  Parent = "parent"
}

export enum MoodType {
  MOTIVATED = "motivated",
  TIRED = "tired",
  FOCUSED = "focused",
  STRESSED = "stressed",
  DISTRACTED = "distracted",
  CONFIDENT = "confident"
}

export enum PersonalityType {
  VISUAL = "visual",
  AUDITORY = "auditory",
  KINESTHETIC = "kinesthetic",
  ANALYTICAL = "analytical",
  GLOBAL = "global"
}

export enum SubscriptionType {
  FREE = "free",
  BASIC = "basic",
  PREMIUM = "premium",
  PRO = "pro"
}

export interface UserProfileBase {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  goals?: Goal[];
  subjects?: string[];
  createdAt?: string;
  loginCount?: number;
  lastLogin?: string;
  subscription?: SubscriptionType | {
    planType: SubscriptionType;
    expiryDate?: string | Date;
  };
  preferences?: UserPreferences;
}

export interface Goal {
  id?: string;
  title: string;
  description?: string;
  target?: string;
  deadline?: string;
  progress?: number;
  isCompleted?: boolean;
}

export interface UserPreferences {
  theme?: "light" | "dark" | "system";
  notifications?: boolean;
  studyHoursPerDay?: number;
  preferredStudyTime?: "morning" | "afternoon" | "evening" | "night";
  learningPace?: "slow" | "moderate" | "fast";
  showWelcomeGuide?: boolean;
}
