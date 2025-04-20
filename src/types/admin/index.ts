
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
}

// Re-export everything from the individual files
export * from './systemLog';
export * from './studyHabits';
export * from './studentData';
