
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

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
  const navigate = useNavigate();

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
          localStorage.removeItem('new_user_signup');
          
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
          
          // Show success toast
          toast({
            title: "Login Successful",
            description: "Welcome to Prepzr Admin Dashboard",
          });
          
          // Navigate to admin dashboard
          navigate('/dashboard/admin');
          
          setAdminLoading(false);
          resolve(true);
        } else {
          setAdminLoading(false);
          
          // Show error toast
          toast({
            title: "Login Failed",
            description: "Invalid admin credentials",
            variant: "destructive"
          });
          
          resolve(false);
        }
      }, 800); // Slightly longer timeout for more realistic authentication feel
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
    
    // Show logout toast
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    
    // Navigate to home page
    navigate('/');
    
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
