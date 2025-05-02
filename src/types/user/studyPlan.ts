
export interface StudyPlanSubject {
  id?: string;
  name: string;
  color?: string;
  hoursPerWeek?: number;
  priority?: 'high' | 'medium' | 'low';
  proficiency?: 'strong' | 'weak' | 'moderate';
  progress?: number;
  topics?: Array<{
    id?: string;
    name: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    completed?: boolean;
    status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
    priority?: 'high' | 'medium' | 'low';
  }>;
}

export interface NewStudyPlanSubject {
  name: string;
  proficiency: 'strong' | 'weak' | 'moderate';
}

export interface Subject extends StudyPlanSubject {}

export interface StudyPlan {
  id: string;
  userId?: string;
  goal?: string;
  examGoal?: string;
  examDate?: string;
  daysLeft?: number;
  createdAt: string;
  updatedAt?: string;
  subjects: StudyPlanSubject[];
  weeklyHours?: number;
  status: 'active' | 'archived' | 'completed';
  progressPercentage?: number;
  studyHoursPerDay?: number;
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace?: 'slow' | 'moderate' | 'fast';
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: Date;
  subjects: NewStudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: string;
  learningPace: string;
}
