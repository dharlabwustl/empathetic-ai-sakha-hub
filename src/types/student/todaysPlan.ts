
import { MoodType } from "@/types/user/base";

export enum TaskType {
  Concept = "concept",
  Flashcard = "flashcard",
  PracticeExam = "practice-exam"
}

export enum TaskStatus {
  NotStarted = "not-started",
  InProgress = "in-progress",
  Completed = "completed",
  Skipped = "skipped",
  Pending = "pending"
}

export interface BaseTask {
  id: string;
  subject: string;
  type: TaskType;
  status: TaskStatus | string;
  timeEstimate: string;
}

export interface ConceptTask extends BaseTask {
  type: TaskType.Concept;
  title: string;
}

export interface FlashcardTask extends BaseTask {
  type: TaskType.Flashcard;
  deckName: string;
  cardCount?: number;
}

export interface PracticeExamTask extends BaseTask {
  type: "practice-exam";
  examName: string;
  questionCount: number;
}

export type Task = ConceptTask | FlashcardTask | PracticeExamTask;

export interface TimeAllocation {
  subject: string;
  percentage: number;
  color: string;
}

export interface StudyBlock {
  startTime: string;
  endTime: string;
  tasks: Task[];
  mood?: MoodType;
  completed?: boolean;
}

export interface SubjectProgress {
  name: string;
  progress: number;
  color: string;
  tasksCompleted: number;
  totalTasks: number;
}

export interface PastDayRecord {
  date: string;
  tasksCompleted: number;
  totalTasks: number;
  mood: MoodType;
  studyHours: number;
}

export interface TodaysPlanData {
  date: string;
  currentBlock?: StudyBlock;
  upcomingBlocks: StudyBlock[];
  completedBlocks: StudyBlock[];
  timeAllocations: TimeAllocation[];
  subjects: SubjectProgress[];
  backlog: Task[];
  pastDays: PastDayRecord[];
}
