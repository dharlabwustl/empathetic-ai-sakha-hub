
export interface SubjectProgress {
  id: string;
  subjectId: string;
  subjectName: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  lastStudyDate?: string;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  streakHistory: Array<{
    date: string;
    completed: boolean;
  }>;
}

export interface KpiData {
  id: string;
  label: string;
  value: number | null;
  unit: string;
  change: number;
  title: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
}

export interface NudgeData {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  action: string;
  actionLabel?: string;
  timestamp: string;
  read: boolean;
}
