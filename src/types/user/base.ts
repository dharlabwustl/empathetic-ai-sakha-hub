
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Doctor = "doctor",
  Admin = "admin",
  Employee = "employee",
  Founder = "founder"
}

export enum SubscriptionType {
  Basic = "basic",
  Premium = "premium",
  Elite = "elite",
  Enterprise = "enterprise",
  Free = "free",
  Group = "group"
}

export type MoodType = 
  | 'happy' 
  | 'sad' 
  | 'neutral' 
  | 'motivated' 
  | 'tired' 
  | 'stressed' 
  | 'focused' 
  | 'curious' 
  | 'overwhelmed' 
  | 'okay';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  examDate?: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed";
}

export interface UserSubscription {
  id: string;
  plan: string;
  expiresAt: string;
  status: "active" | "expired" | "canceled" | "pending";
}

export interface PersonalityType {
  type: string;
  traits: string[];
  learningStyle: string;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt?: string;
  lastLogin?: string;
  onboarded?: boolean;
  loginCount?: number;
  completedOnboarding?: boolean;
  goals?: Goal[];
  subscription?: UserSubscription | SubscriptionType;
  // Additional fields for student profiles
  batchName?: string;
  batchCode?: string;
  isGroupLeader?: boolean;
  peerRanking?: number;
  examDate?: string;
  // Education related fields
  school?: string;
  grade?: string;
  board?: string;
  city?: string;
  state?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  emailVerified?: boolean;
  profile?: UserProfileType;
}

export interface AuthContextProps {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}
