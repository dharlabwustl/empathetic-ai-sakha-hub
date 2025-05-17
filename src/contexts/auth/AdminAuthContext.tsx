
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
    const checkAdminAuth = () => {
      setAdminLoading(true);
      
      // Check if admin data exists in localStorage
      const adminData = localStorage.getItem('adminUser');
      const isLoggedIn = localStorage.getItem('admin_logged_in');
      
      if (adminData && isLoggedIn === 'true') {
        try {
          const parsedData = JSON.parse(adminData);
          if (parsedData.email) {
            setAdminUser({
              id: parsedData.id || 'admin-1',
              name: parsedData.name || 'Admin User',
              email: parsedData.email,
              role: 'admin',
              permissions: parsedData.permissions || ['all']
            });
            console.log("Admin user found in localStorage, setting as authenticated");
          } else {
            setAdminUser(null);
            // Clear invalid data
            localStorage.removeItem('adminUser');
            localStorage.removeItem('admin_logged_in');
            console.log("Invalid admin data found, clearing authentication");
          }
        } catch (error) {
          console.error('Error parsing admin data:', error);
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
      
      setAdminLoading(false);
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
        // Update React state
        setAdminUser(response.data);
        
        // Dispatch event to notify other components about auth change
        window.dispatchEvent(new Event('auth-state-changed'));
        
        setAdminLoading(false);
        return true;
      } else {
        setAdminLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      setAdminLoading(false);
      return false;
    }
  };

  // Admin logout function - return Promise but don't navigate
  const adminLogout = async (): Promise<void> => {
    try {
      // First clear React state
      setAdminUser(null);
      
      // Call service to clean up authentication data
      await adminAuthService.adminLogout();
      
      // Dispatch event to notify other components about auth change
      window.dispatchEvent(new Event('auth-state-changed'));
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
