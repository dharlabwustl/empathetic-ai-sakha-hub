
export enum UserRole {
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
  Doctor = "doctor",
  Admin = "admin",
  Employee = "employee",
  Founder = "founder",
  Tutor = "tutor"
}

export enum SubscriptionType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Pro = "pro",
  Elite = "elite",
  Group = "group",
  Enterprise = "enterprise"
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
  dueDate?: string;
  targetDate?: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed";
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole | string;
  createdAt?: string;
  lastLogin?: string;
  onboarded?: boolean;
  loginCount?: number;
  completedOnboarding?: boolean;
  goals?: Goal[];
  subscription?: SubscriptionType | string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole | string;
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
  register: (name: string, email: string, password: string, role: UserRole | string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}
