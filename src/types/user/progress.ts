
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  topics: TopicProgress[];
  streak: number;
  lastStudied?: string;
  totalTimeSpent: number; // in minutes
  lastWeekProgress?: number; // Added for mock data compatibility
  recentScores?: number[];
}

export interface TopicProgress {
  id: string;
  name: string;
  progress: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  importance: 'low' | 'medium' | 'high';
  lastStudied?: string;
  timeSpent: number; // in minutes
  scores: number[];
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  history: {
    date: string;
    minutes: number;
    completed: boolean;
  }[];
  lastMonth?: any; // Added for mock data compatibility
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  topics: TopicProgress[];
  streak: number;
  lastStudied?: string;
  totalTimeSpent: number;
  lastWeekProgress: number;
  recentScores?: number[];
}
