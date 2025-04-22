
import { UserRole } from './user/base';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface AdminAuthContextProps {
  user: AdminUser | null;
  adminUser: AdminUser | null;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  enableRegistration: boolean;
  enableGuestCheckout: boolean;
  maintenanceMode: boolean;
  theme: 'light' | 'dark' | 'system';
  features: {
    tutorChat: boolean;
    feelGood: boolean;
    moodTracking: boolean;
    surroundingInfluences: boolean;
  };
  flaskApiUrl?: string;
  apiKey?: string;
  aiModels?: string[];
  notificationSettings?: {
    newUserSignup: boolean;
    paymentReceived: boolean;
    systemAlerts: boolean;
  };
  contentApprovalRequired?: boolean;
  paymentGateway?: {
    provider: 'stripe' | 'razorpay' | 'paypal' | 'custom';
    isLive: boolean;
    apiKey?: string;
    secretKey?: string;
    webhookSecret?: string;
    redirectUrl?: string;
  };
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  examType: string;
  status: 'active' | 'inactive' | 'pending';
  completedOnboarding: boolean;
  lastActivity?: string;
  subscriptionStatus?: 'active' | 'expired' | 'trial';
  grades?: Record<string, number>;
  examDate?: string;
}

export interface KpiData {
  value: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface AdminDashboardStats {
  activeUsers: KpiData;
  totalRevenue: KpiData;
  conversionRate: KpiData;
  averageSessionTime: KpiData;
  // Adding all missing KPIs
  totalStudents: KpiData;
  monthlyActiveUsers: KpiData;
  subscriptionConversionRate: KpiData;
  churnRate: KpiData;
  averageStudyTimePerUser: KpiData;
  practiceAttemptsPerUser: KpiData;
  userSatisfactionScore: KpiData;
  referralRate: KpiData;
  paidUsers: KpiData;
  totalConcepts: KpiData;
  totalFlashcards: KpiData; 
  totalQuestions: KpiData;
  activeStudents: KpiData;
  totalSessions: KpiData;
  completedSurveys: KpiData;
  averageTimePerSession: KpiData;
  averageMoodScore: KpiData;
  verifiedMoodImprovement: KpiData;
  averageTimeSavedPerWeek: KpiData;
  studyPlanEfficiencyImprovement: KpiData;
  studentsWithVerifiedConsistentHabits: KpiData;
  studentsWithConsistentHabits: KpiData;
  verifiedExamConfidenceImprovement: KpiData;
  averageConfidenceScore: KpiData;
  verifiedRetentionRate: KpiData;
  verifiedMoodFeatureUsage: KpiData;
  moodBasedSessionsCount: KpiData;
  dailyActiveUsers: KpiData;
  weeklyActiveUsers: KpiData;
  monthlyActiveUsers2: KpiData;
  revenueGrowth: KpiData;
  averageRevenuePerUser: KpiData;
  lifetimeValue: KpiData;
  acquisitionCost: KpiData;
  returnOnInvestment: KpiData;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  type: 'error' | 'warning' | 'info' | 'success';
  level: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  source: string;
  resolved: boolean;
}
