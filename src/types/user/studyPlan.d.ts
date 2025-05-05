
export interface StudyPlanTopic {
  id: string;
  name: string;
  completed: boolean;
  status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
  priority?: 'high' | 'medium' | 'low';
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  proficiency: 'weak' | 'medium' | 'strong';
  priority: 'high' | 'medium' | 'low';
  hoursPerWeek: number;
  completed: boolean;
  isWeakSubject?: boolean;
  topics?: StudyPlanTopic[];
}

export interface StudyPlan {
  id: string;
  title?: string;
  goal?: string;
  examGoal: string;
  examDate: string;
  status: 'active' | 'completed' | 'archived';
  subjects: StudyPlanSubject[];
  learningPace?: 'slow' | 'moderate' | 'fast';
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay?: number;
  weeklyHours?: number;
  progressPercent?: number;
  daysLeft?: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewStudyPlan {
  title?: string;
  goal?: string;
  examGoal: string;
  examDate: string | Date;
  subjects: Omit<StudyPlanSubject, 'topics'>[];
  learningPace?: 'slow' | 'moderate' | 'fast';
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay?: number;
  weeklyHours?: number;
  status: 'active' | 'completed' | 'archived';
}
