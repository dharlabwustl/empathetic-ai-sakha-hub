
import { MoodType } from '../user/base';

export interface StudyBlock {
  id: string;
  title: string;
  duration: number;
  startTime?: string;
  endTime?: string;
  completed: boolean;
  type: TaskType;
  subject?: string;
  topic?: string;
  resources?: string[];
  mood?: MoodType;
  tasks?: Task[];
}

export enum TaskType {
  Concept = 'concept',
  Revision = 'revision',
  Practice = 'practice',
  Break = 'break',
  Test = 'test',
  Flashcard = 'flashcard',
  PracticeExam = 'practice-exam'
}

export enum TaskStatus {
  Completed = 'completed',
  InProgress = 'in-progress',
  Pending = 'pending',
  Missed = 'missed'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  duration: number;
  timeEstimate?: number;
  status: TaskStatus;
  type: TaskType;
  subject?: string;
  topic?: string;
  priority: 'low' | 'medium' | 'high';
  deckName?: string;
  examName?: string;
}

export interface DailyMood {
  date: string;
  mood: MoodType;
  note?: string;
}

export interface StudyProgress {
  plannedHours: number;
  completedHours: number;
  completedTasks: number;
  totalTasks: number;
}

export interface TodaysPlan {
  date: string;
  greeting: string;
  currentMood?: MoodType;
  studyBlocks: StudyBlock[];
  progress: StudyProgress;
  pendingTasks: Task[];
  backlogTasks: Task[];
}

export interface TodaysPlanData extends TodaysPlan {
  timeAllocation: TimeAllocation;
  subjectProgress: SubjectProgress[];
  pastRecords: PastDayRecord[];
  currentBlock?: StudyBlock;
  completedBlocks: StudyBlock[];
  upcomingBlocks: StudyBlock[];
  backlog: Task[];
  tasks?: Task[];
  pastDays?: PastDayRecord[];
  tomorrowPreview?: {
    concepts: number;
    flashcards: number;
    practice: number;
    practiceExams?: number;
  };
  subjectBreakdown?: {
    [key: string]: {
      concepts: {
        total: number;
        completed: number;
      };
      flashcards: {
        total: number;
        completed: number;
      };
      practiceExams: {
        total: number;
        completed: number;
      };
    };
  };
}

export interface TimeAllocation {
  concepts: number;
  flashcards: number;
  practice: number;
  breaks: number;
  practiceExams?: number;
}

export interface SubjectProgress {
  subject: string;
  completion: number;
  concepts: number;
  flashcards: number;
  practiceExams: number;
}

export interface PastDayRecord {
  date: string;
  tasksCompleted: number;
  totalTasks: number;
  studyTimeMinutes: number;
  mood: MoodType;
  status?: 'completed' | 'partial' | 'missed';
}

// Additional task types for subject breakdown
export type ConceptTask = Task & { type: TaskType.Concept };
export type FlashcardTask = Task & { type: TaskType.Flashcard };
export type PracticeExamTask = Task & { type: TaskType.PracticeExam };
