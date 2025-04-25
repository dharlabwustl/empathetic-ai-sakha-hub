export interface SubjectProgress {
  id: string;
  subjectId: string;
  subjectName: string;
  name?: string; // Added for compatibility with components
  color?: string; // Added for compatibility with components
  progress: number;
  totalTopics: number;
  completedTopics: number;
  lastStudyDate?: string;
  studyHours?: number[];
  topics?: Array<{
    id: string;
    name: string;
    completed: boolean;
    progress: number;
  }>;
  quizScores?: Array<{
    id: string;
    score: number;
    date: string;
    timeTaken: number;
  }>;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  current?: number; // Added for compatibility with components
  thisWeek?: number; // Added for compatibility with components
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

export interface DailyTaskItem {
  id: string;
  type: 'concept' | 'flashcard' | 'practice-exam';
  title: string;
  subject: string;
  chapter?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  completedAt?: string;
  dueDate: string;
  description?: string;
}

export interface DailyStudyPlan {
  date: string;
  tasks: DailyTaskItem[];
  completionRate: number;
}

export interface StudyHistory {
  date: string;
  plan: DailyStudyPlan;
}
