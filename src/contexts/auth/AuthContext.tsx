
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types/user/base';

// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
}

// Define Auth Context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      
      // Check if user is logged in from localStorage
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userData = localStorage.getItem('userData');
      
      if (isLoggedIn && userData) {
        try {
          // Parse user data
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
          localStorage.removeItem('userData');
          localStorage.removeItem('isLoggedIn');
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    };
    
    checkAuth();
    
    // Listen for auth changes
    window.addEventListener('auth-state-changed', checkAuth);
    return () => {
      window.removeEventListener('auth-state-changed', checkAuth);
    };
  }, []);

  // Student login function
  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        // For demo login, accept any non-empty credentials
        if (email && password) {
          // Clear any existing admin session first
          localStorage.removeItem('admin_logged_in');
          localStorage.removeItem('admin_user');
          
          // Create mock user
          const newUser: User = {
            id: '1',
            name: email.split('@')[0] || 'Test User',
            email: email,
            role: UserRole.Student
          };
          
          // Store in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(newUser));
          
          // Update state
          setUser(newUser);
          setLoading(false);
          
          // Dispatch auth state changed event
          window.dispatchEvent(new Event('auth-state-changed'));
          
          resolve(newUser);
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 400); // Quick response for better UX
    });
  };
  
  // Comprehensive logout that clears all auth data
  const logout = () => {
    // Clear all auth data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('prepzr_remembered_login');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Clear session storage
    sessionStorage.clear();
    
    // Clear all auth cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Update state
    setUser(null);
    
    // Dispatch auth state changed event
    window.dispatchEvent(new Event('auth-state-changed'));
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
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
