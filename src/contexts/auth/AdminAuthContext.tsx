
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  adminLogout: () => void;
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
      const adminData = localStorage.getItem('admin_user');
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
          } else {
            setAdminUser(null);
            localStorage.removeItem('admin_user');
            localStorage.removeItem('admin_logged_in');
          }
        } catch (error) {
          console.error('Error parsing admin data:', error);
          localStorage.removeItem('admin_user');
          localStorage.removeItem('admin_logged_in');
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
      
      setAdminLoading(false);
    };
    
    checkAdminAuth();
    
    // Listen for auth changes
    const handleAuthChange = () => checkAdminAuth();
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, []);

  // Admin login function - improved to be more reliable and redirect properly
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setAdminLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // For demo purposes, accept any email that includes 'admin' or is explicitly admin@prepzr.com
        if ((email.includes('admin') || email === 'admin@prepzr.com') && password.length > 0) {
          // Clear student login data first to avoid conflicts
          localStorage.removeItem('userData');
          localStorage.removeItem('isLoggedIn');
          
          const newAdminUser: AdminUser = {
            id: 'admin-1',
            name: "Admin User",
            email: email,
            role: "admin",
            permissions: ['all']
          };
          
          // Save admin data to localStorage
          localStorage.setItem('admin_logged_in', 'true');
          localStorage.setItem('admin_user', JSON.stringify(newAdminUser));
          
          setAdminUser(newAdminUser);
          
          // Dispatch event to notify other components about auth change
          window.dispatchEvent(new Event('auth-state-changed'));
          
          setAdminLoading(false);
          
          // Direct navigation to admin dashboard to prevent redirection issues
          window.location.href = '/admin/dashboard';
          
          resolve(true);
        } else {
          setAdminLoading(false);
          resolve(false);
        }
      }, 200); // Reduced timeout for faster response
    });
  };

  // Admin logout function
  const adminLogout = () => {
    // First clear React state
    setAdminUser(null);
    
    // Clear all admin authentication data
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Clear session storage items related to admin
    sessionStorage.removeItem('admin_session');
    sessionStorage.removeItem('admin_token');
    
    // Clear remembered login if exists
    localStorage.removeItem('prepzr_remembered_login');
    
    // Dispatch event to notify other components about auth change
    window.dispatchEvent(new Event('auth-state-changed'));
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
