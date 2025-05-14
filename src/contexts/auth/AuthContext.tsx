
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// User type definition
interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  photoURL?: string;
  emailVerified?: boolean;
  displayName?: string;
}

// Auth context type definition
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateUserProfile: async () => {}
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          // User is authenticated
          setUser(JSON.parse(userData));
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          // No token found, user is not authenticated
          setUser(null);
          localStorage.removeItem('isLoggedIn');
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setError("Failed to verify authentication status");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, simulate a successful login
      const mockUser = {
        id: 'user-123',
        email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        displayName: 'John Doe'
      };
      
      // Set user in state and localStorage
      setUser(mockUser);
      localStorage.setItem('authToken', 'demo-token');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      localStorage.setItem('isLoggedIn', 'true');
      
      toast({
        title: "Login Successful",
        description: "Welcome back to PREPZR!",
      });
      
      navigate('/dashboard/student');
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login. Please check your credentials.");
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, username?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, simulate a successful signup
      const mockUser = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        email,
        firstName: username || 'New',
        lastName: 'User',
        role: 'student',
        displayName: username || 'New User'
      };
      
      // Set user in state and localStorage
      setUser(mockUser);
      localStorage.setItem('authToken', 'demo-token');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('new_user_signup', 'true');
      
      toast({
        title: "Sign Up Successful",
        description: "Welcome to PREPZR! Complete your profile to continue.",
      });
      
      navigate('/signup/student-profile');
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to create account. Please try again.");
      toast({
        title: "Sign Up Failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Google login function
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, simulate a successful Google login
      const mockUser = {
        id: 'google-user-' + Math.floor(Math.random() * 1000),
        email: 'user@gmail.com',
        firstName: 'Google',
        lastName: 'User',
        role: 'student',
        displayName: 'Google User',
        photoURL: 'https://lh3.googleusercontent.com/a/default-user'
      };
      
      // Set user in state and localStorage
      setUser(mockUser);
      localStorage.setItem('authToken', 'google-demo-token');
      localStorage.setItem('userData', JSON.stringify(mockUser));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('googleAuth', 'true');
      localStorage.setItem('new_user_signup', 'true');
      
      toast({
        title: "Google Login Successful",
        description: "Welcome to PREPZR!",
      });
      
      navigate('/dashboard/student');
    } catch (err) {
      console.error("Google login error:", err);
      setError("Failed to login with Google. Please try again.");
      toast({
        title: "Google Login Failed",
        description: "Please try again or use email login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Enhanced logout function that fully clears auth state
  const logout = async () => {
    setLoading(true);
    
    try {
      // Clear all auth-related data from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('googleAuth');
      
      // Also clear session storage in case there's any auth data
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userData');
      
      // Clear user state
      setUser(null);
      setError(null);
      
      // Show success message
      toast({
        title: "Logout Successful",
        description: "You've been signed out successfully.",
      });
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error("Logout error:", err);
      toast({
        title: "Logout Failed",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // For demo purposes, simulate a successful password reset
      setTimeout(() => {
        toast({
          title: "Password Reset Email Sent",
          description: "Check your inbox for instructions to reset your password.",
        });
      }, 1500);
      
    } catch (err) {
      console.error("Password reset error:", err);
      setError("Failed to reset password. Please try again.");
      toast({
        title: "Password Reset Failed",
        description: "Please check your email address and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update user profile function
  const updateUserProfile = async (data: Partial<User>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current user data
      const currentUserData = localStorage.getItem('userData');
      if (!currentUserData) {
        throw new Error("User not found");
      }
      
      // Update user data
      const currentUser = JSON.parse(currentUserData);
      const updatedUser = { ...currentUser, ...data };
      
      // Save updated user
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Failed to update profile. Please try again.");
      toast({
        title: "Profile Update Failed",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
