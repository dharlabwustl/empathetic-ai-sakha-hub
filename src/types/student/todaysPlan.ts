
import { MoodType } from '../user/base';

export interface StudyBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  tasks: Task[];
  completed?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  duration: number; // minutes
  status: TaskStatus;
  subjectId?: string;
  conceptId?: string;
  resourceId?: string;
  priority: 'high' | 'medium' | 'low';
}

export enum TaskType {
  READ = 'read',
  PRACTICE = 'practice',
  WATCH = 'watch',
  QUIZ = 'quiz',
  FLASHCARD = 'flashcard',
  BREAK = 'break',
  OTHER = 'other'
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SKIPPED = 'skipped'
}

export interface PendingTask extends Task {
  dueDate: string;
  isOverdue: boolean;
}

export interface SubjectBreakdownData {
  id: string;
  name: string;
  color: string;
  timeAllocated: number; // minutes
  percentComplete: number;
}

export interface TimeAllocationSummary {
  totalStudyTime: number; // minutes
  breakTime: number; // minutes
  subjectBreakdown: SubjectBreakdownData[];
}

export interface ConceptTask {
  id: string;
  title: string;
  subject: string;
  topic?: string;
  duration: number;
  status: 'pending' | 'completed' | 'in-progress';
  difficulty?: string;
}

export interface FlashcardTask {
  id: string;
  title: string;
  subject: string;
  duration: number;
  status: 'pending' | 'completed' | 'in-progress';
  cardCount?: number;
}

export interface PracticeExamTask {
  id: string;
  title: string;
  subject: string;
  duration: number;
  status: 'pending' | 'completed' | 'in-progress';
  questionCount?: number;
}

export interface SmartSuggestion {
  id: string;
  type: 'concept' | 'flashcard' | 'practice-exam' | 'break' | 'bonus';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  estimatedTime?: number;
}

export interface BacklogTask {
  id: string;
  subject: string;
  title: string;
  type: 'concept' | 'flashcard' | 'practice-exam';
  timeEstimate: number;
  status: 'overdue' | 'pending';
  daysOverdue?: number;
}

export interface TodaysPlanData {
  id: string;
  date: string;
  streak: number;
  completedTasks: number;
  totalTasks: number;
  timeAllocation: {
    concepts: number;
    flashcards: number;
    practiceExams: number;
    revision: number;
    total: number;
  };
  concepts: ConceptTask[];
  flashcards: FlashcardTask[];
  practiceExams: PracticeExamTask[];
  recommendations?: {
    id: string;
    type: 'concept' | 'flashcard' | 'practice-exam';
    title: string;
    description: string;
    reason: string;
  }[];
  tomorrowPreview?: {
    totalTasks: number;
    focusArea: string;
    difficulty: string;
    concepts: number;
    flashcards: number;
    practiceExams: number;
  };
  subjectBreakdown?: Record<string, any>;
  backlogTasks: BacklogTask[];
  smartSuggestions: SmartSuggestion[];
  examGoal?: string;
  userName?: string;
}

export enum TimelineView {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export { MoodType };
