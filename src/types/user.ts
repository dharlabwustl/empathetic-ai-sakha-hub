
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription?: {
    type: string;
    status: string;
    plan?: string;
    expiresAt?: string;
    credits?: number;
  };
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect?: boolean;
  timeSpent?: number;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}
