export interface StudyPlanSubject {
  name: string;
  totalHours: number;
  completedHours: number;
  priority: 'high' | 'medium' | 'low';
  topics: string[];
}

// Keep this for backward compatibility
export type NewStudyPlanSubject = StudyPlanSubject;

export interface StudyPlan {
  id: string;
  userId: string;
  examType: string;
  targetDate: Date;
  subjects: StudyPlanSubject[];
  weeklyHours: number;
  dailyHours: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  target: number;
  color: string;
}
