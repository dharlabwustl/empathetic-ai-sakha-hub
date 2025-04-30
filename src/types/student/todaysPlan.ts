
import { MoodType } from '@/types/user/base';

// Define task status enum
export type TaskStatus = "completed" | "in-progress" | "viewed" | "pending";

// Base task interface with common properties
export interface BaseTask {
  id: string;
  title: string;
  subject: string;
  chapter?: string;
  topic?: string;
  duration: number; // in minutes
  status: TaskStatus;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  completionPercent?: number;
}

// Concept task interface
export interface ConceptTask extends BaseTask {
  key_points?: string[];
  mastery_level?: number;
}

// Flashcard task interface
export interface FlashcardTask extends BaseTask {
  cardCount?: number;
  recallAccuracy?: number;
}

// Practice exam task interface
export interface PracticeExamTask extends BaseTask {
  questionCount?: number;
  timeLimit?: number;
  lastScore?: number;
}

// Time allocation interface
export interface TimeAllocation {
  concepts: number;
  flashcards: number;
  practiceExams: number;
  revision?: number;
  total: number;
}

// Today's plan data interface
export interface TodaysPlanData {
  id?: string;
  userName?: string;
  examGoal?: string;
  date: string;
  streak?: number;
  totalDuration?: number;
  completed?: boolean;
  completedTasks: number;
  totalTasks: number;
  timeAllocation: TimeAllocation;
  concepts: ConceptTask[];
  flashcards: FlashcardTask[];
  practiceExams: PracticeExamTask[];
  subjectBreakdown?: {
    [subject: string]: {
      concepts: { id: string; title: string; status: string; timeEstimate: string }[];
      flashcards: { id: string; deckName: string; status: string; timeEstimate: string }[];
      practiceExams: { id: string; examName: string; status: string; timeEstimate: string }[];
    };
  };
  tomorrowPreview?: {
    totalTasks: number;
    focusArea: string;
    difficulty: string;
    concepts: number;
    flashcards: number;
    practiceExams: number;
  };
  smartExtras?: {
    bookmarks: {
      id: string;
      title: string;
      type: string;
      addedOn: string;
    }[];
    notes: {
      id: string;
      content: string;
      createdAt: string;
    }[];
  };
  backlogTasks?: {
    id: string;
    subject: string;
    title: string;
    type: string;
    timeEstimate: number;
    status: string;
    daysOverdue: number;
  }[];
  recommendations?: {
    id: string;
    type: 'concept' | 'flashcard' | 'practice-exam';
    title: string;
    description: string;
    reason: string;
  }[];
}

// Timeline view type
export type TimelineView = 'list' | 'timeline' | 'calendar' | 'daily';
