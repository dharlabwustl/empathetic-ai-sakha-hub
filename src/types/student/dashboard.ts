
export interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: Date;
}

export interface DashboardStats {
  totalStudyTime: number;
  completedTasks: number;
  upcomingExams: number;
  averageScore: number;
}
