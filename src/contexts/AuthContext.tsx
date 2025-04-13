
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { AuthUser } from '@/services/auth/authService';
import { useToast } from '@/hooks/use-toast';

// Auth context types
interface AuthContextProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phoneNumber: string, password: string, role?: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("AuthContext - Loading user from localStorage");
        const currentUser = authService.getCurrentUser();
        
        if (currentUser) {
          console.log("AuthContext - User found in localStorage");
          // Verify token validity with backend
          const isValid = await authService.verifyToken();
          
          if (isValid) {
            console.log("AuthContext - Token is valid, setting user");
            setUser(currentUser);
          } else {
            console.log("AuthContext - Token is invalid, clearing auth data");
            // Token is invalid, clear auth data
            authService.clearAuthData();
            setUser(null);
          }
        } else {
          console.log("AuthContext - No user found in localStorage");
        }
      } catch (error) {
        console.error("AuthContext - Error loading user:", error);
        authService.clearAuthData();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        toast({
          title: 'Login successful',
          description: `Welcome back, ${response.data.name}!`,
        });
        return true;
      } else {
        toast({
          title: 'Login failed',
          description: response.error || 'Invalid email or password',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Admin login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        toast({
          title: 'Admin login successful',
          description: `Welcome back, ${response.data.name}!`,
        });
        return true;
      } else {
        toast({
          title: 'Admin login failed',
          description: response.error || 'Invalid email or password',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: 'Login error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
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
    console.log("AuthContext - Registering user:", { name, email, phoneNumber, role });
    
    try {
      // For demo purposes, simulate a successful registration
      // In production, you would call the real backend API
      console.log("AuthContext - Simulating successful registration");
      
      // Create a mock user
      const mockUser: AuthUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        role,
        token: `mocktoken_${Date.now()}`
      };
      
      // Save the mock user to auth service
      authService.setAuthData(mockUser);
      setUser(mockUser);
      
      toast({
        title: 'Registration successful',
        description: `Welcome, ${name}!`,
      });
      
      console.log("AuthContext - Registration complete, user set");
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out',
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout error',
        description: 'An error occurred while logging out',
        variant: 'destructive',
      });
    }
  };

  // Context value
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
