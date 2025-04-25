
export interface AdminDashboardStats {
  totalUsers: number;
  monthlyActiveUsers: number;
  totalStudents: number;
  activeStudents: number;
  subscriptionConversionRate: number;
  churnRate: number;
  averageStudyTimePerUser: number;
  practiceAttemptsPerUser: number;
  userSatisfactionScore: number;
  referralRate: number;
  paidUsers: {
    total: number;
    breakdown: {
      free: number;
      basic: number;
      premium: number;
      enterprise: number;
      school: number;
      corporate: number;
    };
  };
  totalRevenue: number;
  totalConcepts: number;
  totalFlashcards: number;
  totalQuestions: number;
  verifiedMoodImprovement: number;
  averageMoodScore: number;
  averageTimeSavedPerWeek: number;
  studyPlanEfficiencyImprovement: number;
  studentsWithVerifiedConsistentHabits: number;
  studentsWithConsistentHabits: number;
  verifiedExamConfidenceImprovement: number;
  averageConfidenceScore: number;
  verifiedRetentionRate: number;
  verifiedMoodFeatureUsage: number;
  moodBasedSessionsCount: number;
  totalSessions: number;
  completedSurveys: number;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  subscriptionTier: string;
  studyTime: number;
  completedLessons: number;
  targetScore: number;
  avatarUrl?: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "critical";
  source: string;
  message: string;
  details?: string;
  resolved?: boolean;
  assignedTo?: string;
}
