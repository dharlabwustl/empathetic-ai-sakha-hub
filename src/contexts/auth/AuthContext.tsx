
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

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

  // Check for existing user in localStorage on component mount
  useEffect(() => {
    const checkAuth = () => {
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
            console.log("User authenticated from localStorage:", parsedData.email);
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login attempt with:", email);
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
          
          console.log("Login successful for:", email);
          
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
          
          setUser(newUser);
          setLoading(false);
          resolve(true);
        } else {
          console.log("Login failed for:", email);
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
        
        toast({
          title: "Logged out",
          description: "You have been successfully logged out",
        });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    setUser(null);
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
