
// Define types for tracking study progress
export interface StudyHours {
  date: string;
  hours: number;
}

export interface QuizScore {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  timeTaken: number;
}

export interface Topic {
  id: string;
  name: string;
  completed: boolean;
  masteryLevel: number;
  lastPracticed?: string;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastWeekProgress: number;
  color: string;
  topics: Topic[];
  quizScores: QuizScore[];
  studyHours: StudyHours[];
}

export interface StudyStreak {
  current: number;
  longest: number;
  thisWeek: number[];
  lastMonth: number[];
}
