
export interface TodaysPlanData {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  dailyGoal: string;
  estimatedTimeRemaining: number;
  backlogTasks: BacklogTask[];
  todaysTasks: TodayTask[];
}

export interface BacklogTask {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'quiz' | 'revision';
  overdueDays: number;
  priority: 'high' | 'medium' | 'low';
}

export interface TodayTask {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'quiz' | 'revision';
  estimatedTime: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}
