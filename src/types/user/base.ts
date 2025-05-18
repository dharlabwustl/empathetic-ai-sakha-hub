
export enum MoodType {
  HAPPY = "HAPPY",
  SAD = "SAD",
  FOCUSED = "FOCUSED",
  TIRED = "TIRED",
  ANXIOUS = "ANXIOUS",
  STRESSED = "STRESSED",
  MOTIVATED = "MOTIVATED",
  OKAY = "OKAY",
  NEUTRAL = "NEUTRAL",
  CURIOUS = "CURIOUS",
  CONFUSED = "CONFUSED",
  OVERWHELMED = "OVERWHELMED"
}

export type FeelingType = "positive" | "negative" | "neutral";

export interface UserProfileBase {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  avatar?: string;
  photoURL?: string;
  birthday?: string;
  gender?: string;
  timezone?: string;
  language?: string;
  country?: string;
  city?: string;
  school?: string;
  grade?: string;
  isFirstTimeUser?: boolean;
  lastLogin?: string;
  subscription?: string | { planType: string; expiryDate?: string };
  goals?: Array<{ title: string; deadline?: string }>;
  loginCount?: number;
  personalInfo?: {
    [key: string]: any;
  };
}

export type UserProfileType = UserProfileBase & {
  subjects?: Array<{ name: string; level: number }>;
  notifications?: Array<{ id: string; message: string; read: boolean }>;
  studyStats?: {
    totalTimeSpent?: number;
    weeklyTimeSpent?: number;
    dailyTimeSpent?: number;
  };
};
