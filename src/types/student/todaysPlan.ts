
import { MoodType } from "@/types/user/base";

export type TimelineView = 'daily' | 'weekly' | 'monthly' | 'all';

export interface SubjectTaskBreakdown {
  [subject: string]: {
    concepts: ConceptTask[];
    flashcards: FlashcardTask[];
    practiceExams: PracticeExamTask[];
  };
}

export interface ConceptTask {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  status: string;
  difficulty: string;
  timeEstimate: number;
  priority: number;
  cardCount?: number;
}

export interface FlashcardTask {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  status: string;
  timeEstimate: number;
  priority: number;
  cardCount: number;
}

export interface PracticeExamTask {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  status: string;
  timeEstimate: number;
  priority: number;
  questionCount: number;
}
