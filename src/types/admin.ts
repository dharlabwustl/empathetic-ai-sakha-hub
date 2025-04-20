
export interface AdminDashboardStats {
  totalUsers: number;
  monthlyActiveUsers: number;
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
    };
  };
  totalRevenue: number;
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
