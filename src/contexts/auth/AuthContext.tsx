
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types/user/base';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  checkAuth: () => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user in localStorage on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication status
  const checkAuth = async (): Promise<boolean> => {
    setLoading(true);
    
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.email) {
          // User is already logged in
          setUser({
            id: parsedData.id || '1',
            name: parsedData.name || 'User',
            email: parsedData.email,
            role: parsedData.role || UserRole.Student
          });
          setLoading(false);
          return true;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    // Check if token exists
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        // In a real app, you would validate the token with your backend
        // For now, just assume the token is valid if it exists
        // Fetch user data based on token if needed
        
        // For demo purposes, use mock user data if userData wasn't found
        if (!userData) {
          const mockUser: User = {
            id: '1',
            name: 'Authenticated User',
            email: 'user@example.com',
            role: UserRole.Student
          };
          setUser(mockUser);
          setLoading(false);
          return true;
        }
      } catch (error) {
        console.error('Error validating token:', error);
      }
    }
    
    setLoading(false);
    return false;
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (email && password && password.length >= 3) {
          const newUser: User = {
            id: '1',
            name: email.split('@')[0] || 'Student',
            email: email,
            role: UserRole.Student
          };
          
          // Save user data to localStorage
          localStorage.setItem('userData', JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            lastLogin: new Date().toISOString(),
            loginCount: 1,
            mood: 'Motivated'
          }));
          
          // Save auth token
          localStorage.setItem('auth_token', `token_${Date.now()}`);
          
          setUser(newUser);
          setLoading(false);
          resolve(true);
        } else {
          setLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    // Preserve some user preferences but remove auth data
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        // Only keep preferences and mood, remove auth data
        localStorage.setItem('userData', JSON.stringify({
          mood: parsedData.mood,
          completedOnboarding: parsedData.completedOnboarding,
          sawWelcomeTour: parsedData.sawWelcomeTour,
        }));
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    
    // Remove auth token
    localStorage.removeItem('auth_token');
    
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
