
export interface ExamQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PracticeExam {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  totalQuestions: number;
  timeAllowed: number; // in minutes
  questions: ExamQuestion[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect?: boolean;
}

export interface ExamResult {
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  userAnswers: UserAnswer[];
  completedAt: string;
}
