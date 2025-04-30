import { KpiData } from '@/hooks/useKpiTracking';

export interface DashboardData {
  examGoal: string;
  subjects: SubjectData[];
  conceptCards: ConceptCardData[];
  studyPlan: StudyPlanData;
  progressTracker: ProgressData[];
  revisionItems?: RevisionItem[];
  milestones?: Milestone[];
}

export interface RevisionItem {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface SubjectData {
  name: string;
  progress: number;
  proficiency: 'strong' | 'weak' | 'moderate';
  lastStudied?: string;
  quizzesTaken?: number;
  averageScore?: number;
}

export interface ConceptCardData {
  id: string;
  title: string;
  subject: string;
  lastReviewed?: string;
  masteryLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export interface StudyPlanData {
  startDate: string;
  endDate: string;
  hoursPerWeek: number;
  subjects: { name: string; hours: number }[];
}

export interface ProgressData {
  date: string;
  studyHours: number;
  quizzesTaken: number;
}
