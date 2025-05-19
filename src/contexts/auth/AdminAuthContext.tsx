
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { AdminUser } from '@/types/user/base';

// Define the context type
interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  error: string | null;
}

// Create context with default values
const AdminAuthContext = createContext<AdminAuthContextType>({
  adminUser: null,
  isAdminAuthenticated: false,
  isLoading: true,
  loginAdmin: async () => false,
  logoutAdmin: () => {},
  error: null
});

// Hook to use the admin auth context
export const useAdminAuth = () => useContext(AdminAuthContext);

// Provider props type
interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check admin authentication on mount
  useEffect(() => {
    const checkAdminAuth = () => {
      setIsLoading(true);
      try {
        // Get admin token from localStorage
        const adminToken = localStorage.getItem('adminToken');
        const adminUserData = localStorage.getItem('adminUser');
        
        if (adminToken && adminUserData) {
          // Parse admin user data
          const parsedAdminUser = JSON.parse(adminUserData) as AdminUser;
          setAdminUser(parsedAdminUser);
          setIsAdminAuthenticated(true);
        } else {
          setAdminUser(null);
          setIsAdminAuthenticated(false);
        }
      } catch (err) {
        console.error('Error checking admin authentication:', err);
        setAdminUser(null);
        setIsAdminAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Initial check
    checkAdminAuth();
    
    // Listen for auth state changes
    window.addEventListener('admin-auth-changed', checkAdminAuth);
    
    return () => {
      window.removeEventListener('admin-auth-changed', checkAdminAuth);
    };
  }, []);

  // Admin login function
  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simple validation
      if (!email || !password) {
        setError('Email and password are required');
        return false;
      }
      
      // For demo purposes, accept admin@prepzr.com or any email with admin in it
      if (email === 'admin@prepzr.com' || email.includes('admin')) {
        // Create admin user object
        const user: AdminUser = {
          id: `admin_${Date.now()}`,
          name: email.split('@')[0],
          email: email,
          role: 'admin',
          permissions: ['all']
        };
        
        // Generate token
        const token = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        
        // Clear any existing user data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        
        // Set admin data in localStorage
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        localStorage.setItem('admin_logged_in', 'true');
        
        // Update state
        setAdminUser(user);
        setIsAdminAuthenticated(true);
        
        // Show success toast
        toast({
          title: 'Login successful',
          description: `Welcome back, ${user.name}!`,
          variant: 'default'
        });
        
        // Dispatch event
        window.dispatchEvent(new Event('admin-auth-changed'));
        
        return true;
      } else {
        setError('Invalid admin credentials');
        toast({
          title: 'Login failed',
          description: 'Invalid admin credentials',
          variant: 'destructive'
        });
        return false;
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError('An unexpected error occurred');
      toast({
        title: 'Login error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Admin logout function
  const logoutAdmin = () => {
    setIsLoading(true);
    
    try {
      // Clear admin data
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('admin_logged_in');
      
      // Update state
      setAdminUser(null);
      setIsAdminAuthenticated(false);
      
      // Show toast
      toast({
        title: 'Logout successful',
        description: 'You have been logged out of the admin portal',
        variant: 'default'
      });
      
      // Dispatch event
      window.dispatchEvent(new Event('admin-auth-changed'));
      
      // Navigate to login page
      navigate('/admin/login', { replace: true });
    } catch (err) {
      console.error('Admin logout error:', err);
      toast({
        title: 'Logout error',
        description: 'An error occurred during logout',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Provide context value
  const contextValue: AdminAuthContextType = {
    adminUser,
    isAdminAuthenticated,
    isLoading,
    loginAdmin,
    logoutAdmin,
    error
  };

  return (
    <AdminAuthContext.Provider value={contextValue}>
      {children}
    </AdminAuthContext.Provider>
  );
};
