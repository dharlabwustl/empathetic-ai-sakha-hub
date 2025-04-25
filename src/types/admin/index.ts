
export type { SystemLog } from './systemLog';
export type { AdminDashboardStats } from './dashboardStats';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  lastLogin?: string;
  permissions?: string[];
}
