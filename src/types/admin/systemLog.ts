
export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  timestamp: string;
  source: string;
  details: Record<string, any>; // Change from string to Record<string, any>
}
