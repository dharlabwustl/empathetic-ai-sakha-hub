
export interface ConceptStudyData {
  id: string;
  title: string;
  subject: string;
  content: {
    simple: string;
    detailed: string;
    examples: string[];
    diagrams: string[];
    examRelevance: string;
    commonMistakes: string[];
    videoUrl?: string;
  };
  relatedConcepts: string[];
  isBookmarked: boolean;
  notes: string[];
}

export interface FlashcardPracticeData {
  id: string;
  question: string;
  imageUrl?: string;
  answer: string;
  subject: string;
  topic: string;
  attempts: Array<{
    answer: string;
    accuracy: number;
    timestamp: Date;
  }>;
  isBookmarked: boolean;
  relatedCards: string[];
}

export interface ExamAttemptData {
  id: string;
  title: string;
  duration: number;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    subject: string;
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
  }>;
}

export interface ExamReviewData extends ExamAttemptData {
  score: number;
  maxScore: number;
  timeTaken: number;
  answers: Record<string, string>;
  subjectWiseAccuracy: Record<string, number>;
  recommendations: Array<{
    subject: string;
    topic: string;
    improvement: string;
  }>;
  weakAreas: string[];
}
