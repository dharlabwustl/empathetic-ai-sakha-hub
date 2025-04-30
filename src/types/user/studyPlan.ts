
export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  topics?: Array<{
    id: string;
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    completed: boolean;
  }>;
}

export type NewStudyPlanSubject = StudyPlanSubject;
export type Subject = StudyPlanSubject;

export interface StudyPlan {
  id: string;
  userId: string;
  goal: string;
  examDate?: string;
  createdAt: string;
  updatedAt: string;
  subjects: StudyPlanSubject[];
  weeklyHours: number;
  status: 'active' | 'archived' | 'completed';
}

export type NewStudyPlan = Omit<StudyPlan, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
