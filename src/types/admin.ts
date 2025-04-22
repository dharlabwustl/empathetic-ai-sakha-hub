
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
}

export interface SystemLog {
  id: string;
  timestamp: string;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  source: string;
  resolved: boolean;
}
