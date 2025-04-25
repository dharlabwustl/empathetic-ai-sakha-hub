
export type TaskPriority = 'high' | 'medium' | 'low';
export type StudyTaskType = 'concept' | 'flashcard' | 'practice-exam';

export interface StudyPlanItem {
  id: string;
  type: StudyTaskType;
  title: string;
  subject: string;
  priority: TaskPriority;
  timeAllocation: number;
  completed: boolean;
  dueDate: string;
  completedAt?: string;
  description?: string;
  chapter?: string;
}

export interface StudyStatus {
  daily: {
    completedTasks: number;
    totalTasks: number;
    studyHours: number;
    mood: string;
  };
  weekly: {
    completedTasks: number;
    totalTasks: number;
    averageStudyHours: number;
    topSubjects: string[];
  };
  monthly: {
    completedTasks: number;
    totalTasks: number;
    averageStudyHours: number;
    improvement: number;
  };
}

export type MoodType = 'sad' | 'neutral' | 'happy' | 'motivated';
