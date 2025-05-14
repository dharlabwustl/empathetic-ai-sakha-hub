
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/auth/authService';
import { UserRole } from '@/types/user/base';
import { toast } from '@/components/ui/use-toast';

// Types
export interface User {
  id: string;
  name?: string;
  firstName?: string;
  email: string;
  role: UserRole;
  photoURL?: string;
  loginCount?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, name: string, phone: string) => Promise<User>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => void;
}

// Create context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  signUp: async () => ({ id: '', email: '', role: UserRole.Student }),
  loginWithGoogle: async () => {},
  resetPassword: async () => {},
  updateUserProfile: () => {}
});

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          if (currentUser) {
            // Transform to match our User interface
            setUser({
              id: currentUser.id,
              name: currentUser.name,
              email: currentUser.email,
              role: currentUser.role as UserRole,
              // Default values that might be overridden by stored user data
              loginCount: 1
            });
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError("Failed to initialize authentication");
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role as UserRole,
          loginCount: 1
        });
        
        // Redirect based on role
        if (response.data.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard/student');
        }
      } else {
        setError(response.error || 'Login failed');
        toast({
          title: 'Login Failed',
          description: response.error || 'Invalid credentials',
          variant: 'destructive'
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      toast({
        title: 'Login Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    
    try {
      await authService.logout();
      setUser(null);
      
      // Redirect to login page is now handled inside authService.logout()
    } catch (err) {
      console.error('Logout error:', err);
      toast({
        title: 'Logout Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string, phone: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register({
        email,
        password,
        name,
        phoneNumber: phone
      });
      
      if (response.success && response.data) {
        const newUser = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role as UserRole,
          loginCount: 1
        };
        
        setUser(newUser);
        
        // Set flag for new user
        localStorage.setItem('new_user_signup', 'true');
        
        return newUser;
      } else {
        setError(response.error || 'Sign up failed');
        toast({
          title: 'Registration Failed',
          description: response.error || 'Could not create account',
          variant: 'destructive'
        });
        throw new Error(response.error || 'Sign up failed');
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Sign up failed. Please try again.');
      toast({
        title: 'Registration Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Google login function - mock implementation
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock Google authentication
      const mockGoogleUser = {
        id: `google_${Date.now()}`,
        name: 'Google User',
        email: `user_${Date.now()}@gmail.com`,
        role: UserRole.Student,
        loginCount: 1
      };
      
      setUser(mockGoogleUser);
      
      // Set auth data in localStorage
      authService.setAuthData({
        id: mockGoogleUser.id,
        name: mockGoogleUser.name,
        email: mockGoogleUser.email,
        role: mockGoogleUser.role,
        token: `google_token_${Date.now()}`
      });
      
      // Set flag for new Google user
      localStorage.setItem('new_user_signup', 'true');
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to welcome flow for new users
      navigate('/welcome-flow');
      
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed. Please try again.');
      toast({
        title: 'Google Login Error',
        description: 'Failed to login with Google. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset password function - mock implementation
  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock password reset
      setTimeout(() => {
        toast({
          title: 'Password Reset Email Sent',
          description: `If an account exists for ${email}, you will receive a password reset link.`,
          duration: 5000
        });
      }, 1000);
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Password reset failed. Please try again.');
      toast({
        title: 'Password Reset Error',
        description: 'Failed to send reset email. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // In a real app, you would call an API to update the user profile
      // and then update the local state
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    signUp,
    loginWithGoogle,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
