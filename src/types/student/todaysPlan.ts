
import { DifficultyLevel } from './dashboard';

export type TaskStatus = '✅ completed' | '🔄 in-progress' | '🕒 viewed' | '🔴 pending';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface LearningTask {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'practice-exam';
  subject: string;
  chapter?: string;
  status: TaskStatus;
  timeEstimate: number; // minutes
  difficulty: DifficultyLevel;
  completionPercent: number;
  priority: TaskPriority;
  dateAssigned: string;
  dateCompleted?: string;
}

export interface ConceptTask extends LearningTask {
  type: 'concept';
  content?: string;
  resourceType?: 'video' | 'text' | 'interactive' | 'pdf';
  resourceUrl?: string;
}

export interface FlashcardTask extends LearningTask {
  type: 'flashcard';
  cardCount: number;
  recallAccuracy?: number;
  lastRecalled?: string;
}

export interface PracticeExamTask extends LearningTask {
  type: 'practice-exam';
  questionCount: number;
  timeLimit: number; // minutes
  lastScore?: number;
  attempts?: number;
}

export type TimelineView = 'daily' | 'weekly' | 'monthly';

export interface TaskAllocation {
  conceptCards: number; // minutes
  flashcards: number; // minutes
  practiceTests: number; // minutes
  total: number; // minutes
}

export interface PastDayRecord {
  date: string;
  conceptsCompleted: number;
  conceptsTotal: number;
  flashcardsCompleted: number;
  flashcardsTotal: number;
  practiceCompleted: number;
  practiceTotal: number;
  status: 'completed' | 'incomplete' | 'pending';
}

export interface TodaysPlanData {
  userName: string;
  examGoal: string;
  currentDate: string;
  timeAllocation: TaskAllocation;
  tasks: {
    concepts: ConceptTask[];
    flashcards: FlashcardTask[];
    practiceExams: PracticeExamTask[];
  };
  subjectBreakdown: {
    [subject: string]: {
      concepts: ConceptTask[];
      flashcards: FlashcardTask[];
      practiceExams: PracticeExamTask[];
    };
  };
  pastDays: PastDayRecord[];
  tomorrowPreview?: {
    concepts: number;
    flashcards: number;
    practiceExams: number;
  };
  smartExtras: {
    bookmarks: string[];
    notes: {
      id: string;
      date: string;
      content: string;
    }[];
  };
}

export interface SubjectTaskBreakdown {
  type: 'concept' | 'flashcard' | 'practice-exam';
  assigned: {
    count: number;
    description: string;
  };
  pending: {
    count: number;
    description: string;
  };
  timeEstimate: number; // in minutes
}

export interface SubjectBreakdownData {
  name: string;
  tasks: {
    concepts: SubjectTaskBreakdown[];
    flashcards: SubjectTaskBreakdown[];
    practiceTests: SubjectTaskBreakdown[];
  };
  totalTime: number;
}

export interface PendingTask {
  id: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'practice-exam';
  title: string;
  details: string;
}

export interface TimeAllocationSummary {
  concepts: number;
  flashcards: number;
  practiceExams: number;
  total: number;
}

export type MoodType = 'happy' | 'focused' | 'tired' | 'anxious' | 'stressed' | 'motivated' | 'sad' | 'neutral' | 'overwhelmed' | 'curious' | 'okay';
