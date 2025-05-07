
import { UserProfileBase } from './base';

export interface UserProfileType extends UserProfileBase {
  createdAt?: string;
  updatedAt?: string;
  verified?: boolean;
  phoneNumber?: string;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  color?: string;
  lastActivity?: string;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  streakDays: {
    date: string;
    completed: boolean;
  }[];
}
