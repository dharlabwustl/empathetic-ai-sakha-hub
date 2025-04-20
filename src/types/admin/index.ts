
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin' | 'content_manager';
  avatar?: string;
  lastLogin?: string;
  permissions?: string[];
}

export interface AdminSettings {
  notificationsEnabled: boolean;
  emailAlerts: boolean;
  dashboardRefreshInterval: number;
  theme: string;
  analyticsEnabled: boolean;
  autoLogout: boolean;
  logoutTimeoutMinutes: number;
  contentApprovalRequired?: boolean;
  aiModels: string[] | any[];
  flaskApiUrl: string;
  apiKey: string;
  notificationSettings: any;
}

export * from './studentData';
export * from './systemLog';
export * from './studyHabits';
export * from './content';
