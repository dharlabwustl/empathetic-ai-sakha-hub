
export * from './base';

// Add missing type definitions
export interface SubjectProgress {
  subject: string;
  completedTopics: number;
  totalTopics: number;
  progress: number;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
}
