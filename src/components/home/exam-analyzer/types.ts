
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
  type?: 'multiple-choice' | 'self-assessment' | 'pattern-recognition' | 'memory-recall' | 'timed-calculation';
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  complexityLevel?: number; // 1-5 for increasing complexity
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
  confidenceLevel?: number;  // 1-5 scale or 0-100%
}

export interface TestDescription {
  title: string;
  description: string;
  instructions: string[];
  duration: string;
  questionCount: number;
}

export interface ConfidenceMapping {
  topic: string;
  confidence: number;
  accuracy: number;
  status: 'overconfident' | 'aligned' | 'underconfident';
}

export interface ConceptCompletion {
  topicsCompleted: number;
  totalTopics: number;
  percentageCompleted: number;
}

export interface PracticePerformance {
  avgScore: number;
  consistencyScore: number; // Measure of score consistency
  timeAccuracyRatio: number; // Higher is better
}

export interface ReadinessScoreComponents {
  conceptCompletion: number; // 0-100
  practicePerformance: number; // 0-100
  confidenceAlignment: number; // 0-100
}
