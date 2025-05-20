
export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  event: string;
  source: string;
  details?: any;
  message?: string;
}
