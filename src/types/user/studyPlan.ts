
export type LearningPace = 'slow' | 'medium' | 'fast';
export type StudyPlanStatus = 'active' | 'paused' | 'completed';
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening';
export type StudyPlanPriority = 'low' | 'medium' | 'high';
export type StudyPlanDifficulty = 'easy' | 'medium' | 'hard';
export type SubjectProficiency = 'weak' | 'medium' | 'strong';

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: StudyPlanPriority;
  proficiency: SubjectProficiency;
  completed: boolean;
  difficulty?: StudyPlanDifficulty;
  status?: SubjectStatus;
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
  status: StudyPlanStatus;
  hoursPerWeek: number;
  totalHours: number;
  completedHours: number;
  learningPace: LearningPace;
  preferredStudyTime: PreferredStudyTime;
}

export interface NewStudyPlan {
  name: string;
  description: string;
  exam: string;
  startDate: string;
  endDate: string;
  examDate: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek: number;
  totalHours: number;
  completedHours: number;
  learningPace: LearningPace;
  preferredStudyTime: PreferredStudyTime;
}
