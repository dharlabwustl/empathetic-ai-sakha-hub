
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AdminUser } from '@/types/admin';

interface AdminAuthContextProps {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is logged in
    const checkAdminAuth = () => {
      const adminData = localStorage.getItem('adminUser');
      if (adminData) {
        try {
          const admin = JSON.parse(adminData);
          setAdminUser(admin);
        } catch (error) {
          console.error('Error parsing admin user data:', error);
          localStorage.removeItem('adminUser');
        }
      }
      setIsLoading(false);
    };

    checkAdminAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (username === 'admin@example.com' && password === 'admin123') {
        const admin: AdminUser = {
          id: '1',
          username: 'admin',
          email: username,
          role: 'admin',
          permissions: ['read', 'write', 'delete']
        };
        
        setAdminUser(admin);
        localStorage.setItem('adminUser', JSON.stringify(admin));
        
        toast({
          title: 'Login Successful',
          description: 'Welcome to the admin dashboard',
        });
        
        return true;
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid credentials',
        });
        
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'An error occurred during login',
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
    
    toast({
      title: 'Logged Out',
      description: 'You have been logged out of the admin panel',
    });
  };

  return (
    <AdminAuthContext.Provider value={{ 
      adminUser, 
      isAuthenticated: !!adminUser, 
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextProps => {
  const context = useContext(AdminAuthContext);
  
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  
  return context;
};
