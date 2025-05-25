
export interface ExamQuestion {
  id: string;
  question: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctAnswer: string;
  correctOptionId: string;
  explanation: string;
  difficulty: string;
  subject: string;
  topic: string;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string;
  selectedOptionId: string;
  isCorrect: boolean;
}
