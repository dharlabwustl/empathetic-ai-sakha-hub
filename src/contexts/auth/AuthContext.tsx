
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { AuthUser } from '@/services/auth/authService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phoneNumber: string, password: string, role?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  googleSignIn: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if token is valid
        const isValid = await authService.verifyToken();
        
        if (isValid) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        } else {
          // If token is invalid, clear auth data
          authService.clearAuthData();
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        authService.clearAuthData();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: response.error || "Invalid email or password",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };
  
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard",
        });
        
        return true;
      } else {
        toast({
          title: "Admin login failed",
          description: response.error || "Invalid credentials or insufficient permissions",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      toast({
        title: "Admin login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };
  
  const register = async (
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: string = 'student'
  ): Promise<boolean> => {
    try {
      const response = await authService.register({
        name,
        email,
        phoneNumber,
        password,
        role
      });
      
      if (response.success && response.data) {
        setUser(response.data);
        
        toast({
          title: "Registration successful",
          description: "Your account has been created",
        });
        
        return true;
      } else {
        toast({
          title: "Registration failed",
          description: response.error || "Could not create your account",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };
  
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
      
      // Clear additional auth-related storage items
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      localStorage.removeItem('user_profile_image');
      localStorage.removeItem('sakha_auth_token');
      localStorage.removeItem('sakha_auth_user');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      navigate('/login');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      toast({
        title: "Logout failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  
  const isAuthenticated = (): boolean => {
    return authService.isAuthenticated();
  };
  
  const isAdmin = (): boolean => {
    return authService.isAdmin();
  };
  
  // Google Sign In function
  const googleSignIn = async (): Promise<boolean> => {
    try {
      // Mock Google Sign-in for demo
      const mockGoogleUser = {
        id: `google_user_${Date.now()}`,
        name: 'Google User',
        email: `user${Date.now()}@gmail.com`,
        role: 'student',
        token: `google_token_${Date.now()}`
      };
      
      // Set the auth data
      authService.setAuthData(mockGoogleUser);
      setUser(mockGoogleUser);
      
      // Save user data in localStorage for mood tracking
      const userData = {
        name: mockGoogleUser.name,
        email: mockGoogleUser.email,
        mood: 'Motivated'
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('new_user_signup', 'true'); // Mark as new user for onboarding
      
      toast({
        title: "Google login successful",
        description: "Welcome to PREPZR!",
      });
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      toast({
        title: "Google login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };
  
  const value = {
    user,
    loading,
    login,
    adminLogin,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    googleSignIn
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
