
import React, { createContext, useContext, ReactNode } from 'react';
import { AuthContextProps } from './types';
import { useAuthUtils } from './authUtils';
import { useAuthInitializer } from './useAuthInitializer';
import authService from '@/services/auth/authService';

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, setUser, isLoading, setIsLoading } = useAuthInitializer();
  const { handleLogin, handleAdminLogin, handleRegister, handleLogout } = useAuthUtils();
  
  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await handleLogin(email, password);
      
      if (success) {
        // Update local state after successful login
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          
          // Store last login time
          const userData = localStorage.getItem("userData") ? 
            JSON.parse(localStorage.getItem("userData")!) : {};
          
          userData.lastLoginTime = new Date().toISOString();
          userData.isReturningUser = true;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
      }
      
      setIsLoading(false);
      return success;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Admin login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const success = await handleAdminLogin(email, password);
    
    if (success) {
      // Update local state after successful admin login
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    }
    
    setIsLoading(false);
    return success;
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
    const success = await handleRegister(name, email, phoneNumber, password, role);
    
    if (success) {
      // Update local state after successful registration
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        
        // Initialize user data for first-time users
        const userData = {
          isNewUser: true,
          completedOnboarding: false,
          sawWelcomeTour: false,
          firstLogin: new Date().toISOString(),
          lastLoginTime: new Date().toISOString()
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    }
    
    setIsLoading(false);
    return success;
  };

  // Logout function
  const logout = async (): Promise<void> => {
    await handleLogout();
    setUser(null);
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
