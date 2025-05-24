
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
}

export interface StudyPlanTopic {
  id: string;
  name: string;
  subjectId: string;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  actualMinutes?: number;
  resources: StudyResource[];
}

export interface StudyResource {
  id: string;
  type: 'video' | 'reading' | 'practice' | 'flashcard';
  title: string;
  url?: string;
  duration?: number;
  completed: boolean;
}

export interface StudyPlan {
  id: string;
  userId: string;
  examType: string;
  targetDate: Date;
  createdAt: Date;
  updatedAt: Date;
  subjects: StudyPlanSubject[];
  weeklyGoal: number;
  dailyGoal: number;
  preferences: {
    studyHours: number;
    preferredTime: string;
    breakDuration: number;
    studyStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  };
}

// Export alias for backward compatibility
export type NewStudyPlanSubject = StudyPlanSubject;
