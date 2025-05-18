
export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  timeLimit?: number;
  type?: string;
  category?: string;
  subcategory?: string;
  imageUrl?: string;
  diagram?: string;
  correctAnswer?: string;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
  questionId: string;
  answer: string;
  timeToAnswer?: number;
  isCorrect?: boolean;
  confidenceLevel?: number;
}

export interface TestResults {
  score: number;
  timeElapsed?: number;
  readinessLevel?: string;
  weakAreas?: string[];
  strengths?: string[];
  analysis: string;
  recommendations: string[];
  conceptsToReview?: string[];
}

export interface TestState {
  currentTest: 'select' | 'readiness' | 'concept' | 'results';
  selectedExam: string;
  loading: boolean;
  progress: number;
  testCompleted: boolean;
  results: TestResults;
}
