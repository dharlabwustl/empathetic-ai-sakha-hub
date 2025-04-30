
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
}

interface AdminAuthContextValue {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  adminLoginError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing admin session
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      try {
        setAdminUser(JSON.parse(storedAdmin));
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setAdminLoginError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock authentication logic
      if (email === 'admin@prepzr.com' && password === 'admin123') {
        const admin: AdminUser = {
          id: 'admin_1',
          name: 'Admin User',
          email: email,
          role: 'admin',
          permissions: ['all']
        };
        
        setAdminUser(admin);
        localStorage.setItem('adminUser', JSON.stringify(admin));
        
        toast({
          title: 'Login successful',
          description: 'Welcome to the admin dashboard'
        });
        
        setLoading(false);
        return true;
      } else {
        setAdminLoginError('Invalid email or password');
        
        toast({
          title: 'Login failed',
          description: 'Invalid email or password',
          variant: 'destructive'
        });
        
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setAdminLoginError('An unexpected error occurred');
      
      toast({
        title: 'Login error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
      
      setLoading(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully'
    });
  };

  return (
    <AdminAuthContext.Provider value={{
      adminUser,
      isAuthenticated: !!adminUser,
      loading,
      adminLoginError,
      login,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
