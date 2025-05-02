
export enum UserRole {
  Admin = 'admin',
  Student = 'student',
  Tutor = 'tutor',
  Parent = 'parent'
}

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
  subscription?: string | { planType: string };
}

export interface AdminUser extends BaseUser {
  role: UserRole.Admin;
  permissions?: string[];
}

export interface StudentUser extends BaseUser {
  role: UserRole.Student;
  examPreparation?: string;
  level?: string;
  preferredSubjects?: string[];
  lastLogin?: string;
  loginCount?: number;
  moodHistory?: Array<{
    timestamp: string;
    mood: string;
    intensity: number;
  }>;
  currentMood?: {
    mood: string;
    timestamp: string;
    intensity: number;
  };
  studyStreak?: number;
  rewards?: number;
}

export interface TutorUser extends BaseUser {
  role: UserRole.Tutor;
  subjects?: string[];
  expertise?: string[];
  students?: string[];
  rating?: number;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

export interface ParentUser extends BaseUser {
  role: UserRole.Parent;
  children?: string[]; // IDs of child accounts
}

export type User = AdminUser | StudentUser | TutorUser | ParentUser;
