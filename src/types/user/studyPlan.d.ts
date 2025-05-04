
export interface StudyPlanTopic {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
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
  topics?: StudyPlanTopic[]; // Topics is now properly defined
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'pending' | 'in-progress' | 'completed';
  isWeakSubject?: boolean;
}

export interface StudyPlan {
  id: string;
  userId?: string;
  goal?: string;
  examGoal: string;
  examDate: string;
  status: 'active' | 'completed' | 'archived' | 'pending';
  subjects: StudyPlanSubject[];
  learningPace: 'slow' | 'moderate' | 'fast';
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay: number;
  weeklyHours: number;
  progressPercentage?: number;
  progressPercent?: number; // Keep for backward compatibility
  daysLeft?: number;
  createdAt: string;
  updatedAt: string;
  title?: string;
  progress?: number; // Adding progress for compatibility with code using this
  topics?: StudyPlanTopic[]; // Top-level topics
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
