
export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  hoursPerWeek?: number;
  weeklyHours: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: string | number;
  completed: boolean;
  progress: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface StudyPlan {
  id: string;
  title: string;
  goal: string;
  examGoal: string;
  subjects: StudyPlanSubject[];
  examDate: string;
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  weeklyHours: number;
  status: 'pending' | 'active' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal?: string;
  subjects?: StudyPlanSubject[];
  examDate: string;
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'moderate' | 'fast';
  weeklyHours?: number;
  status?: 'pending' | 'active' | 'completed' | 'archived';
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  popular?: boolean;
  bestValue?: boolean;
  isExamCredits?: boolean;
}
