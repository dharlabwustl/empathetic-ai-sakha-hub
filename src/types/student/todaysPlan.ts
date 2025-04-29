
import { MoodType } from "@/types/user/base";

export type TaskType = 'concept' | 'flashcard' | 'practice-exam';

export interface TaskCount {
  count: number;
  description: string;
}

export interface SubjectTask {
  type: TaskType;
  assigned: TaskCount;
  pending: TaskCount;
  timeEstimate: number;
}

export interface SubjectBreakdownData {
  name: string;
  tasks: {
    concepts?: SubjectTask[];
    flashcards?: SubjectTask[];
    practiceExams?: SubjectTask[];
  };
}

export interface PendingTask {
  id: string;
  name: string;
  subject: string;
  type: TaskType;
  dueDate: string;
  completionTime: number;
  difficultyLevel: 'easy' | 'medium' | 'hard';
}

export interface TimeAllocationSummary {
  concepts: number;
  flashcards: number;
  practiceExams: number;
  total: number;
}

export { MoodType };
