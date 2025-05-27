
export interface ExamQuestion {
  id: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctOptionId: string;
  explanation: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  selectedOptionId?: string;
  isCorrect?: boolean;
  timeSpent?: number;
}

export interface PracticeExam {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  totalQuestions: number;
  timeAllowed: number;
  questions: ExamQuestion[];
}
