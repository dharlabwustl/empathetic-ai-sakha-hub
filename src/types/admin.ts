
export interface AdminUser {
  id: string;
  username: string;
  name?: string;
  email: string;
  role: string;
  permissions?: string[];
}

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
  
  // Additional properties needed to fix errors
  role?: string;
  examType?: string;
  registrationDate?: string;
  phoneNumber?: string;
  completedOnboarding?: boolean;
  goals?: string[];
  moodScore?: number;
  studyHours?: number;
  engagementScore?: number;
  subjectsSelected?: string[];
  joinedDate?: string;
  status?: "active" | "inactive" | "pending";
  examPrep?: string;
  subjects?: string[];
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  } | number;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "critical";
  source: string;
  message: string;
  details?: string | Record<string, any>;
  resolved?: boolean;
  assignedTo?: string;
}

export interface AdminSettings {
  notificationsEnabled: boolean;
  emailAlerts: boolean;
  dashboardRefreshInterval: number;
  theme: 'light' | 'dark' | 'system';
  analyticsEnabled: boolean;
  autoLogout: boolean;
  logoutTimeoutMinutes: number;
}

// Re-export everything from the individual files
export * from './admin/systemLog';
export * from './admin/studyHabits';
export * from './admin/studentData';
