
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import authService, { AuthUser } from '@/services/auth/authService';

interface AdminAuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  adminUser: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if there is an authenticated admin user on initial load
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        const user = authService.getCurrentUser();
        const isTokenValid = await authService.verifyToken();
        
        if (user && user.role === 'admin' && isTokenValid) {
          setAdminUser(user);
        } else {
          // Clear any invalid session
          if (user && user.role === 'admin') {
            await authService.logout();
          }
        }
      } catch (error) {
        console.error('Error checking admin auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function specifically for admin users
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const result = await authService.adminLogin({ email, password });
      
      if (result.success && result.data) {
        setAdminUser(result.data);
        setIsLoading(false);
        return true;
      } else {
        toast({
          title: 'Login Failed',
          description: result.error || 'Invalid admin credentials',
          variant: 'destructive',
        });
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: 'Login Error',
        description: 'An error occurred during login',
        variant: 'destructive',
      });
      setIsLoading(false);
      return false;
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setAdminUser(null);
      navigate('/admin/login', { replace: true });
    } catch (error) {
      console.error('Admin logout error:', error);
    }
  };
  
  // Check if admin has specific permission
  const hasPermission = (permission: string) => {
    if (!adminUser) return false;
    
    // Admin with 'all' permission has access to everything
    if (adminUser.permissions?.includes('all')) {
      return true;
    }
    
    // Check if admin has the specific permission
    return adminUser.permissions?.includes(permission) || false;
  };
  
  const value = {
    isAuthenticated: !!adminUser,
    isLoading,
    adminUser,
    login,
    logout,
    hasPermission,
  };
  
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  
  return context;
}
