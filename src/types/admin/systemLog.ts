
export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
  timestamp: Date;
  resolved: boolean;
  details?: Record<string, any>;
}
