
// Study Plan Types
export interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  status: 'completed' | 'in-progress' | 'pending';
  priority: 'high' | 'medium' | 'low';
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color?: string;
  hoursPerWeek: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: 'weak' | 'medium' | 'strong';
  completed: boolean;
  status?: 'completed' | 'in-progress' | 'pending';
  difficulty?: 'easy' | 'medium' | 'hard';
  topics?: StudyPlanTopic[];
}

export interface StudyPlan {
  id: string;
  title?: string;
  goal?: string;
  examGoal: string;
  examDate: string | Date;
  status: 'active' | 'completed' | 'archived' | 'pending';
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  createdAt: string;
  updatedAt?: string;
  progressPercent?: number;
  progressPercentage?: number;
  progress?: number;
  daysLeft?: number;
  weeklyHours?: number;
  userId?: string;
}

export interface NewStudyPlan {
  id?: string;
  goal?: string;
  examGoal: string;
  examDate: string | Date;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  weeklyHours?: number;
}

// Export the types to be used in other files
export type { StudyPlan, StudyPlanSubject, NewStudyPlan, StudyPlanTopic };
