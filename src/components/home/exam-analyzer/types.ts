
export type TestType = 'intro' | 'readiness' | 'concept' | 'report';

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: string;
  timeLimit: number;
  type: 'self-assessment' | 'multiple-choice' | 'math-calculation' | 'memory-recall';
  complexityLevel?: number;
  imageUrl?: string;
  explanation?: string;
  category?: string;
}

export interface UserAnswer {
  questionId: string;
  answer: string;
  isCorrect?: boolean;
  timeToAnswer: number;
  confidenceLevel?: number;
  subject?: string;
}

export interface TestResults {
  score: number;
  level: string;
  analysis: string;
  strengths: string[];
  improvements: string[];
}

export interface ExamResults {
  readiness: TestResults | null;
  concept: TestResults | null;
  overall: TestResults | null;
}

export interface TestCompletionState {
  readiness: boolean;
  concept: boolean;
}

export interface ExamType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface SubjectTopic {
  id: string;
  subject: string;
  topics: number;
}
