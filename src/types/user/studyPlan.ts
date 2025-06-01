
export type StudyPlanStatus = 'active' | 'completed' | 'paused' | 'draft' | 'pending';
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed' | 'pending';
export type Priority = 'low' | 'medium' | 'high';
export type Proficiency = 'weak' | 'medium' | 'strong';
export type LearningPace = 'slow' | 'medium' | 'fast' | 'moderate';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening' | 'night';

export interface StudyPlanTopic {
  id: string;
  name: string;
  hoursAllocated: number;
  status?: SubjectStatus;
  priority?: Priority;
  difficulty?: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  progressPercent?: number;
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
  difficulty?: 'easy' | 'medium' | 'hard';
  status?: SubjectStatus;
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
  progressPercentage?: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: PreferredStudyTime;
  learningPace: LearningPace;
  weeklyHours?: number;
  daysLeft?: number;
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

// Export alias for compatibility
export type NewStudyPlanSubject = StudyPlanSubject;
