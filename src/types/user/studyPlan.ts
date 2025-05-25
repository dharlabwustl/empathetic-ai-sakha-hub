
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
  hoursPerWeek?: number;
  totalHours: number;
  completedHours: number;
  priority: 'high' | 'medium' | 'low';
  proficiency?: 'weak' | 'medium' | 'strong' | number;
  completed?: boolean;
  status?: 'completed' | 'in-progress' | 'pending' | 'skipped';
  difficulty?: 'easy' | 'medium' | 'hard';
  topics?: StudyPlanTopic[] | string[];
}

export interface StudyPlan {
  id: string;
  title?: string;
  goal?: string;
  examGoal?: string;
  examType: string;
  examDate?: string | Date;
  targetDate: Date;
  status?: 'active' | 'completed' | 'archived' | 'pending';
  subjects: StudyPlanSubject[];
  studyHoursPerDay?: number;
  dailyHours: number;
  weeklyHours: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'moderate' | 'fast';
  createdAt: string | Date;
  updatedAt?: string | Date;
  progressPercent?: number;
  progressPercentage?: number;
  progress?: number;
  daysLeft?: number;
  userId?: string;
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal?: string;
  examType: string;
  examDate?: string | Date;
  targetDate: Date;
  subjects: StudyPlanSubject[];
  studyHoursPerDay?: number;
  dailyHours: number;
  weeklyHours: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'moderate' | 'fast';
  status?: 'active' | 'completed' | 'archived' | 'pending';
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  target: number;
  color: string;
}

export type { StudyPlan, StudyPlanSubject, NewStudyPlan, StudyPlanTopic };
