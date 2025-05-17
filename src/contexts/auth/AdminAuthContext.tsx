
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
      // For demo purposes, accept any email that includes 'admin'
      if ((email.includes('admin') || email === 'admin@prepzr.com') && password.length > 0) {
        console.log("Admin login successful, setting admin user data");
        
        // Create new admin user object
        const newAdminUser: AdminUser = {
          id: 'admin-1',
          name: "Admin User",
          email: email,
          role: "admin",
          permissions: ['all']
        };
        
        // Save admin data to localStorage
        localStorage.setItem('admin_logged_in', 'true');
        localStorage.setItem('adminToken', `token_${Date.now()}`);
        localStorage.setItem('adminUser', JSON.stringify(newAdminUser));
        
        setAdminUser(newAdminUser);
        
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

  // Admin logout function
  const adminLogout = () => {
    // First clear React state
    setAdminUser(null);
    
    // Clear all admin authentication data
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    
    // Dispatch event to notify other components about auth change
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Direct navigation to login page
    window.location.href = '/admin/login';
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
