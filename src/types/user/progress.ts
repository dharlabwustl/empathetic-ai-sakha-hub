
export interface Topic {
  id: string;
  name: string;
  completed: boolean;
  masteryLevel: number;
  lastPracticed?: string;
}

export interface Quiz {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  timeTaken: number;
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  lastWeekProgress: number;
  weakTopics?: string[];
  strongTopics?: string[];
  topics: Topic[];
  streak: number;
  totalTimeSpent: number;
  lastStudied?: string;
  color?: string;
  quizScores?: Quiz[];
}
