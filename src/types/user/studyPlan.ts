
export type StudyPlanStatus = 'active' | 'paused' | 'completed';
export type LearningPace = 'slow' | 'fast' | 'medium';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening';
export type Priority = 'low' | 'medium' | 'high';
export type Proficiency = 'weak' | 'medium' | 'strong';
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: Priority;
  proficiency: Proficiency;
  completed: boolean;
  status?: SubjectStatus;
  difficulty?: Difficulty;
}

export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  exam: string;
  startDate: string;
  endDate: string;
  examDate: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek: number;
  totalHours: number;
  status: StudyPlanStatus;
  learningPace: LearningPace;
  preferredStudyTime: PreferredStudyTime;
  createdAt: string;
  updatedAt: string;
}

export interface NewStudyPlan {
  name?: string;
  description?: string;
  exam?: string;
  startDate?: string;
  endDate?: string;
  examDate?: string;
  subjects?: StudyPlanSubject[];
  hoursPerWeek?: number;
  totalHours?: number;
  status?: StudyPlanStatus;
  learningPace?: LearningPace;
  preferredStudyTime?: PreferredStudyTime;
}
