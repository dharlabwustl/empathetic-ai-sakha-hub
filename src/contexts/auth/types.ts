
import { AuthUser } from '@/services/auth/authService';
import { AdminUser } from '@/types/admin';

// Auth context types
export interface AuthContextProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phoneNumber: string, password: string, role?: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Admin auth context types
export interface AdminAuthContextProps {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  isLoading?: boolean; // Adding this for backward compatibility
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Add exam goal type
export type ExamGoal = {
  title: string;
  description?: string;
  targetDate?: Date;
  progress?: number;
  status?: 'not-started' | 'in-progress' | 'completed';
};
