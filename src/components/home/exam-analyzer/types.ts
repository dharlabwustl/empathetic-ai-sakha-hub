
export type TestType = 'intro' | 'readiness' | 'concept' | 'report';
export type TestCompletionState = {
  readiness: boolean;
  stress: boolean;
  concept: boolean;
};

export interface ExamType {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer?: number;
  explanation?: string;
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: string;
}

export interface TestResult {
  score: number;
  level: string;
  analysis: string;
  strengths: string[];
  improvements: string[];
}

export interface ExamResults {
  stress: TestResult;
  readiness: TestResult;
  concept: TestResult;
  overall: TestResult;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number;
}
