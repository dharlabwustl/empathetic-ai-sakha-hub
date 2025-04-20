
// Re-export StudentData from studentData.ts to ensure consistency
export * from './studentData';
export * from './systemLog';

// Admin Dashboard Stats Interface
export interface AdminDashboardStats {
  totalStudents: number;
  activeStudents: number;
  studentsWithConsistentHabits: number;
  averageMoodScore: number;
  studyPlanEfficiencyImprovement: number;
  averageConfidenceScore: number;
  totalSessions: number;
  moodBasedSessionsCount: number;
  studentsWithMoodTracking: number;
  
  // New KPIs for admin dashboard
  dailyActiveUsers?: number;
  weeklyActiveUsers?: number;
  monthlyActiveUsers?: number;
  freeUsers?: number;
  paidUsers?: number;
  groupUsers?: number;
  subscriptionConversionRate?: number;
  churnRate?: number;
  averageStudyTimePerUser?: number;
  practiceAttemptsPerUser?: number;
  weakAreaIdentificationRate?: number;
  userSatisfactionScore?: number;
  referralRate?: number;

  // Verified metrics
  verifiedMoodImprovement?: number;
  averageTimeSavedPerWeek?: number;
  studentsWithVerifiedConsistentHabits?: number;
  verifiedExamConfidenceImprovement?: number;
  verifiedRetentionRate?: number;
  verifiedMoodFeatureUsage?: number;
  completedSurveys?: number;
}
