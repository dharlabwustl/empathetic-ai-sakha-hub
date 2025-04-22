
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminAuthContextProps, AdminUser } from '@/types/admin';
import adminAuthService from '@/services/admin/adminAuthService';

const AdminAuthContext = createContext<AdminAuthContextProps>({
  user: null,
  adminUser: null,
  loading: true,
  isLoading: true,
  error: null,
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve()
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const storedUser = adminAuthService.getCurrentUser();
        
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error initializing admin authentication:', error);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await adminAuthService.login(email, password);
      
      if (userData) {
        setUser(userData);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to log in');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await adminAuthService.logout();
      setUser(null);
      localStorage.removeItem('adminUser');
    } catch (error) {
      console.error('Error during logout:', error);
      setError('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  const value: AdminAuthContextProps = {
    user,
    adminUser: user,
    loading,
    isLoading: loading,
    error,
    isAuthenticated: !!user,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

export default AdminAuthContext;
