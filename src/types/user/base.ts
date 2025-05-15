
export enum UserRole {
  Student = "student",
  Admin = "admin",
  Tutor = "tutor"
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

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  photoURL?: string;
  phoneNumber?: string;
  goals?: { id: string; title: string }[];
  subjects?: { id: string; title: string }[];
  examPreferences?: { name: string; date: string }[];
  subscription?: string | { planType: string; expiryDate: string };
  preferences?: Record<string, any>;
  loginCount?: number;
  lastLogin?: string;
  lastActivity?: { type: string; description: string; timestamp: string };
  streak?: number;
  examReadiness?: number;
}
