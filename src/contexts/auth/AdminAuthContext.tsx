
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define admin user type
export interface AdminUser {
  username: string;
  role: 'admin' | 'superadmin';
  permissions: string[];
}

// Define the context types
export interface AdminAuthContextValue {
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  adminUser: AdminUser | null;
  adminLogin: (username: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

// Create the context with a default value
const AdminAuthContext = createContext<AdminAuthContextValue>({
  isAdminAuthenticated: false,
  isAdminLoading: true,
  adminUser: null,
  adminLogin: async () => {},
  adminLogout: () => {}
});

// Hook for using the admin auth context
export const useAdminAuth = () => useContext(AdminAuthContext);

// Provider component
export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Check if admin is authenticated on load
  useEffect(() => {
    const checkAdminAuth = () => {
      const adminToken = localStorage.getItem('adminToken');
      const adminUserData = localStorage.getItem('adminUser');
      
      setIsAdminAuthenticated(!!adminToken);
      
      if (adminToken && adminUserData) {
        try {
          const userData = JSON.parse(adminUserData);
          setAdminUser(userData);
        } catch (error) {
          console.error('Error parsing admin user data:', error);
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
      
      setIsAdminLoading(false);
    };

    checkAdminAuth();
  }, []);

  // Admin login function
  const adminLogin = async (username: string, password: string): Promise<void> => {
    try {
      // Mock admin login - replace with actual API call
      if (username === 'admin' && password === 'admin123') {
        // Store token
        localStorage.setItem('adminToken', 'mock-admin-token-12345');
        
        // Create mock admin user
        const mockAdminUser: AdminUser = {
          username: 'admin',
          role: 'admin',
          permissions: ['dashboard', 'users', 'content', 'settings']
        };
        
        // Store user data
        localStorage.setItem('adminUser', JSON.stringify(mockAdminUser));
        
        setAdminUser(mockAdminUser);
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
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    setIsAdminAuthenticated(false);
  };

  const value: AdminAuthContextValue = {
    isAdminAuthenticated,
    isAdminLoading,
    adminUser,
    adminLogin,
    adminLogout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
