
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  adminLoading: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  isAdminAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

// Create the context
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Auth provider props
interface AdminAuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminLoading, setAdminLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing admin user in localStorage on component mount
  useEffect(() => {
    const checkAdminAuth = () => {
      setAdminLoading(true);
      
      // Check if admin data exists in localStorage
      const adminData = localStorage.getItem('adminData');
      const adminToken = localStorage.getItem('adminToken');
      
      if (adminData && adminToken) {
        try {
          const parsedData = JSON.parse(adminData);
          if (parsedData.email && parsedData.role === 'admin') {
            // Admin is already logged in
            console.log("Found existing admin user:", parsedData.email);
            setAdminUser({
              id: parsedData.id || 'admin_1',
              name: parsedData.name || 'Admin User',
              email: parsedData.email,
              role: 'admin',
              permissions: parsedData.permissions || ['all']
            });
          }
        } catch (error) {
          console.error('Error parsing admin data:', error);
          // Clear potentially corrupted data
          localStorage.removeItem('adminData');
          localStorage.removeItem('adminToken');
        }
      }
      
      setAdminLoading(false);
    };
    
    checkAdminAuth();
  }, []);

  // Admin Login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setAdminLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // For demo purposes, allow admin@prepzr.com with password 'admin123'
        if ((email === 'admin@prepzr.com' && password === 'admin123') || 
            (email.includes('admin') && password.length >= 5)) {
          
          const newAdminUser: AdminUser = {
            id: 'admin_1',
            name: 'Admin User',
            email: email,
            role: 'admin',
            permissions: ['all']
          };
          
          // Generate a mock token
          const token = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
          
          // Save admin data to localStorage
          localStorage.setItem('adminData', JSON.stringify({
            id: newAdminUser.id,
            name: newAdminUser.name,
            email: newAdminUser.email,
            role: newAdminUser.role,
            permissions: newAdminUser.permissions,
            lastLogin: new Date().toISOString()
          }));
          
          // Save token
          localStorage.setItem('adminToken', token);
          
          setAdminUser(newAdminUser);
          setAdminLoading(false);
          
          toast({
            title: "Admin Login Successful",
            description: "Welcome to the admin dashboard."
          });
          
          resolve(true);
        } else {
          setAdminLoading(false);
          
          toast({
            title: "Admin Login Failed",
            description: "Invalid credentials. Please try again.",
            variant: "destructive"
          });
          
          resolve(false);
        }
      }, 1000);
    });
  };

  // Admin Logout function
  const adminLogout = () => {
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminToken');
    setAdminUser(null);
    
    toast({
      title: "Admin Logged Out",
      description: "You've been successfully logged out of the admin panel."
    });
    
    // Navigate to the admin login page after logout
    navigate('/admin/login');
  };
  
  // Permission check function
  const hasPermission = (permission: string): boolean => {
    if (!adminUser) return false;
    
    // If user has 'all' permission or the specific permission
    return adminUser.permissions.includes('all') || adminUser.permissions.includes(permission);
  };
  
  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        adminLoading,
        adminLogin,
        adminLogout,
        isAdminAuthenticated: !!adminUser,
        hasPermission
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
