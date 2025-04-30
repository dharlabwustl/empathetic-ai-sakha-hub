import { UserProfileBase } from './base';

// Student dashboard types
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  studyHours: { date: string; hours: number }[];
  quizScores: {
    id: string;
    title: string;
    score: number;
    maxScore: number;
    date: string;
    timeTaken: number;
  }[];
  topics: {
    id: string;
    name: string;
    completed: boolean;
    progress: number;
    masteryLevel: number;
    lastPracticed?: string;
  }[];
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  thisWeek: number[];
}
