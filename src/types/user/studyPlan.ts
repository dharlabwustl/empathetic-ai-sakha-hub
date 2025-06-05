
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed';
export type StudyPlanStatus = 'active' | 'paused' | 'draft' | 'completed';
export type LearningPace = 'slow' | 'moderate' | 'fast';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening' | 'night';
export type SubjectProficiency = 'weak' | 'medium' | 'strong';
export type SubjectPriority = 'low' | 'medium' | 'high';
export type SubjectDifficulty = 'easy' | 'medium' | 'hard';

export interface StudyPlanTopic {
  id: string;
  name: string;
  completed: boolean;
  status: SubjectStatus;
  hoursAllocated: number;
  progressPercent: number;
}

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  weeklyHours: number;
  hoursPerWeek: number;
  progress: number;
  priority: SubjectPriority;
  proficiency: SubjectProficiency;
  difficulty: SubjectDifficulty;
  completed: boolean;
  status: SubjectStatus;
  isWeakSubject?: boolean;
  topics?: StudyPlanTopic[];
}

export interface StudyPlan {
  id: string;
  title: string;
  examGoal: string;
  examDate: string;
  status: StudyPlanStatus;
  progress: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: PreferredStudyTime;
  learningPace: LearningPace;
  createdAt: string;
  completedAt?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface NewStudyPlan {
  name: string;
  description?: string;
  exam: string;
  examDate: string;
  examGoal: string;
  startDate?: string;
  endDate?: string;
  subjects: StudyPlanSubject[];
  hoursPerWeek?: number;
  totalHours?: number;
  studyHoursPerDay: number;
  preferredStudyTime: PreferredStudyTime;
  learningPace: LearningPace;
}
