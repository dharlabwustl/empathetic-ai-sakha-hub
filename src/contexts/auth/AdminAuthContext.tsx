
import React, { createContext, useContext, useEffect, useState } from 'react';
import adminAuthService from '@/services/auth/adminAuthService';
import { AdminUser } from '@/types/user/base';

export interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  adminUser: AdminUser | null;
  error: string | null;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdminAuthenticated: false,
  isLoading: true,
  adminUser: null,
  error: null,
  loginAdmin: async () => false,
  adminLogout: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing admin session on component mount and auth state changes
  const checkAdminAuth = async () => {
    setIsLoading(true);
    try {
      // Check if the admin is authenticated using our authService
      const isAuthenticated = adminAuthService.isAuthenticated();
      setIsAdminAuthenticated(isAuthenticated);
      
      if (isAuthenticated) {
        const user = await adminAuthService.getAdminUser();
        setAdminUser(user);
      } else {
        setAdminUser(null);
      }
    } catch (err) {
      console.error('Admin auth check error:', err);
      setError('Failed to verify authentication');
      setIsAdminAuthenticated(false);
      setAdminUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdminAuth();
    
    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAdminAuth();
    };
    
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, []);

  // Login function using our admin auth service
  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await adminAuthService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        setIsAdminAuthenticated(true);
        setAdminUser(response.data);
        return true;
      } else {
        setError(response.message || 'Invalid credentials');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const adminLogout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await adminAuthService.adminLogout();
      setIsAdminAuthenticated(false);
      setAdminUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError('Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const value: AdminAuthContextType = {
    isAdminAuthenticated,
    isLoading,
    adminUser,
    error,
    loginAdmin,
    adminLogout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
