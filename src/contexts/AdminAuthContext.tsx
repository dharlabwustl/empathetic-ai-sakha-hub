import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AdminUser } from '@/types/admin';

interface AdminAuthContextProps {
  user: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAuth = () => {
      const adminData = localStorage.getItem('adminUser');
      if (adminData) {
        try {
          const admin = JSON.parse(adminData);
          setUser(admin);
        } catch (error) {
          console.error('Error parsing admin user data:', error);
          localStorage.removeItem('adminUser');
        }
      }
      setLoading(false);
    };

    checkAdminAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@example.com' && password === 'admin123') {
        const admin: AdminUser = {
          id: '1',
          username: 'admin',
          email: email,
          role: 'admin',
          permissions: ['read', 'write', 'delete']
        };
        
        setUser(admin);
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
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    
    toast({
      title: 'Logged Out',
      description: 'You have been logged out of the admin panel',
    });
  };

  return (
    <AdminAuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      loading, 
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
