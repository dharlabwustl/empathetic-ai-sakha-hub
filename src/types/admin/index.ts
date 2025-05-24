
export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  newUsersToday: number;
  dailyActiveUsers: Array<{ date: string; count: number }>;
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

export interface StudentData {
  id: string;
  name: string;
  email: string;
  role: string;
  subscriptionType: string;
  joinDate: string;
  lastActive: string;
  studyStreak: number;
  totalStudyHours: number;
  averageScore: number;
}

export interface ContentItem {
  id: string;
  title: string;
  type: string;
  subject: string;
  difficulty: string;
  status: string;
  createdAt: string;
  author: string;
}

export interface SystemLog {
  id: string;
  event: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  details: Record<string, any>;
}

export interface AdminSettings {
  siteName: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  backupFrequency: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: string;
  active: boolean;
}

export interface FeelGoodContent {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  active: boolean;
}
