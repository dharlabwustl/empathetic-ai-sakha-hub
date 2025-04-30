
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import adminAuthService from '@/services/auth/adminAuthService';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextProps {
  isAuthenticated: boolean;
  user: AdminUser | null;
  loading: boolean;
  adminLoginError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextProps>({
  isAuthenticated: false,
  user: null,
  loading: true,
  adminLoginError: null,
  login: async () => false,
  logout: async () => {}
});

export const useAdminAuth = () => useContext(AdminAuthContext);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing admin session
    const checkAuth = async () => {
      setLoading(true);
      try {
        const currentUser = await adminAuthService.getAdminUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking admin auth:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAdminLoginError(null);
    
    try {
      const response = await adminAuthService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        return true;
      } else {
        setAdminLoginError(response.message || "Login failed");
        return false;
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setAdminLoginError("An unexpected error occurred");
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await adminAuthService.adminLogout();
      setUser(null);
    } catch (error) {
      console.error("Admin logout error:", error);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        adminLoginError,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
