
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
}

interface AdminAuthContextProps {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean; // Added this property
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if admin is logged in on initial load
  useEffect(() => {
    const checkAdminAuthStatus = () => {
      try {
        const storedAdmin = localStorage.getItem('adminUser');
        if (storedAdmin) {
          setAdminUser(JSON.parse(storedAdmin));
        }
      } catch (error) {
        console.error('Error checking admin auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    try {
      // For demo, hardcoded admin credentials
      if (email === 'admin@sakha.ai' && password === 'admin123') {
        const adminUserData: AdminUser = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@sakha.ai',
          role: 'admin',
          permissions: ['all']
        };

        localStorage.setItem('adminUser', JSON.stringify(adminUserData));
        localStorage.setItem('adminToken', `admin-token-${Date.now()}`);
        setAdminUser(adminUserData);

        setLoading(false);
        return true;
      }

      throw new Error('Invalid credentials');
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive'
      });
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    setAdminUser(null);
    navigate('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
