
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '@/types/user/base';

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
        const adminToken = localStorage.getItem('adminToken');
        const adminUserStr = localStorage.getItem('adminUser');
        
        if (adminToken && adminUserStr) {
          try {
            const user = JSON.parse(adminUserStr) as AdminUser;
            setIsAdminAuthenticated(true);
            setAdminUser(user);
          } catch (e) {
            console.error("Error parsing admin user data", e);
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
          }
        }
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
      
      console.log("Admin login attempt:", email);
      
      // For demo, allow any email with 'admin' in it and password length > 3
      if (email.includes('admin') && password.length > 3) {
        const adminUser: AdminUser = {
          id: 'admin1',
          name: 'Admin User',
          email: email,
          role: 'admin',
          permissions: ['all']
        };
        
        localStorage.setItem('adminToken', `admin-token-${Date.now()}`);
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        
        setIsAdminAuthenticated(true);
        setAdminUser(adminUser);
        console.log("Admin login successful");
        return true;
      } else {
        setAdminLoginError("Invalid admin credentials");
        console.log("Admin login failed: Invalid credentials");
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

  // Admin logout function - no longer uses navigation
  const adminLogout = async (): Promise<void> => {
    try {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
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
