export interface Goal {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  hoursPerWeek: number;
  totalHours: number;
  subjects: string[];
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'pdf';
}

export type LearningPace = 'slow' | 'medium' | 'fast';
export type PreferredStudyTime = 'morning' | 'afternoon' | 'evening';
export type StudyPlanStatus = 'active' | 'paused' | 'completed';
export type SubjectStatus = 'not-started' | 'in-progress' | 'completed';

export interface StudyPlanSubject {
  id: string;
  name: string;
  color: string;
  hoursPerWeek: number;
  weeklyHours: number;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  proficiency: 'weak' | 'medium' | 'strong';
  completed: boolean;
  status?: SubjectStatus;
  difficulty?: 'easy' | 'medium' | 'hard';
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
  status: StudyPlanStatus;
  learningPace: LearningPace;
  preferredStudyTime: PreferredStudyTime;
}
