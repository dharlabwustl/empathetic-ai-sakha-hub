
import React, { createContext, useContext, useEffect, useState } from 'react';
import adminAuthService from '@/services/auth/adminAuthService';
import { AdminUser } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  // Check for existing admin session on component mount and auth state changes
  const checkAdminAuth = async () => {
    setIsLoading(true);
    try {
      console.log("Checking admin authentication status...");
      // Check if the admin is authenticated
      const isAuthenticated = adminAuthService.isAuthenticated();
      console.log("Admin authenticated?", isAuthenticated);
      
      setIsAdminAuthenticated(isAuthenticated);
      
      if (isAuthenticated) {
        const user = await adminAuthService.getAdminUser();
        console.log("Admin user loaded:", user);
        setAdminUser(user);
      } else {
        setAdminUser(null);
      }
    } catch (err) {
      console.error('Admin auth check error:', err);
      setError('Failed to verify authentication');
      setIsAdminAuthenticated(false);
      setAdminUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdminAuth();
    
    // Listen for auth state changes
    const handleAuthChange = () => {
      console.log("Auth state changed, rechecking admin auth...");
      checkAdminAuth();
    };
    
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    // Also listen for storage changes (for multi-tab support)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'adminToken' || event.key === 'admin_logged_in') {
        console.log("Storage changed for admin auth, rechecking...");
        checkAdminAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Login function using our admin auth service
  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("AdminAuthContext: Attempting to login with email:", email);
      
      if (!email || !password) {
        setError('Email and password are required');
        toast({
          title: "Login failed",
          description: "Email and password are required",
          variant: "destructive"
        });
        return false;
      }
      
      const response = await adminAuthService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        console.log("AdminAuthContext: Login successful");
        setIsAdminAuthenticated(true);
        setAdminUser(response.data);
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        return true;
      } else {
        const errorMessage = response.message || 'Invalid credentials';
        console.error("AdminAuthContext: Login failed:", errorMessage);
        setError(errorMessage);
        
        toast({
          title: "Login failed",
          description: errorMessage,
          variant: "destructive"
        });
        
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      console.error('AdminAuthContext: Login error:', err);
      setError(errorMessage);
      
      toast({
        title: "Login error",
        description: errorMessage,
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const adminLogout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      console.log("AdminAuthContext: Starting logout process");
      await adminAuthService.adminLogout();
      
      setIsAdminAuthenticated(false);
      setAdminUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      console.log("AdminAuthContext: Logout completed successfully");
    } catch (err) {
      console.error('AdminAuthContext: Logout error:', err);
      setError('Logout failed');
      
      toast({
        title: "Logout failed",
        description: "There was an issue logging you out",
        variant: "destructive"
      });
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

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
