
import React, { createContext, useContext, useState, ReactNode } from 'react';
import authService from '@/services/auth/authService';

// AuthUser type imported from authService
import { AuthUser } from '@/services/auth/authService';

// Define context props
interface AdminAuthContextProps {
  adminUser: AuthUser | null;
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  adminLoginError: string | null;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

// Create context
const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

// Provider props type
interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Initialize admin user from localStorage if available
  React.useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        // Check if there's a stored admin token
        const user = authService.getCurrentUser();
        if (user && user.role === 'admin') {
          const isValid = await authService.verifyToken();
          if (isValid) {
            setAdminUser(user);
          } else {
            // Clear invalid admin auth
            authService.clearAuthData();
          }
        }
      } catch (error) {
        console.error("Error checking admin authentication:", error);
        authService.clearAuthData();
      }
    };

    checkAdminAuth();
  }, []);

  // Admin login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsAdminLoading(true);
    setAdminLoginError(null);

    try {
      // Email validation for admin - simple check for demo
      if (!email.toLowerCase().includes('admin')) {
        setAdminLoginError("Administrative access restricted. Please use an admin account.");
        setIsAdminLoading(false);
        return false;
      }

      if (password.length < 4) {
        setAdminLoginError("Invalid password format");
        setIsAdminLoading(false);
        return false;
      }

      // Call auth service for admin login
      const response = await authService.adminLogin({ email, password });

      if (response.success && response.data) {
        setAdminUser(response.data);
        return true;
      } else {
        setAdminLoginError(response.error || "Invalid admin credentials");
        return false;
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setAdminLoginError("An unexpected error occurred");
      return false;
    } finally {
      setIsAdminLoading(false);
    }
  };

  // Admin logout function
  const adminLogout = async (): Promise<void> => {
    try {
      await authService.logout();
      setAdminUser(null);
    } catch (error) {
      console.error("Error during admin logout:", error);
    }
  };

  // Context value
  const value = {
    adminUser,
    isAdminAuthenticated: !!adminUser,
    isAdminLoading,
    adminLoginError,
    adminLogin,
    adminLogout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use admin auth context
export const useAdminAuth = (): AdminAuthContextProps => {
  const context = useContext(AdminAuthContext);

  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }

  return context;
};
