
// Re-export everything from the individual files
export * from './base';
export * from './exam';
export * from './student';
export * from './professional';
export * from './onboarding';
export * from './institutional';

// Add system log types that match the structure in admin/systemLog.ts
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
