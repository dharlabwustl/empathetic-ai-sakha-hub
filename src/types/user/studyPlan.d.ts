
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
  topics?: StudyPlanTopic[]; // Topics is optional but properly defined
  difficulty?: 'easy' | 'medium' | 'hard'; // Added missing properties
  status?: 'pending' | 'in-progress' | 'completed'; // Added missing properties
  isWeakSubject?: boolean;
}

export interface StudyPlan {
  id: string;
  userId?: string; // Added as optional
  goal?: string; // Added as optional
  examGoal: string;
  examDate: string;
  status: 'active' | 'completed' | 'archived' | 'pending';
  subjects: StudyPlanSubject[];
  learningPace: 'slow' | 'moderate' | 'fast';
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay: number;
  weeklyHours: number;
  progressPercentage?: number; // Added as optional
  progressPercent?: number; // Keep for backward compatibility
  daysLeft?: number; // Added as optional
  createdAt: string;
  updatedAt: string;
  title?: string;
  progress?: number; // Added for compatibility with code using this
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
