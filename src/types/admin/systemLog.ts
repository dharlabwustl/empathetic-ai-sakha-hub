
export interface SystemLog {
  id: string;
  timestamp: string;
  type: string;
  details: Record<string, any>;
  severity: 'info' | 'warning' | 'error';
  level: 'info' | 'warning' | 'error' | 'critical';
  resolved?: boolean;
  message?: string;
  source?: string;
}
