
export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  source: string;
  resolved?: boolean;
  type: string;
  details: Record<string, any>;
  severity: 'info' | 'warning' | 'error';
}
