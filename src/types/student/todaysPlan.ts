
import { MoodType } from '../user/base';

export interface StudyBlock {
  id: string;
  title: string;
  duration: number;
  startTime?: string;
  completed: boolean;
  type: TaskType;
  subject?: string;
  topic?: string;
  resources?: string[];
}

export enum TaskType {
  Concept = 'concept',
  Revision = 'revision',
  Practice = 'practice',
  Break = 'break',
  Test = 'test'
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
  status: TaskStatus;
  type: TaskType;
  subject?: string;
  topic?: string;
  priority: 'low' | 'medium' | 'high';
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
