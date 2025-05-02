
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/user/base';

// Define types for user and auth context
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription?: string | { planType: string };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  has: (permission: string) => boolean;
  updateUser: (userData: Partial<User>) => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => { throw new Error('Not implemented'); },
  logout: () => {},
  has: () => false,
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('prepzr_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login user
  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);

    try {
      let user: User;
      
      // Check if it's an admin login
      if (email.includes('admin')) {
        // Simulate admin login
        user = {
          id: `admin_${Date.now()}`,
          name: 'Admin User',
          email: email,
          role: UserRole.Admin
        };
      } else {
        // Regular user login
        user = {
          id: `user_${Date.now()}`,
          name: email.split('@')[0],
          email: email,
          role: UserRole.Student,
          subscription: "basic"
        };
      }

      // Store user in local storage
      localStorage.setItem('prepzr_user', JSON.stringify(user));
      
      // Update state
      setUser(user);
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('prepzr_user');
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  // Check permissions
  const has = (permission: string): boolean => {
    if (!user) return false;
    
    // Simple permission check based on role
    if (user.role === UserRole.Admin) return true;
    
    // Check student-specific permissions
    if (user.role === UserRole.Student) {
      switch(permission) {
        case 'access:dashboard':
        case 'view:studyplan':
        case 'view:profile':
          return true;
        case 'create:group':
        case 'admin:access':
          return false;
        default:
          return false;
      }
    }
    
    return false;
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('prepzr_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated: !!user,
      login,
      logout,
      has,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
