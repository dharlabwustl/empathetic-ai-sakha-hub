
export * from './studentData';

// Basic admin types for dashboard
export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  newUsersToday: number;
  dailyActiveUsers: Array<{date: string; count: number}>;
  subscriptionsByPlan: {
    free: number;
    basic: number;
    premium: number;
  };
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
}

export interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: string;
  createdAt: string;
}

export interface SystemLog {
  id: string;
  level: string;
  message: string;
  timestamp: string;
}

export interface AdminSettings {
  siteName: string;
  allowRegistration: boolean;
  maintenanceMode: boolean;
  [key: string]: any;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: string;
}

export interface FeelGoodContent {
  id: string;
  title: string;
  content: string;
  type: string;
  isActive: boolean;
}
