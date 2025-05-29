
export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  hoursPerWeek?: number;
  weeklyHours: number;
  progress: number;
  priority?: 'low' | 'medium' | 'high';
  proficiency?: 'weak' | 'medium' | 'strong';
  completed?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface NewStudyPlanSubject {
  name: string;
  proficiency: 'strong' | 'weak' | 'medium';
}

export interface StudyPlan {
  id: string;
  title: string;
  goal: string;
  examGoal: string;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'medium' | 'fast';
  weeklyHours: number;
  examDate: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal?: string;
  subjects?: StudyPlanSubject[];
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'medium' | 'fast';
  weeklyHours?: number;
  examDate?: string;
  status?: 'active' | 'paused' | 'completed' | 'archived';
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  isPopular?: boolean;
  bestValue?: boolean;
  isExamCredits?: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  completed?: boolean;
  category: string;
  progress: number;
}
