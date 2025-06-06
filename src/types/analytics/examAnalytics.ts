
export interface ExamAnalytics {
  id: string;
  userId: string;
  examId: string;
  examType: 'practice' | 'mock' | 'final';
  performanceTrends: {
    subject: string;
    scores: number[];
    dates: string[];
    improvement: number;
  }[];
  weakAreas: {
    topic: string;
    accuracy: number;
    timeSpent: number;
    attempts: number;
  }[];
  strongAreas: {
    topic: string;
    accuracy: number;
    consistency: number;
  }[];
  timeManagementScore: number; // 0-100
  accuracyScore: number; // 0-100
  speedScore: number; // 0-100
  consistencyScore: number; // 0-100
  recommendedFocus: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ExamPerformanceTracking {
  id: string;
  userId: string;
  examType: string;
  averageScore: number;
  improvementRate: number; // percentage per month
  consistencyScore: number;
  performanceStability: 'stable' | 'improving' | 'declining' | 'volatile';
  subjectPerformance: {
    subject: string;
    averageScore: number;
    trend: 'up' | 'down' | 'stable';
    volatility: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ExamQuestionAnalytics {
  id: string;
  questionId: string;
  userId: string;
  userResponses: number; // how many times user attempted
  correctRate: number; // user's success rate on this question
  averageTimeSpent: number;
  difficultyRating: number; // 1-5 perceived by user
  mistakePatterns: string[];
  improvementOverTime: number[];
  lastAttemptDate: string;
  masteryLevel: number; // 0-100
  createdAt: string;
}
