
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed' | 'paused' | 'pending';
export type StudyPlanStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived' | 'pending';
export type LearningPace = 'slow' | 'normal' | 'fast' | 'moderate';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening' | 'night';

export interface StudyPlanTopic {
  id: string;
  name: string;
  completed: boolean;
  estimatedHours: number;
  status?: 'pending' | 'in-progress' | 'completed' | 'skipped';
  priority?: 'high' | 'medium' | 'low';
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  proficiency: 'weak' | 'medium' | 'strong';
  completed: boolean;
  status?: SubjectStatus;
  difficulty?: DifficultyLevel;
  isWeakSubject?: boolean;
  topics?: StudyPlanTopic[];
}

export interface StudyPlan {
  id: string;
  name: string;
  title: string;
  description: string;
  exam: string;
  examDate: string;
  examGoal: string;
  startDate: string;
  endDate: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek: number;
  weeklyHours: number;
  status: StudyPlanStatus;
  learningPace: LearningPace;
  preferredStudyTime: PreferredStudyTime;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  goal?: string;
  studyHoursPerDay?: number;
  progressPercent?: number;
  progressPercentage?: number;
  progress?: number;
  daysLeft?: number;
}

export interface NewStudyPlan {
  name?: string;
  title?: string;
  description?: string;
  exam?: string;
  examDate?: string | Date;
  examGoal?: string;
  goal?: string;
  startDate?: string;
  endDate?: string;
  subjects?: Omit<StudyPlanSubject, 'topics'>[];
  hoursPerWeek?: number;
  weeklyHours?: number;
  learningPace?: LearningPace;
  preferredStudyTime?: PreferredStudyTime;
  studyHoursPerDay?: number;
  status: StudyPlanStatus;
}
