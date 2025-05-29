
// Study Plan Types
export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'completed' | 'in-progress' | 'pending' | 'skipped';
  priority: 'high' | 'medium' | 'low';
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  hoursPerWeek: number;
  weeklyHours: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: 'weak' | 'medium' | 'strong';
  completed: boolean;
  status?: 'completed' | 'in-progress' | 'pending' | 'skipped';
  difficulty?: 'easy' | 'medium' | 'hard';
  topics?: StudyPlanTopic[];
  progress: number;
}

export interface StudyPlan {
  id: string;
  title?: string;
  goal?: string;
  examGoal: string;
  examDate: string;
  status: 'active' | 'completed' | 'archived' | 'paused';
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'medium' | 'fast';
  createdAt: string;
  updatedAt?: string;
  progressPercent?: number;
  progressPercentage?: number;
  progress?: number;
  daysLeft?: number;
  weeklyHours?: number;
  userId?: string;
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal: string;
  examDate: string | Date;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'medium' | 'fast';
  weeklyHours?: number;
  status?: 'active' | 'completed' | 'archived' | 'paused';
}

export type { StudyPlan, StudyPlanSubject, NewStudyPlan, StudyPlanTopic };
