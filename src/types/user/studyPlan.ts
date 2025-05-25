
export interface StudyPlanSubject {
  id: string;
  name: string;
  chapters: StudyPlanChapter[];
  totalHours: number;
  completedHours: number;
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface StudyPlanChapter {
  id: string;
  name: string;
  topics: StudyPlanTopic[];
  estimatedHours: number;
  completed: boolean;
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  estimatedMinutes: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface StudyPlan {
  id: string;
  userId: string;
  examType: string;
  targetDate: string;
  subjects: StudyPlanSubject[];
  weeklyHours: number;
  dailyHours: number;
  createdAt: string;
  updatedAt: string;
}

// Legacy alias for backward compatibility
export type NewStudyPlanSubject = StudyPlanSubject;
