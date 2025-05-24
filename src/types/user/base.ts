
export enum MoodType {
  HAPPY = 'happy',
  FOCUSED = 'focused',
  MOTIVATED = 'motivated',
  TIRED = 'tired',
  STRESSED = 'stressed',
  CONFUSED = 'confused',
  ANXIOUS = 'anxious',
  NEUTRAL = 'neutral',
  OKAY = 'okay',
  OVERWHELMED = 'overwhelmed',
  CURIOUS = 'curious',
  SAD = 'sad'
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  color: string;
  topics: number;
  completedTopics: number;
}

export interface LanguageOption {
  value: string;
  label: string;
  flag?: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  firstName?: string;
  email: string;
  avatar?: string;
  photoURL?: string;
  goals?: Array<{ title: string; description?: string }>;
  examPreparation?: string;
  loginCount?: number;
  createdAt?: string;
  preferences?: {
    language?: string;
    timezone?: string;
    notifications?: boolean;
  };
}

export interface StudySession {
  id: string;
  date: string;
  duration: number;
  subject: string;
  topics: string[];
  performance: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'study' | 'performance' | 'consistency' | 'special';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
}

export interface WeeklySchedule {
  [key: string]: {
    morning?: string[];
    afternoon?: string[];
    evening?: string[];
  };
}
