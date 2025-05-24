
export interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  totalQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description?: string;
  topic?: string;
  timeAllowed?: number;
  questions?: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  subject: string;
  topic: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  completedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  timeSpent: number;
}
