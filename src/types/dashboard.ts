
export interface ConceptTask {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'in-progress';
  difficulty: string;
  subject: string;
  duration: number;
}

export interface FlashcardTask {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'in-progress';
  difficulty?: string;
}

export interface PracticeExamTask {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'in-progress';
  difficulty?: string;
}

export interface TaskProgress {
  concepts: number;
  flashcards: number;
  practiceExams: number;
  revision: number;
  total: number;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  type: string;
  completed?: boolean;
}
