
export type UserRole = 'student' | 'admin' | 'content_creator' | 'teacher' | 'parent';

export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  goals?: Goal[];
  subjects?: Subject[];
  createdAt: string;
  stats?: UserStats;
  loginCount?: number;
  lastLogin?: string;
  streak?: number;
  profileImage?: string;
  school?: string;
  grade?: string;
  preferences?: UserPreferences;
  moodHistory?: MoodEntry[];
}

export interface UserPreferences {
  theme: string;
  notifications: boolean;
  studyReminders: boolean;
  contentFormat: 'text' | 'visual' | 'audio' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  studySessionDuration: number;
}

export interface MoodEntry {
  mood: 'sad' | 'neutral' | 'happy' | 'motivated' | 'curious' | 'stressed' | 'tired';
  timestamp: string;
  note?: string;
}

export interface Goal {
  id: string;
  title: string;
  deadline?: string;
  progress: number;
  type: 'exam' | 'course' | 'skill' | 'other';
  description?: string;
  subgoals?: Goal[];
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  lastStudied?: string;
  totalTimeSpent?: number;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  progress: number;
}

export interface UserStats {
  totalStudyTime: number;
  questionsAnswered: number;
  testsCompleted: number;
  averageScore: number;
  lastActive?: string;
  weeklyStudyTime: number[];
}
