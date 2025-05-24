export interface ExamQuestion {
  id: string;
  question: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  correctOptionId: string;
  explanation: string;
  subject: string;
  topic: string;
  difficulty: string;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  selectedOptionId: string;
  isCorrect?: boolean;
  timeToAnswer?: number;
  confidenceLevel?: number;
}

export interface ExamResult {
  examId: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeTaken: number;
  completionDate: Date;
  userAnswers: UserAnswer[];
}
