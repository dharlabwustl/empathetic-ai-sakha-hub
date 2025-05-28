
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
  proficiency?: number;
  hoursPerWeek?: number;
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
  status?: 'active' | 'completed' | 'paused';
  progressPercent?: number;
  daysLeft?: number;
  studyHoursPerDay?: number;
  weeklyHours?: number;
  learningPace?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewStudyPlan extends StudyPlan {
  isNew: boolean;
}
