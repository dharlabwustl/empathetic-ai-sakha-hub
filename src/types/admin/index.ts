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
  
  // Verified metrics
  verifiedMoodImprovement?: number;
  averageTimeSavedPerWeek?: number;
  studentsWithVerifiedConsistentHabits?: number;
  verifiedExamConfidenceImprovement?: number;
  verifiedRetentionRate?: number;
  verifiedMoodFeatureUsage?: number;
  completedSurveys?: number;
}
