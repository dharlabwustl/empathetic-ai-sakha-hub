
export interface StudyPlanTopic {
  id: string;
  name: string;
  subjectId: string;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  actualMinutes?: number;
  resources: StudyResource[];
  status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
  priority?: 'high' | 'medium' | 'low';
}

export interface StudyResource {
  id: string;
  type: 'video' | 'reading' | 'practice' | 'flashcard' | 'interactive' | '3d-model';
  title: string;
  url?: string;
  duration?: number;
  completed: boolean;
  format?: 'text' | 'visual' | 'interactive' | '3d' | 'video';
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  targetScore?: number;
  currentScore?: number;
  chaptersTotal: number;
  chaptersCompleted: number;
  estimatedHours: number;
  actualHours: number;
  topics: StudyPlanTopic[];
  color: string;
  proficiency: 'weak' | 'medium' | 'strong';
  hoursPerWeek: number;
  completed: boolean;
  isWeakSubject?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
}

export interface StudyPlan {
  id: string;
  userId: string;
  title?: string;
  goal?: string;
  examGoal: string;
  examDate: string | Date;
  targetDate: Date;
  createdAt: Date | string;
  updatedAt: Date | string;
  subjects: StudyPlanSubject[];
  weeklyGoal: number;
  dailyGoal: number;
  preferences: {
    studyHours: number;
    preferredTime: string;
    breakDuration: number;
    studyStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  };
  learningPace?: 'slow' | 'moderate' | 'fast';
  preferredStudyTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  studyHoursPerDay?: number;
  weeklyHours?: number;
  progressPercent?: number;
  progressPercentage?: number;
  progress?: number;
  daysLeft?: number;
  status: 'active' | 'completed' | 'archived' | 'pending';
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
  status: 'active' | 'completed' | 'archived' | 'pending';
}

// Export alias for backward compatibility
export type NewStudyPlanSubject = StudyPlanSubject;
