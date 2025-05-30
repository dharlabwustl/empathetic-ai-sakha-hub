
export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: 'strong' | 'medium' | 'weak';
  completed: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface NewStudyPlan {
  id?: string;
  title?: string;
  goal?: string;
  examGoal?: string;
  examDate: string;
  subjects?: StudyPlanSubject[];
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'fast';
  weeklyHours?: number;
  status?: 'pending' | 'active' | 'archived';
}

export interface StudyPlan extends NewStudyPlan {
  id: string;
  title: string;
  goal: string;
  examDate: string;
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'active' | 'archived';
}
