
export interface StudyPlanSubject {
  id: string;
  name: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  status?: 'pending' | 'in-progress' | 'completed';
  priority?: 'high' | 'medium' | 'low';
  proficiency?: string | number;
  hoursPerWeek?: number;
  weeklyHours?: number;
  progress?: number;
  color?: string;
}

export interface NewStudyPlan {
  id: string;
  title: string;
  goal: string;
  examGoal: string;
  examDate: string;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  weeklyHours: number;
  status: 'pending' | 'active' | 'archived';
}
