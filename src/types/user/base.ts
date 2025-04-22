
export enum UserRole {
  Student = 'student',
  Tutor = 'tutor',
  Admin = 'admin',
  Parent = 'parent',
  Doctor = 'doctor',
  Employee = 'employee',
  Founder = 'founder',
  Teacher = 'teacher'
}

export type MoodType = 'happy' | 'sad' | 'neutral' | 'motivated' | 'tired' | 'stressed' | 'focused' | 'curious' | 'overwhelmed' | 'okay';

export type PersonalityType = string;

export enum SubscriptionType {
  Free = 'free',
  Basic = 'basic',
  Premium = 'premium',
  Pro = 'pro',
  Elite = 'elite',
  Group = 'group',
  Enterprise = 'enterprise'
}

export { UserSubscription } from './subscription';

export interface UserGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  examDate?: string;
  progress: number;
  status: 'active' | 'completed' | 'abandoned' | 'in_progress';
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  lastWeekProgress?: number;
  weakTopics?: string[];
  strongTopics?: string[];
}

export interface StudyStreak {
  current: number;
  best: number;
  lastStudyDate: string;
  thisWeek: number;
  thisMonth: number;
}

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole | string;
  avatar?: string;
  goals?: UserGoal[];
  examDate?: string;
  subscription?: UserSubscription | SubscriptionType | string;
  createdAt?: string;
  updatedAt?: string;
  loginCount?: number;
  lastLogin?: string;
  studyStreak?: StudyStreak;
  subjects?: Subject[];
  batchName?: string;
  batchCode?: string;
  isGroupLeader?: boolean;
  examPreparation?: {
    target: string;
    examDate: string;
    subjects: string[];
  };
  personalDetails?: {
    phoneNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    dateOfBirth?: string;
    gender?: string;
    school?: string;
    grade?: string;
    board?: string;
    phone?: string;
    bio?: string;
    interests?: string[];
  };
  preferences?: {
    studyReminders: boolean;
    emailNotifications: boolean;
    darkMode: boolean;
    language: string;
  };
  aiTutorHistory?: {
    lastInteraction: string;
    totalInteractions: number;
    favoriteTopics: string[];
  };
  currentMood?: MoodType;
  personalityType?: PersonalityType;
}

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole | string;
  name?: string;
  subscription?: UserSubscription | SubscriptionType | string;
};
