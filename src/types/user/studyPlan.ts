
export interface StudyPlanSubject {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  weeklyHours: number;
  completed: boolean;
  progress: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  topics?: string[];
  color?: string;
  proficiency?: number | string;
  hoursPerWeek?: number;
  status?: 'pending' | 'active' | 'completed';
}

export interface Subject extends StudyPlanSubject {}

export interface NewStudyPlanSubject extends StudyPlanSubject {
  isNew: boolean;
}

export interface StudyPlan {
  id: string;
  title?: string;
  subjects: StudyPlanSubject[];
  totalWeeklyHours: number;
  examDate?: string;
  examGoal?: string;
  status?: 'active' | 'completed' | 'paused' | 'pending';
  progressPercent?: number;
  progressPercentage?: number;
  daysLeft?: number;
  studyHoursPerDay?: number;
  weeklyHours?: number;
  learningPace?: string;
  createdAt: string;
  updatedAt: string;
  preferredStudyTime?: string;
}

export interface NewStudyPlan extends StudyPlan {
  isNew: boolean;
}
