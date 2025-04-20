
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminUser } from '@/types/admin/index';

interface AdminAuthContextProps {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;  // This was missing
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextProps>({
  adminUser: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {}
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in (from localStorage)
    const checkAuth = async () => {
      try {
        const storedAdminUser = localStorage.getItem('adminUser');
        if (storedAdminUser) {
          const user = JSON.parse(storedAdminUser);
          setAdminUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking admin auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock login for demo purposes
      if (email === 'admin@example.com' && password === 'admin') {
        const adminUser: AdminUser = {
          id: 'admin-1',
          username: 'admin',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
          permissions: ['all', 'manage_users', 'manage_content', 'manage_features']
        };
        
        setAdminUser(adminUser);
        setIsAuthenticated(true);
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdminUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
