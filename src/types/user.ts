
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
  selectedOptionId?: string;
  isCorrect?: boolean;
  timeSpent?: number;
}

export interface ExamQuestion {
  id: string;
  question: string;
  text?: string;
  options: string[] | { id: string; text: string; }[];
  correctAnswer: string;
  correctOptionId?: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export interface SubjectProgress {
  subject: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
}
