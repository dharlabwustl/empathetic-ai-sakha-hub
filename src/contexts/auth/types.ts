
import { AuthUser } from '@/services/auth/authService';

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
  adminUser: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions?: string[];
  } | null;
  isAuthenticated: boolean;
  loading: boolean; // This property was missing
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}
