
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Define context type
interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phoneNumber: string, password: string, role?: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if there's a stored user in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, this would be an API call
      const mockUser = {
        id: `user_${Date.now()}`,
        name: 'Demo User',
        email: email,
        role: 'student',
      };
      
      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      // Also initialize user data for tracking
      const userData = {
        completedOnboarding: true,
        sawWelcomeTour: false,
        firstLogin: new Date().toISOString(),
        lastLoginTime: new Date().toISOString(),
        isReturningUser: true,
        mood: 'motivated'
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      toast({
        title: 'Login successful',
        description: 'Welcome back to your dashboard',
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again',
        variant: 'destructive',
      });
      setIsLoading(false);
      return false;
    }
  };

  // Admin login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock admin login
      const mockAdminUser = {
        id: `admin_${Date.now()}`,
        name: 'Admin User',
        email: email,
        role: 'admin',
      };
      
      localStorage.setItem('user', JSON.stringify(mockAdminUser));
      setUser(mockAdminUser);
      
      toast({
        title: 'Admin login successful',
        description: 'Welcome to the admin dashboard',
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: 'Admin login failed',
        description: 'Please check your credentials and try again',
        variant: 'destructive',
      });
      setIsLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    phoneNumber: string, 
    password: string, 
    role: string = 'student'
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock registration logic
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        role,
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      // Initialize user data for first-time users
      const userData = {
        isNewUser: true,
        completedOnboarding: false,
        sawWelcomeTour: false,
        firstLogin: new Date().toISOString(),
        lastLoginTime: new Date().toISOString(),
        mood: 'motivated'
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      toast({
        title: 'Registration successful',
        description: 'Your account has been created',
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'Please try again later',
        variant: 'destructive',
      });
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // Clear user data
      localStorage.removeItem('user');
      setUser(null);
      
      toast({
        title: 'Logout successful',
        description: 'You have been logged out',
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout failed',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    adminLogin,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
