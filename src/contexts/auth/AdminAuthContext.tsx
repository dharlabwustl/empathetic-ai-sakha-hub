
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAuthService from '@/services/auth/adminAuthService';
import { AdminUser } from '@/types/user/base';
import { useToast } from "@/hooks/use-toast";

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  adminUser: AdminUser | null;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdminAuthenticated: false,
  isLoading: false,
  adminUser: null,
  adminLogin: async () => false,
  adminLogout: async () => {},
  error: null
});

export const useAdminAuth = () => useContext(AdminAuthContext);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        
        const isAdmin = adminAuthService.isAuthenticated();
        setIsAdminAuthenticated(isAdmin);
        
        if (isAdmin) {
          const user = await adminAuthService.getAdminUser();
          setAdminUser(user);
        } else {
          setAdminUser(null);
        }
      } catch (err) {
        console.error("Error checking admin auth status:", err);
        setError("Error checking authentication status");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
    
    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, []);

  const adminLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await adminAuthService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        setIsAdminAuthenticated(true);
        setAdminUser(response.data);
        
        // Dispatch event to notify components about auth state change
        window.dispatchEvent(new Event('auth-state-changed'));
        
        toast({
          title: "Login Successful",
          description: "Welcome to the PREPZR admin dashboard"
        });
        
        return true;
      } else {
        setError(response.message || "Login failed");
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: response.message || "Invalid credentials"
        });
        return false;
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("An error occurred during login");
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "An unexpected error occurred"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogout = async () => {
    try {
      setIsLoading(true);
      await adminAuthService.adminLogout();
      
      setIsAdminAuthenticated(false);
      setAdminUser(null);
      
      // Dispatch event to notify components about auth state change
      window.dispatchEvent(new Event('auth-state-changed'));
      
      // Show a success toast
      toast({
        title: "Logout Successful",
        description: "You have been logged out from the admin dashboard"
      });
      
      // Navigate to the admin login page
      navigate('/admin/login', { replace: true });
    } catch (err) {
      console.error("Admin logout error:", err);
      setError("An error occurred during logout");
      
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: "An error occurred while logging out"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminAuthenticated,
        isLoading,
        adminUser,
        adminLogin,
        adminLogout,
        error
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
