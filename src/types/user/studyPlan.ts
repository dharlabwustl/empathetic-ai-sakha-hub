
export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  proficiency?: 'strong' | 'weak' | 'medium';
  topics?: Array<{
    id: string;
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    completed: boolean;
    status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
  }>;
}

export type NewStudyPlanSubject = StudyPlanSubject;
export type Subject = StudyPlanSubject;

export interface StudyPlan {
  id: string;
  userId: string;
  goal: string;
  examGoal?: string;
  examDate?: string;
  createdAt: string;
  updatedAt: string;
  subjects: StudyPlanSubject[];
  weeklyHours: number;
  status: 'active' | 'archived' | 'completed';
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'moderate' | 'fast';
}

export type NewStudyPlan = Omit<StudyPlan, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
