
export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
  timestamp: string; // Using string consistently for timestamp
  resolved: boolean;
  details?: Record<string, any>; // Using Record<string, any> for details
}
