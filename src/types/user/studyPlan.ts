
export type StudyPlanStatus = 'pending' | 'in-progress' | 'completed' | 'paused';
export type StudyPlanDifficulty = 'easy' | 'medium' | 'hard';
export type StudyPlanPriority = 'low' | 'medium' | 'high';
export type StudyPlanProficiency = 'weak' | 'medium' | 'strong';

export interface StudyPlanTopic {
  id: string;
  name: string;
  description?: string;
  completed?: boolean;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  difficulty: StudyPlanDifficulty;
  completed: boolean;
  status: StudyPlanStatus;
  priority: StudyPlanPriority;
  proficiency: StudyPlanProficiency;
  hoursPerWeek: number;
  chaptersTotal: number;
  chaptersCompleted: number;
  estimatedHours: number;
  actualHours: number;
  topics: (string | StudyPlanTopic)[];
}

export interface StudyPlan {
  id: string;
  title: string;
  description?: string;
  examType: string;
  targetDate: Date;
  subjects: StudyPlanSubject[];
  totalHours: number;
  completedHours: number;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
