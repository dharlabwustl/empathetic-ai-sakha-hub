
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types/user/base';
import authService from '@/services/auth/authService';

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
      
      // Check if user data exists in localStorage and if user is authenticated
      const userData = localStorage.getItem('userData');
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      
      if (userData && isLoggedIn === 'true') {
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
          } else {
            // Invalid authentication state
            setUser(null);
            // Clear potentially corrupted data
            localStorage.removeItem('userData');
            localStorage.removeItem('isLoggedIn');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Clear invalid data
          localStorage.removeItem('userData');
          localStorage.removeItem('isLoggedIn');
          setUser(null);
        }
      } else {
        // No valid authentication data, ensure user is null
        setUser(null);
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
    // Call the authService logout method
    authService.logout().then(() => {
      setUser(null);
      console.log("User logged out completely via AuthContext");
      
      // Force a page refresh to ensure all components reset their state
      window.location.href = '/login';
    }).catch(error => {
      console.error("Error during logout:", error);
      // Try direct approach if service call fails
      localStorage.removeItem('userData');
      localStorage.removeItem('isLoggedIn');
      setUser(null);
      window.location.href = '/login';
    });
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
