
import React, { createContext, useContext, useState, useEffect } from 'react';
import adminAuthService from '@/services/auth/adminAuthService';

// Define admin user type
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Define the context types
export interface AdminAuthContextProps {
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  adminUser: AdminUser | null;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  adminLoginError: string | null;
}

// Create the context with a default value
const AdminAuthContext = createContext<AdminAuthContextProps>({
  isAdminAuthenticated: false,
  isAdminLoading: true,
  adminUser: null,
  adminLogin: async () => false,
  adminLogout: async () => {},
  adminLoginError: null
});

// Hook for using the admin auth context
export const useAdminAuth = () => useContext(AdminAuthContext);

// Provider component
export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Check if admin is authenticated on load
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        setIsAdminLoading(true);
        const isAuthenticated = adminAuthService.isAuthenticated();
        const user = await adminAuthService.getAdminUser();
        
        setIsAdminAuthenticated(isAuthenticated);
        setAdminUser(user);
      } catch (error) {
        console.error("Error checking admin auth:", error);
      } finally {
        setIsAdminLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  // Admin login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsAdminLoading(true);
      setAdminLoginError(null);
      
      const response = await adminAuthService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        setIsAdminAuthenticated(true);
        setAdminUser(response.data);
        return true;
      } else {
        setAdminLoginError(response.message || "Invalid credentials");
        return false;
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setAdminLoginError("An unexpected error occurred");
      return false;
    } finally {
      setIsAdminLoading(false);
    }
  };

  // Admin logout function
  const adminLogout = async (): Promise<void> => {
    try {
      await adminAuthService.adminLogout();
      setIsAdminAuthenticated(false);
      setAdminUser(null);
    } catch (error) {
      console.error("Admin logout error:", error);
    }
  };

  const value: AdminAuthContextProps = {
    isAdminAuthenticated,
    isAdminLoading,
    adminUser,
    adminLogin,
    adminLogout,
    adminLoginError
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
