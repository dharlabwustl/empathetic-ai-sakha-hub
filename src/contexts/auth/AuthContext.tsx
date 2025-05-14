
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '@/services/auth/authService';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '@/services/auth/authService';
import { toast } from '@/hooks/use-toast';

// Define context type
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phoneNumber: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  updateUser: (userData: Partial<AuthUser>) => void;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  checkAuth: async () => false,
  updateUser: () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Initialize auth state on component mount
  useEffect(() => {
    const initAuth = async () => {
      const isValid = await checkAuth();
      setIsLoading(false);
      
      // Store authentication status for easier access
      if (isValid) {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        if (window.location.pathname.includes('/dashboard')) {
          // If not authenticated and trying to access protected route, redirect to login
          navigate('/login');
        }
      }
    };

    initAuth();
  }, [navigate]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Set the return path to be used after onboarding if needed
        const returnTo = new URLSearchParams(window.location.search).get('returnTo');
        if (returnTo) {
          localStorage.setItem('returnTo', returnTo);
        }
        
        setIsLoading(false);
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: response.error || "Invalid credentials",
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "Something went wrong during login",
        variant: "destructive"
      });
      setIsLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, phoneNumber: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.register({ name, email, phoneNumber, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Set as new user for onboarding flow
        localStorage.setItem('new_user_signup', 'true');
        setIsLoading(false);
        return true;
      } else {
        toast({
          title: "Registration Failed",
          description: response.error || "Failed to create account",
          variant: "destructive"
        });
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Error",
        description: "Something went wrong during registration",
        variant: "destructive"
      });
      setIsLoading(false);
      return false;
    }
  };

  // Enhanced logout function with comprehensive cleanup
  const logout = async () => {
    setIsLoading(true);
    try {
      // Call the improved comprehensive logout in authService
      await authService.logout();
      
      // Clean up local state
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear explicit login state
      localStorage.removeItem('isLoggedIn');
      
      // Additional UI feedback
      toast({
        title: "Logged out successfully",
        description: "You have been securely logged out of your account"
      });
      
      // Navigation handled by authService.logout()
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "There was a problem logging out",
        variant: "destructive"
      });
      
      // Force logout even if there's an error
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('isLoggedIn');
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      const isValid = await authService.verifyToken();
      const currentUser = authService.getCurrentUser();
      
      if (isValid && currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        return true;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('isLoggedIn');
        return false;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('isLoggedIn');
      return false;
    }
  };

  // Update user data
  const updateUser = (userData: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update in local storage
      const userJson = localStorage.getItem('sakha_auth_user');
      if (userJson) {
        try {
          const parsedUser = JSON.parse(userJson);
          localStorage.setItem('sakha_auth_user', JSON.stringify({ ...parsedUser, ...userData }));
        } catch (e) {
          console.error('Error updating user in localStorage:', e);
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
