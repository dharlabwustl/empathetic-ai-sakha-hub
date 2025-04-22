
export * from './base';

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastWeekProgress?: number;
  weakTopics?: string[];
  strongTopics?: string[];
  color?: string;
  topics?: {
    id: string;
    name: string;
    completed: boolean;
    masteryLevel: number;
    lastPracticed?: string;
  }[];
  quizScores?: {
    id: string;
    title: string;
    score: number;
    maxScore: number;
    date: string;
    timeTaken: number;
  }[];
}

export interface StudyStreak {
  current: number;
  best: number;
  lastStudyDate: string;
  thisWeek: number;
  thisMonth: number;
}

