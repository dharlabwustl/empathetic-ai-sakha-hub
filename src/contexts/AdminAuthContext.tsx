
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminUser, AdminAuthContextProps } from '@/types/admin';
import { adminAuthService } from '@/services/admin/adminAuthService';

// Create context with default values
const AdminAuthContext = createContext<AdminAuthContextProps>({
  admin: null,
  loading: false,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  error: null,
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing admin session on mount
  useEffect(() => {
    const checkAdminSession = async () => {
      setLoading(true);
      try {
        const storedAdmin = localStorage.getItem('adminUser');
        if (storedAdmin) {
          const adminData = JSON.parse(storedAdmin);
          // In a real app, you would verify the token with your backend
          setAdmin(adminData);
        }
      } catch (err) {
        console.error('Error checking admin session:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAdminSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const adminData = await adminAuthService.login(email, password);
      setAdmin(adminData);
      // Store admin data in localStorage (in production, store only the token)
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    setAdmin(null);
    navigate('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated: !!admin,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
