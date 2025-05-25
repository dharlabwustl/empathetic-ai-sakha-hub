
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

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  target: number;
  color: string;
}
