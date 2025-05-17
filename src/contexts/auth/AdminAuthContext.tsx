
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import adminAuthService from '@/services/auth/adminAuthService';

// Admin user interface
interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
}

// Admin auth context interface
interface AdminAuthContextType {
  adminUser: AdminUser | null;
  adminLoading: boolean;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

// Create context
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Provider component
interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminLoading, setAdminLoading] = useState(true);

  // Check for existing admin user in localStorage on mount
  useEffect(() => {
    const checkAdminAuth = async () => {
      setAdminLoading(true);
      
      try {
        // Use the service to get admin user data
        const user = await adminAuthService.getAdminUser();
        if (user) {
          setAdminUser(user);
        } else {
          setAdminUser(null);
        }
      } catch (error) {
        console.error("Error checking admin auth:", error);
        setAdminUser(null);
      } finally {
        setAdminLoading(false);
      }
    };
    
    checkAdminAuth();
    
    // Listen for auth changes
    const handleAuthChange = () => {
      console.log("Auth state change detected in AdminAuthContext");
      checkAdminAuth();
    };
    
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, []);

  // Admin login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setAdminLoading(true);
    
    try {
      const response = await adminAuthService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        setAdminUser(response.data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      return false;
    } finally {
      setAdminLoading(false);
    }
  };

  // Admin logout function - doesn't handle navigation directly
  const adminLogout = async (): Promise<void> => {
    try {
      // First clear React state
      setAdminUser(null);
      
      // Use the service to handle logout
      await adminAuthService.adminLogout();
    } catch (error) {
      console.error("Error during admin logout:", error);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        adminLoading,
        adminLogin,
        adminLogout,
        isAdminAuthenticated: !!adminUser
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use the admin auth context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
