
export interface SystemLog {
  id: string;
  timestamp: string;
  type: string;
  details: Record<string, any>;
  severity: 'info' | 'warning' | 'error';
  resolved?: boolean;
  message?: string;
  source?: string;
  level?: 'info' | 'warning' | 'error' | 'critical';
}
