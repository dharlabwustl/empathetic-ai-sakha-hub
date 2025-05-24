
export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
}

export interface PracticeExam {
  id: string;
  title: string;
  description: string;
  questions: ExamQuestion[];
  duration: number; // in minutes
  passingScore: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface ExamResult {
  id: string;
  examId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  answers: Record<string, number>;
  completedAt: Date;
}
