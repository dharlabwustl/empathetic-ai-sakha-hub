
export interface StudyPlanSubject {
  id: string;
  name: string;
  totalHours: number;
  completedHours: number;
  priority: 'high' | 'medium' | 'low';
  topics: string[];
  color?: string;
  proficiency?: number;
  hoursPerWeek?: number;
}

export interface StudyPlan {
  id: string;
  userId: string;
  title?: string;
  examType: string;
  examGoal?: string;
  targetDate: Date;
  examDate?: Date;
  subjects: StudyPlanSubject[];
  weeklyHours: number;
  dailyHours: number;
  studyHoursPerDay?: number;
  createdAt: Date;
  updatedAt: Date;
  status?: 'active' | 'completed' | 'paused';
  progressPercent?: number;
  daysLeft?: number;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  target: number;
  color: string;
}
