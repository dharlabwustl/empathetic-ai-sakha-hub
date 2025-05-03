
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types/user/base';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

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
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing user in localStorage on component mount
  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      
      // Check if user data exists in localStorage
      const userData = localStorage.getItem('userData');
      const authToken = localStorage.getItem('sakha_auth_token');
      
      if (userData && authToken) {
        try {
          const parsedData = JSON.parse(userData);
          if (parsedData.email) {
            // User is already logged in
            console.log("Found existing user:", parsedData.email);
            setUser({
              id: parsedData.id || '1',
              name: parsedData.name || 'User',
              email: parsedData.email,
              role: parsedData.role || UserRole.Student
            });
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Clear potentially corrupted data
          localStorage.removeItem('userData');
          localStorage.removeItem('sakha_auth_token');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    console.log("Login attempt with:", email);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (email && password && password.length >= 3) {
          // Generate a mock token
          const token = `token_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
          
          // Save auth token
          localStorage.setItem('sakha_auth_token', token);
          
          const newUser: User = {
            id: '1',
            name: email.split('@')[0] || 'Student',
            email: email,
            role: UserRole.Student
          };
          
          // Check if user already exists in localStorage
          const existingUserData = localStorage.getItem('userData');
          let isReturningUser = false;
          let userData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            lastLogin: new Date().toISOString(),
            loginCount: 1,
            mood: 'Motivated',
            completedOnboarding: false,
            isNewUser: true,
            sawWelcomeTour: false
          };
          
          if (existingUserData) {
            try {
              const parsedData = JSON.parse(existingUserData);
              isReturningUser = true;
              
              // Update existing user data
              userData = {
                ...parsedData,
                lastLogin: new Date().toISOString(),
                loginCount: (parsedData.loginCount || 0) + 1,
                // Preserve these flags if they exist
                completedOnboarding: parsedData.completedOnboarding || false,
                isNewUser: parsedData.isNewUser !== undefined ? parsedData.isNewUser : true,
                sawWelcomeTour: parsedData.sawWelcomeTour || false
              };
            } catch (error) {
              console.error('Error parsing existing user data:', error);
            }
          }
          
          // Save user data to localStorage
          localStorage.setItem('userData', JSON.stringify(userData));
          
          setUser(newUser);
          setLoading(false);
          
          // Toast message for returning users
          if (isReturningUser) {
            toast({
              title: "Welcome back!",
              description: "You're now signed in to your account."
            });
          } else {
            toast({
              title: "Login successful",
              description: "Welcome to Prepzr!"
            });
          }
          
          resolve(true);
        } else {
          setLoading(false);
          
          toast({
            title: "Login Failed",
            description: "Please provide valid credentials.",
            variant: "destructive"
          });
          
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
    localStorage.removeItem('sakha_auth_token');
    
    // Clear user state
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You've been successfully logged out."
    });
    
    // Navigate to login page
    navigate('/login');
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
