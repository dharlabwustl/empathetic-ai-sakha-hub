
export interface StudyPlanTopic {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  proficiency: 'weak' | 'medium' | 'strong';
  priority: 'high' | 'medium' | 'low';
  hoursPerWeek: number;
  completed: boolean;
  topics?: StudyPlanTopic[]; // Topics is now properly defined as optional
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StudyPlan {
  id: string;
  userId?: string;
  goal?: string;
  examGoal: string;
  examDate: string | Date;
  status: 'active' | 'completed' | 'archived' | 'pending';
  subjects: StudyPlanSubject[];
  learningPace: 'slow' | 'moderate' | 'fast';
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay: number;
  weeklyHours: number;
  progressPercentage?: number; // Use progressPercentage consistently
  progressPercent?: number; // Keep for backward compatibility
  daysLeft?: number;
  createdAt: string;
  updatedAt: string;
  title?: string;
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: string | Date;
  subjects: Omit<StudyPlanSubject, 'topics'>[];
  learningPace?: 'slow' | 'moderate' | 'fast';
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay?: number;
  weeklyHours: number;
  goal?: string;
}
