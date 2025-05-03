
export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: 'strong' | 'medium' | 'weak';
  completed: boolean;
  topics?: Array<{
    id: string;
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    completed: boolean;
    status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
    priority?: 'high' | 'medium' | 'low';
  }>;
}

export type NewStudyPlanSubject = StudyPlanSubject;
export type Subject = StudyPlanSubject;

export interface StudyPlan {
  id: string;
  examGoal?: string;
  examDate?: string | Date;
  createdAt: string;
  updatedAt?: string;
  subjects: StudyPlanSubject[];
  status: 'active' | 'completed' | 'archived';
  progress?: number;
  weeklyHours?: number;
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'moderate' | 'fast';
  progressPercentage?: number;
  daysLeft?: number;
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: string | Date;
  subjects: StudyPlanSubject[];
  status?: 'active' | 'completed' | 'archived';
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'moderate' | 'fast';
  weeklyHours?: number;
}
