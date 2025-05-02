
export interface Topic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  proficiency?: 'strong' | 'weak' | 'medium';
  topics?: Topic[];
  progress?: number;
}

export type NewStudyPlanSubject = StudyPlanSubject;
export type Subject = StudyPlanSubject;

export interface StudyPlan {
  id: string;
  userId: string;
  goal: string;
  examGoal?: string;
  examDate?: string;
  daysLeft?: number;
  createdAt: string;
  updatedAt: string;
  subjects: StudyPlanSubject[];
  weeklyHours: number;
  status: 'active' | 'archived' | 'completed' | 'paused';
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'moderate' | 'fast';
  progressPercentage?: number;
}

export type NewStudyPlan = Partial<StudyPlan>;
