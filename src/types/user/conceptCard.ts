
export interface ConceptCard {
  id: string;
  title: string;
  description: string;
  subject: string;
  chapter?: string;
  topic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  progress?: number;
  relatedConcepts?: string[];
  content: string;
  examples?: string[];
  commonMistakes?: string[];
  examRelevance?: string;
  recallAccuracy?: number;
  quizScore?: number;
  lastPracticed?: string;
  timeSuggestion?: number;
  flashcardsTotal?: number;
  flashcardsCompleted?: number;
  examReady?: boolean;
  bookmarked?: boolean;
  estimatedTime: number;
  scheduledFor?: 'today' | 'week' | 'month';
  
  // Added fields for concept detail page
  keyPoints?: string[];
  formulas?: string[];
  notes?: string[];
  masteryLevel?: number;
  mastery?: {
    level: string;
    percentage: number;
  };
  videos?: {
    id: string;
    title: string;
    url: string;
    duration: string;
    thumbnail?: string;
  }[];
  resources?: {
    id: string;
    title: string;
    type: string;
    url: string;
  }[];
  practiceQuestions?: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
}

export interface MasteryLevel {
  level: "Beginner" | "Basic" | "Intermediate" | "Advanced" | "Expert";
  color: string;
  minScore: number;
}
