
export interface StudyPlanSubject {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  weeklyHours: number;
  completed: boolean;
  progress: number;
}

export interface Subject extends StudyPlanSubject {}

export interface NewStudyPlanSubject extends StudyPlanSubject {
  isNew: boolean;
}

export interface StudyPlan {
  id: string;
  subjects: StudyPlanSubject[];
  totalWeeklyHours: number;
  examDate?: string;
  createdAt: string;
  updatedAt: string;
}
