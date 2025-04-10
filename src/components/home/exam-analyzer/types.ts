
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
