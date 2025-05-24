
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
    console.log("🔄 AdminAuthContext: Starting authentication check");
    setIsLoading(true);
    
    try {
      const isAuthenticated = adminAuthService.isAuthenticated();
      console.log("🎯 AdminAuthContext: isAuthenticated result:", isAuthenticated);
      
      if (isAuthenticated) {
        console.log("👤 AdminAuthContext: User is authenticated, getting user data");
        const user = await adminAuthService.getAdminUser();
        console.log("📊 AdminAuthContext: User data retrieved:", user?.email || "null");
        
        if (user) {
          setAdminUser(user);
          setIsAdminAuthenticated(true);
          console.log("✅ AdminAuthContext: Authentication successful, user set");
        } else {
          console.log("❌ AdminAuthContext: No user data found, clearing auth state");
          setAdminUser(null);
          setIsAdminAuthenticated(false);
        }
      } else {
        console.log("❌ AdminAuthContext: User not authenticated");
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
      console.log("🏁 AdminAuthContext: Auth check complete, setting loading to false");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("🚀 AdminAuthContext: Component mounted, starting initial auth check");
    checkAdminAuth();
    
    const handleAuthChange = () => {
      console.log("🔄 AdminAuthContext: Auth state changed event received, rechecking");
      checkAdminAuth();
    };
    
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    return () => {
      console.log("🧹 AdminAuthContext: Component unmounting, cleaning up listeners");
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, []);

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    console.log("🔐 AdminAuthContext: Starting login process for", email);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await adminAuthService.adminLogin({ email, password });
      console.log("📊 AdminAuthContext: Login service response:", response);
      
      if (response.success && response.data) {
        console.log("✅ AdminAuthContext: Login successful, updating context state");
        setIsAdminAuthenticated(true);
        setAdminUser(response.data);
        setError(null);
        console.log("🎯 AdminAuthContext: Context state updated, returning true");
        return true;
      } else {
        console.log("❌ AdminAuthContext: Login failed:", response.message);
        setError(response.message || 'Invalid credentials');
        setIsAdminAuthenticated(false);
        setAdminUser(null);
        return false;
      }
    } catch (err) {
      console.error('💥 AdminAuthContext: Login error:', err);
      setError('Login failed. Please try again.');
      setIsAdminAuthenticated(false);
      setAdminUser(null);
      return false;
    } finally {
      console.log("🏁 AdminAuthContext: Login process complete, setting loading to false");
      setIsLoading(false);
    }
  };

  const adminLogout = async (): Promise<void> => {
    console.log("🚪 AdminAuthContext: Starting logout process");
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

  console.log("📊 AdminAuthContext: Current context state:", { 
    isAdminAuthenticated, 
    adminUser: adminUser?.email || "null", 
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
