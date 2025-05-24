
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  score?: number;
}

export interface ExamSession {
  id: string;
  examId: string;
  startTime: string;
  endTime?: string;
  answers: Record<string, string>;
  score?: number;
  completed: boolean;
}
