
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
    status?: 'not_started' | 'in_progress' | 'completed';
  }[];
  quizScores?: {
    id: string;
    title: string;
    score: number;
    maxScore: number;
    date: string;
    timeTaken: number;
  }[];
  streak?: number;
  totalTimeSpent?: number;
  lastStudied?: string;
}

export interface StudyStreak {
  current: number;
  best: number;
  lastStudyDate: string;
  thisWeek: number;
  thisMonth: number;
}
