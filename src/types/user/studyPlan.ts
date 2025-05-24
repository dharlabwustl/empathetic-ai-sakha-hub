
export interface StudyPlanSubject {
  id: string;
  name: string;
  progress: number;
  totalHours: number;
  completedHours: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  subjects: StudyPlanSubject[];
  totalHours: number;
  completedHours: number;
  progress: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewStudyPlan {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  subjects: StudyPlanSubject[];
}
