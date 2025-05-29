
export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: string | number;
  completed: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal?: string;
  subjects?: StudyPlanSubject[];
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'fast';
  weeklyHours?: number;
  examDate?: string;
  status?: 'pending' | 'active' | 'archived';
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description?: string;
  bestValue?: boolean;
  isExamCredits?: boolean;
}
