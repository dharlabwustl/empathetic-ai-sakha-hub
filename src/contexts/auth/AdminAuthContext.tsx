
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdminAuthenticated: false,
  isLoading: true,
  error: null,
  loginAdmin: async () => false,
  adminLogout: () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing admin session on component mount
  useEffect(() => {
    const checkAdminAuth = () => {
      setIsLoading(true);
      try {
        // In a real app, this would verify the token with an API
        const adminToken = localStorage.getItem('adminToken');
        setIsAdminAuthenticated(!!adminToken);
      } catch (err) {
        console.error('Admin auth check error:', err);
        setError('Failed to verify authentication');
        setIsAdminAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  // Login function
  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API request
      if (email === 'admin@prepzr.com' && password === 'admin123') {
        // Set token in localStorage (would be a JWT in real app)
        localStorage.setItem('adminToken', 'mock-admin-auth-token');
        localStorage.setItem('adminUser', JSON.stringify({ email }));
        
        setIsAdminAuthenticated(true);
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAdminAuthenticated(false);
  };

  const value: AdminAuthContextType = {
    isAdminAuthenticated,
    isLoading,
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
