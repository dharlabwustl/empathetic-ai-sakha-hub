
// Re-export everything from the individual files
export * from './base';
export * from './exam';
export * from './student';
export * from './professional';
export * from './onboarding';
export * from './institutional';

// Add system log types to fix the type error
export interface SystemLog {
  id: string;
  timestamp: string;
  type: string;
  details: Record<string, any>;
  severity: 'info' | 'warning' | 'error';
}
