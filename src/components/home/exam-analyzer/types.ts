
export interface ExamType {
  value: string;
  label: string;
}

export interface TestResults {
  score: number;
  level: string;
  analysis: string;
  strengths: string[];
  improvements: string[];
}

export interface ExamResults {
  stress: TestResults;
  readiness: TestResults;
  concept: TestResults;
  overall: TestResults;
}

export type TestType = 'intro' | 'stress' | 'readiness' | 'concept' | 'report';

export interface TestCompletionState {
  stress: boolean;
  readiness: boolean;
  concept: boolean;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: string;
  timeLimit: number;
  explanation?: string;
  imageUrl?: string;
  type?: 'multiple-choice' | 'self-assessment';
}

export interface SubjectTopic {
  id: string;
  subject: string;
  topics: number;
}

export interface UserAnswer {
  questionId: string;
  answer: string;
  timeToAnswer: number;
  isCorrect?: boolean;
}
