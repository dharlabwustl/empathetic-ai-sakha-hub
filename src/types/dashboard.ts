export interface DashboardData {
  totalStudents: number;
  activeStudents: number;
  averageMood: number;
  weeklyStudyHours: number;
  completedGoals: number;
  upcomingMilestones: Milestone[];
  moodTrends: { date: string; moodScore: number }[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  type: 'exam' | 'assignment' | 'practice' | 'revision';
  subject?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface MoodTheme {
  background: string;
  textColor: string;
  borderColor: string;
  accent: string;
}

export interface MoodEntry {
  date: string;
  moodScore: number;
  notes?: string;
}
