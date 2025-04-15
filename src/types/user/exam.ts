
// Exam related user types
export interface ExamPreparationStats {
  examName: string;
  targetDate: string;
  daysLeft: number;
  completedTopics: number;
  totalTopics: number;
  averageScore: number;
  weakAreas: string[];
  strongAreas: string[];
}

export interface ExamSchedule {
  examId: string;
  examName: string;
  date: string;
  duration: number;
  location?: string;
  subjects: string[];
  importance: 'high' | 'medium' | 'low';
}

export interface MockTestResult {
  testId: string;
  examType: string;
  date: string;
  score: number;
  maxScore: number;
  timeTaken: number;
  accuracy: number;
  rank?: number;
  percentile?: number;
  weakAreas: string[];
  strongAreas: string[];
}
