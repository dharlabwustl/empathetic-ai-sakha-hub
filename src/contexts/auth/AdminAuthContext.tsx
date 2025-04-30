
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the context types
export interface AdminAuthContextValue {
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  adminLogin: (username: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

// Create the context with a default value
const AdminAuthContext = createContext<AdminAuthContextValue>({
  isAdminAuthenticated: false,
  isAdminLoading: true,
  adminLogin: async () => {},
  adminLogout: () => {}
});

// Hook for using the admin auth context
export const useAdminAuth = () => useContext(AdminAuthContext);

// Provider component
export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  // Check if admin is authenticated on load
  useEffect(() => {
    const checkAdminAuth = () => {
      const adminToken = localStorage.getItem('adminToken');
      setIsAdminAuthenticated(!!adminToken);
      setIsAdminLoading(false);
    };

    checkAdminAuth();
  }, []);

  // Admin login function
  const adminLogin = async (username: string, password: string): Promise<void> => {
    try {
      // Mock admin login - replace with actual API call
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminToken', 'mock-admin-token-12345');
        setIsAdminAuthenticated(true);
        return Promise.resolve();
      } else {
        return Promise.reject(new Error('Invalid credentials'));
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return Promise.reject(error);
    }
  };

  // Admin logout function
  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
  };

  const value: AdminAuthContextValue = {
    isAdminAuthenticated,
    isAdminLoading,
    adminLogin,
    adminLogout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
