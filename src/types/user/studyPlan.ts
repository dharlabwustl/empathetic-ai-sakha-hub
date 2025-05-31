
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed' | 'paused';
export type StudyPlanStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';
export type LearningPace = 'slow' | 'normal' | 'fast';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening';

export interface StudyPlanTopic {
  id: string;
  name: string;
  completed: boolean;
  estimatedHours: number;
  difficulty?: DifficultyLevel;
  status?: SubjectStatus;
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
  progressPercent?: number;
  progressPercentage?: number;
  progress?: number;
  daysLeft?: number;
  studyHoursPerDay?: number;
}

export interface NewStudyPlan {
  name?: string;
  description?: string;
  exam?: string;
  examDate?: string;
  examGoal?: string;
  startDate?: string;
  endDate?: string;
  subjects?: StudyPlanSubject[];
  hoursPerWeek?: number;
  learningPace?: LearningPace;
  preferredStudyTime?: PreferredStudyTime;
  studyHoursPerDay?: number;
  weeklyHours?: number;
  status?: StudyPlanStatus;
}
