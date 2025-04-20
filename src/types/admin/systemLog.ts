
export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
  timestamp: string; // Changed from Date to string for consistency
  resolved: boolean;
  details?: Record<string, any>;
}
