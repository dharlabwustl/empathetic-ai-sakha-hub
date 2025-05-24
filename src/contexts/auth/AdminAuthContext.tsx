
import React, { createContext, useContext, useEffect, useState } from 'react';
import adminAuthService from '@/services/auth/adminAuthService';
import { AdminUser } from '@/types/user/base';

export interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  adminUser: AdminUser | null;
  error: string | null;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdminAuthenticated: false,
  isLoading: true,
  adminUser: null,
  error: null,
  loginAdmin: async () => false,
  adminLogout: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkAdminAuth = async () => {
    console.log("🔄 AdminAuthContext: Checking authentication");
    setIsLoading(true);
    try {
      const isAuthenticated = adminAuthService.isAuthenticated();
      console.log("🎯 AdminAuthContext: Auth check result:", isAuthenticated);
      
      if (isAuthenticated) {
        const user = await adminAuthService.getAdminUser();
        console.log("👤 AdminAuthContext: User loaded:", user?.email);
        setAdminUser(user);
        setIsAdminAuthenticated(true);
      } else {
        setAdminUser(null);
        setIsAdminAuthenticated(false);
      }
      setError(null);
    } catch (err) {
      console.error('💥 AdminAuthContext: Auth check error:', err);
      setError('Authentication check failed');
      setIsAdminAuthenticated(false);
      setAdminUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdminAuth();
    
    const handleAuthChange = () => {
      console.log("🔄 AdminAuthContext: Auth state changed event received");
      checkAdminAuth();
    };
    
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, []);

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    console.log("🔐 AdminAuthContext: Login attempt for", email);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await adminAuthService.adminLogin({ email, password });
      console.log("📊 AdminAuthContext: Login response:", response);
      
      if (response.success && response.data) {
        setIsAdminAuthenticated(true);
        setAdminUser(response.data);
        setError(null);
        console.log("✅ AdminAuthContext: Login successful, user set");
        return true;
      } else {
        setError(response.message || 'Invalid credentials');
        setIsAdminAuthenticated(false);
        setAdminUser(null);
        console.log("❌ AdminAuthContext: Login failed:", response.message);
        return false;
      }
    } catch (err) {
      console.error('💥 AdminAuthContext: Login error:', err);
      setError('Login failed. Please try again.');
      setIsAdminAuthenticated(false);
      setAdminUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogout = async (): Promise<void> => {
    console.log("🚪 AdminAuthContext: Logout started");
    setIsLoading(true);
    try {
      await adminAuthService.adminLogout();
      setIsAdminAuthenticated(false);
      setAdminUser(null);
      setError(null);
      console.log("✅ AdminAuthContext: Logout successful");
    } catch (err) {
      console.error('💥 AdminAuthContext: Logout error:', err);
      setError('Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const value: AdminAuthContextType = {
    isAdminAuthenticated,
    isLoading,
    adminUser,
    error,
    loginAdmin,
    adminLogout,
  };

  console.log("📊 AdminAuthContext: Current state:", { 
    isAdminAuthenticated, 
    adminUser: adminUser?.email, 
    isLoading, 
    error 
  });

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
