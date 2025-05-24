
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
  color?: string;
}

export interface StudyPlan {
  id: string;
  title: string;
  description?: string;
  examType: string;
  examGoal?: string;
  targetDate: Date;
  examDate?: Date;
  subjects: StudyPlanSubject[];
  totalHours: number;
  completedHours: number;
  progress: number;
  progressPercent?: number;
  status?: StudyPlanStatus;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  daysLeft?: number;
  studyHoursPerDay?: number;
  weeklyHours?: number;
}

export interface StudyPlanWizardData {
  examGoal: string;
  targetDate: Date;
  studyHours: number;
  subjects: string[];
  strongSubjects: string[];
  mediumSubjects: string[];
  weakSubjects: string[];
  studyPace: 'slow' | 'medium' | 'fast';
}
