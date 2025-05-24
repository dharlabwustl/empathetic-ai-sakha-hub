
export interface SubjectProgress {
  subject: string;
  progress: number;
  totalChapters: number;
  completedChapters: number;
  timeSpent: number;
  lastStudied: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  examRelevance: number;
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: Date;
  streakHistory: Array<{
    date: Date;
    maintained: boolean;
    studyTime: number;
  }>;
}

export * from './base';
export * from './studyPlan';
export * from './conceptCard';
