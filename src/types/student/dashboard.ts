
export interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: Date;
  type?: string;
  retentionScore?: number;
}

export interface DashboardStats {
  totalStudyTime: number;
  completedTasks: number;
  upcomingExams: number;
  averageScore: number;
}

export interface ProgressSnapshot {
  id: string;
  date: string;
  completedTasks: number;
  studyTime: number;
  score: number;
}

export interface ProgressTracker {
  snapshots: ProgressSnapshot[];
  weeklyGoal: number;
  currentStreak: number;
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  color: string;
  topics: number;
  completedTopics: number;
}

export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  progress: number;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'deadline' | 'goal';
  progress: number;
  description: string;
}
