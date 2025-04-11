
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  permissions: string[];
  lastLogin?: Date;
}

export interface AdminDashboardStats {
  totalStudents: number;
  activeStudents: number;
  newSignupsToday: number;
  totalQuestions: number;
  totalConcepts: number;
  totalFlashcards: number;
  totalEngagementHours: number;
  averageMoodScore: number;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: Date;
  lastActive: Date;
  completedOnboarding: boolean;
  goals: string[];
  examType: string;
  studyHours: number;
  subjectsSelected: string[];
  moodScore: number;
  engagementScore: number;
}

export interface ContentItem {
  id: string;
  type: 'concept' | 'flashcard' | 'question' | 'exam';
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  approved: boolean;
  usageCount: number;
}

export interface NotificationTemplate {
  id: string;
  title: string;
  body: string;
  type: 'reminder' | 'achievement' | 'suggestion' | 'system';
  trigger: 'time' | 'event' | 'mood' | 'manual';
  active: boolean;
}

export interface AIModelSettings {
  modelName: string;
  apiKey: string;
  temperature: number;
  maxTokens: number;
  active: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
  details?: any;
}

export interface AdminSettings {
  aiModels: AIModelSettings[];
  notificationSettings: {
    maxPerDay: number;
    quietHoursStart: number;
    quietHoursEnd: number;
  };
  contentApprovalRequired: boolean;
  flaskApiUrl: string;
  apiKey: string;
}
