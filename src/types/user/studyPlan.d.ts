
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
  topics?: StudyPlanTopic[]; // Make topics optional
  difficulty?: 'easy' | 'medium' | 'hard'; // Add difficulty field
}

export interface StudyPlan {
  id: string;
  userId?: string; // Add userId field
  examGoal: string;
  examDate: string | Date;
  status: 'active' | 'completed' | 'archived' | 'pending'; // Add 'pending' status
  subjects: StudyPlanSubject[];
  learningPace: 'slow' | 'moderate' | 'fast';
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay: number;
  weeklyHours: number;
  progressPercentage?: number; // Add progressPercentage field
  progressPercent?: number; // Keep the existing progressPercent field
  daysLeft?: number; // Add daysLeft field
  createdAt: string;
  updatedAt: string;
  goal?: string; // Add goal field
}

export interface NewStudyPlan {
  examGoal: string;
  examDate: string | Date;
  subjects: Omit<StudyPlanSubject, 'topics'>[];
  learningPace?: 'slow' | 'moderate' | 'fast';
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay?: number;
  weeklyHours: number;
  goal?: string; // Add goal field
}
