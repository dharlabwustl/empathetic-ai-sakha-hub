
// If this file doesn't exist yet, we'll create it with the updated types
export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionId?: string;
  timeLimit?: number;
  type?: 'multiple-choice' | 'self-assessment' | 'concept-test';
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
  questionId: string;
  answer: string;
  selectedOptionId?: string;
  isCorrect?: boolean;
  timeToAnswer?: number;
  category?: string;
}

export interface TestResults {
  score: number;
  level: string;
  analysis: string;
  strengths: string[];
  improvements: string[];
  categoryScores?: {
    conceptCoverage: number;
    practiceScore: number;
    studyHabits: number;
  }
}

export interface StressTestMetrics {
  correctRate: number;
  incorrectRate: number;
  avgResponseTime: number;
  timeoutRate: number;
}

export type TestType = 'welcome' | 'exam-selection' | 'readiness-test' | 'concept-test' | 'stress-test' | 'results';
