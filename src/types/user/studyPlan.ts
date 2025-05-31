
export type StudyPlanStatus = 'active' | 'completed' | 'paused' | 'draft';
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed';
export type Priority = 'low' | 'medium' | 'high';
export type Proficiency = 'weak' | 'medium' | 'strong';
export type LearningPace = 'slow' | 'medium' | 'fast';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening';

export interface StudyPlanTopic {
  id: string;
  name: string;
  hoursAllocated: number;
  status?: SubjectStatus;
  priority?: Priority;
  difficulty?: 'easy' | 'medium' | 'hard';
}

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
  createdAt: string;
  updatedAt: string;
  status: StudyPlanStatus;
  hoursPerWeek: number;
  totalHours: number;
  progress: number;
  progressPercent: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: PreferredStudyTime;
  learningPace: LearningPace;
}

export interface NewStudyPlan {
  name: string;
  description: string;
  exam: string;
  examDate: string;
  examGoal: string;
  startDate: string;
  endDate: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek?: number;
  totalHours: number;
  studyHoursPerDay: number;
  preferredStudyTime: PreferredStudyTime;
  learningPace: LearningPace;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  features: string[];
  bestValue?: boolean;
  isExamCredits?: boolean;
}
