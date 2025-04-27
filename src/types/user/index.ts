
export * from './base';

// Add missing type definitions
export interface SubjectProgress {
  id: string;
  name: string;
  subject: string;
  completedTopics: number;
  totalTopics: number;
  progress: number;
  color?: string;
  topics?: Array<{
    id: string;
    name: string;
    completed: boolean;
    progress: number;
  }>;
  studyHours?: number[];
  quizScores?: number[];
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  current?: number;
  thisWeek?: number;
}
