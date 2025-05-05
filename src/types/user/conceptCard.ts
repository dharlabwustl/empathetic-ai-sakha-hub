
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
  content?: string;
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
}

export type { ConceptCard };
