
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
}

export interface SystemLog {
  id: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  details: string;
}
