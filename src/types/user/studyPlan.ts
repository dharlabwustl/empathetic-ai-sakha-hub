
export type SubjectProficiency = 'weak' | 'medium' | 'strong';
export type SubjectPriority = 'low' | 'medium' | 'high';
export type SubjectDifficulty = 'easy' | 'medium' | 'hard';
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed' | 'paused';
export type StudyPlanStatus = 'draft' | 'active' | 'paused' | 'completed';
export type LearningPace = 'slow' | 'medium' | 'fast';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening';

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: SubjectPriority;
  proficiency: SubjectProficiency;
  difficulty?: SubjectDifficulty;
  completed: boolean;
  status?: SubjectStatus;
}

export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  exam: string;
  examDate: string;
  examGoal?: string;
  startDate: string;
  endDate: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek: number;
  totalHours: number;
  studyHoursPerDay?: number;
  status: StudyPlanStatus;
  progress: number;
  progressPercent?: number;
  daysLeft?: number;
  learningPace: LearningPace;
  preferredStudyTime: PreferredStudyTime;
  createdAt: string;
  updatedAt: string;
}

export interface NewStudyPlan {
  name: string;
  description: string;
  exam: string;
  examDate: string;
  examGoal?: string;
  startDate: string;
  endDate: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek: number;
  totalHours: number;
  studyHoursPerDay?: number;
  status: StudyPlanStatus;
  progress: number;
  learningPace: LearningPace;
  preferredStudyTime: PreferredStudyTime;
}
