
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
    const checkAuth = () => {
      setLoading(true);
      
      // Check if user data exists in localStorage
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          if (parsedData.email && parsedData.isAuthenticated === true) {
            // User is already logged in
            setUser({
              id: parsedData.id || '1',
              name: parsedData.name || 'User',
              email: parsedData.email,
              role: parsedData.role || UserRole.Student
            });
            console.log("User authenticated from localStorage:", parsedData.email);
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Clear invalid data
          localStorage.removeItem('userData');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (email && password && password.length >= 2) {
          const newUser: User = {
            id: '1',
            name: email.split('@')[0] || 'Student',
            email: email,
            role: UserRole.Student
          };
          
          // Check if this is a returning user
          const existingData = localStorage.getItem('userData');
          let loginCount = 1;
          let sawWelcomeSlider = false;
          let sawWelcomeTour = false;
          
          if (existingData) {
            try {
              const parsedData = JSON.parse(existingData);
              loginCount = (parsedData.loginCount || 0) + 1;
              sawWelcomeSlider = parsedData.sawWelcomeSlider === true;
              sawWelcomeTour = parsedData.sawWelcomeTour === true;
            } catch (error) {
              console.error('Error parsing existing user data:', error);
            }
          }
          
          // Save user data to localStorage
          localStorage.setItem('userData', JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            lastLogin: new Date().toISOString(),
            loginCount: loginCount,
            sawWelcomeSlider: sawWelcomeSlider,
            sawWelcomeTour: sawWelcomeTour,
            mood: 'MOTIVATED',
            isAuthenticated: true
          }));
          
          // Also mark as logged in for other parts of the app
          localStorage.setItem('isLoggedIn', 'true');
          
          setUser(newUser);
          setLoading(false);
          console.log("Login successful for:", email);
          resolve(true);
        } else {
          setLoading(false);
          console.log("Login failed for:", email);
          resolve(false);
        }
      }, 800);
    });
  };

  // Enhanced logout function - completely clears authentication state
  const logout = () => {
    // Clear all authentication data
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('AUTH_TOKEN_KEY');
    localStorage.removeItem('AUTH_USER_KEY');
    localStorage.removeItem('user_profile_image');
    localStorage.removeItem('prepzr_remembered_email');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('hasSeenTour');
    localStorage.removeItem('hasSeenSplash');
    localStorage.removeItem('voiceSettings');
    localStorage.removeItem('new_user_signup');
    localStorage.removeItem('study_time_allocations');
    
    // Clear any session storage items too
    sessionStorage.clear();
    
    // Clear user state
    setUser(null);
    console.log("User logged out completely - all authentication data cleared");
    
    // Force reload to ensure clean state
    window.location.href = '/login';
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
