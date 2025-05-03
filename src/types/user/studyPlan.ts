
export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  proficiency?: 'strong' | 'weak' | 'medium';
  difficulty?: 'easy' | 'medium' | 'hard';
  completed: boolean;
  progress?: number; // Adding progress field which is used in some components
  topics?: Array<{
    id: string;
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    completed: boolean;
    status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
    priority?: 'high' | 'medium' | 'low';
  }>;
}

export type NewStudyPlanSubject = Omit<StudyPlanSubject, 'id' | 'completed'> & { proficiency: 'strong' | 'weak' | 'medium' };
export type Subject = StudyPlanSubject;

export interface StudyPlan {
  id: string;
  userId?: string;
  goal: string;
  examGoal?: string;
  examDate?: string;
  createdAt?: string;
  updatedAt?: string;
  subjects: StudyPlanSubject[];
  weeklyHours: number;
  status: 'active' | 'archived' | 'completed';
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'moderate' | 'fast';
  progressPercentage?: number;
  daysLeft?: number;
}

export type NewStudyPlan = Partial<Omit<StudyPlan, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> & {
  goal: string;
  subjects: StudyPlanSubject[];
};
