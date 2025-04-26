
export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated' | 'anxious' | 'stressed' | 'tired' | 'focused' | 'overwhelmed' | 'curious' | 'okay';

export interface TodaysPlanData {
  date: string;
  totalCompletedTasks: number;
  totalTasks: number;
  concepts: ConceptTask[];
  flashcards: FlashcardTask[];
  practiceExams: PracticeExamTask[];
}

export interface ConceptTask {
  id: string;
  name: string;
  subject: string;
  topicId: string;
  topic: string;
  estimatedMinutes: number;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export interface FlashcardTask {
  id: string;
  deckName: string;
  subject: string;
  topicId: string;
  topic: string;
  cardCount: number;
  cardsReviewed: number;
  estimatedMinutes: number;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export interface PracticeExamTask {
  id: string;
  name: string;
  subject: string;
  topicIds: string[];
  topics: string[];
  questionCount: number;
  estimatedMinutes: number;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export interface PastDayRecord {
  date: string;
  completionPercentage: number;
  tasksCompleted: number;
  totalTasks: number;
  mood?: MoodType;
}
