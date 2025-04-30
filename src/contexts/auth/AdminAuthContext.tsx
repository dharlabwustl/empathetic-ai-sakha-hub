
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AuthUser } from '@/services/auth/authService';

interface AdminAuthContextProps {
  adminUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);

  // Check for existing admin session
  useEffect(() => {
    const storedAdminUser = localStorage.getItem('admin_user');
    if (storedAdminUser) {
      try {
        const parsedUser = JSON.parse(storedAdminUser);
        setAdminUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse admin user from localStorage');
        localStorage.removeItem('admin_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, just check for a hardcoded admin credential
    if (email === 'admin@prepzr.com' && password === 'admin123') {
      const adminUserData: AuthUser = {
        id: 'admin-1',
        name: 'Admin User',
        email,
        role: 'admin',
        token: `admin-token-${Date.now()}`
      };
      
      localStorage.setItem('admin_user', JSON.stringify(adminUserData));
      setAdminUser(adminUserData);
      return true;
    }
    
    return false;
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('admin_user');
    setAdminUser(null);
    // Don't navigate here - let the component that calls logout handle navigation
  };

  const value = {
    adminUser,
    isAuthenticated: !!adminUser,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  
  return context;
};
