
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import adminAuthService from '@/services/auth/adminAuthService';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  adminLoginError: string | null;
  adminLogin: (credentials: { email: string; password: string }) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  adminUser: null,
  isAdminAuthenticated: false,
  isAdminLoading: true,
  adminLoginError: null,
  adminLogin: async () => false,
  adminLogout: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState<boolean>(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      setIsAdminLoading(true);
      try {
        const user = await adminAuthService.getAdminUser();
        if (user) {
          setAdminUser(user);
          setIsAdminAuthenticated(true);
        }
      } catch (error) {
        console.error('Admin auth check failed:', error);
        // Clear potentially invalid session
        localStorage.removeItem('adminToken');
      } finally {
        setIsAdminLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  const adminLogin = async (credentials: { email: string; password: string }): Promise<boolean> => {
    setAdminLoginError(null);
    try {
      const response = await adminAuthService.adminLogin(credentials);
      if (response.success && response.data) {
        setAdminUser(response.data);
        setIsAdminAuthenticated(true);
        return true;
      } else {
        setAdminLoginError(response.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setAdminLoginError('An unexpected error occurred');
      return false;
    }
  };

  const adminLogout = async (): Promise<void> => {
    try {
      await adminAuthService.adminLogout();
    } catch (error) {
      console.error('Admin logout error:', error);
    } finally {
      setAdminUser(null);
      setIsAdminAuthenticated(false);
      localStorage.removeItem('adminToken');
    }
  };

  const value = {
    adminUser,
    isAdminAuthenticated,
    isAdminLoading,
    adminLoginError,
    adminLogin,
    adminLogout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
