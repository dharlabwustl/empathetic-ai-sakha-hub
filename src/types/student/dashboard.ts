
// Types for student dashboard

export interface KpiItem {
  id: string;
  title: string;
  value: number | string;
  unit?: string;
  icon?: string;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface StudyTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string | Date;
  priority?: 'high' | 'medium' | 'low';
  type: 'practice' | 'review' | 'learn' | 'test' | 'video' | 'break' | 'wellness' | 'organization' | 'create';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string | Date;
  read: boolean;
  type: 'alert' | 'info' | 'success' | 'warning';
  link?: string;
}

export interface RevisionItem {
  id: string;
  topic: string;
  subject: string;
  lastReviewed?: Date | string;
  nextRevision: Date | string;
  strength: number; // 0-100
  priority: 'high' | 'medium' | 'low';
}

export interface StudySession {
  id: string;
  subject: string;
  topic?: string;
  duration: number; // in minutes
  date: Date | string;
  completed: boolean;
  performance?: number; // 0-100
}

export interface UserProgress {
  totalStudyTime: number; // in minutes
  conceptsMastered: number;
  topicsCompleted: number;
  todaysStudyStreak: number;
  weeklyProgress: number; // 0-100
  monthlyProgress: number; // 0-100
}
