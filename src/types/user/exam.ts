
// Study progress types
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  weakAreas: string[];
  strongAreas: string[];
  lastStudied?: string;
  averageScore?: number;
  topics?: {
    id: string;
    name: string;
    progress: number;
    status: 'completed' | 'in-progress' | 'not-started';
    lastPracticed?: string;
    score?: number;
  }[];
  quizzes?: {
    id: string;
    name: string;
    score: number;
    date: string;
    timeSpent: number;
    totalQuestions: number;
    correctAnswers: number;
  }[];
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
  weeklyData: {
    date: string;
    minutes: number;
  }[];
  monthlyData: {
    date: string;
    minutes: number;
  }[];
}
