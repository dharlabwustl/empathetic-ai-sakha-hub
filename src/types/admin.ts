
export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  newUsersToday: number;
  dailyActiveUsers: { date: string; count: number }[];
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
  studyTimeConsistencyImprovement: number;
  completedStudyPlans: number;
  verifiedExamConfidenceImprovement: number;
  averageConfidenceScore: number;
  verifiedRetentionRate: number;
  activeStudents: number;
  verifiedMoodFeatureUsage: number;
  moodBasedSessionsCount: number;
  totalSessions: number;
  completedSurveys: number;
  activeMoodTrackers: number; // Added this to fix the build error
}
