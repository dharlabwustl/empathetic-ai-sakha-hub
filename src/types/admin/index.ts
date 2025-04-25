
export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
  details: string;
  resolved?: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalRevenue: number;
  conversionRate: number;
  averageSessionTime: number;
  topFeatures: { name: string; usage: number }[];
}
