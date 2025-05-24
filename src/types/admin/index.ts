
export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  newUsersToday: number;
  dailyActiveUsers: Array<{ date: string; count: number }>;
  subscriptionsByPlan: Record<string, number>;
  verifiedMoodImprovement: number;
  averageMoodScore: number;
  averageTimeSavedPerWeek: number;
  studyPlanEfficiencyImprovement: number;
  studentsWithVerifiedConsistentHabits: number;
  studentsWithConsistentHabits: number;
  totalStudents: number;
  verifiedRetentionRate: number;
  verifiedExamConfidenceImprovement: number;
  averageConfidenceScore: number;
  activeStudents: number;
  verifiedMoodFeatureUsage: number;
  moodBasedSessionsCount: number;
  totalSessions: number;
  completedSurveys: number;
  averageConcepts?: number;
  totalStudyPlans?: number;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  joinedDate?: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  subjects?: string[];
  examPrep?: string;
  lastActive?: string;
  progress?: {
    completedTopics: number;
    totalTopics: number;
  };
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'exam' | 'video';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  createdBy: string;
}

export interface SystemLog {
  id: string;
  event: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: Record<string, any>;
}

export interface AdminSettings {
  id: string;
  name: string;
  value: any;
  description: string;
  category: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'email' | 'push' | 'sms';
  isActive: boolean;
}

export interface FeelGoodContent {
  id: string;
  title: string;
  content: string;
  type: 'quote' | 'tip' | 'exercise';
  isActive: boolean;
}
