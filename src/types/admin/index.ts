
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
  studyTimeConsistencyImprovement: number;
  completedStudyPlans: number;
  verifiedExamConfidenceImprovement: number;
  averageConfidenceScore: number;
  activeStudents: number;
  verifiedMoodFeatureUsage: number;
  moodBasedSessionsCount: number;
  totalSessions: number;
  completedSurveys: number;
}

export interface SystemLog {
  id: string;
  event: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: Record<string, any>;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  lastActive: string;
  progress: number;
}
