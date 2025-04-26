
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { UserRole } from '@/types/user/base';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phoneNumber: string, password: string, role?: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const checkAuth = () => {
      setIsLoading(true);
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simple validation - in a real app, this would verify with a server
      if (email && password) {
        // Mock successful login
        const newUser: User = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          role: UserRole.Student
        };
        
        // Store user in state and localStorage
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Track login activity in userData
        const userData = localStorage.getItem("userData") ? 
          JSON.parse(localStorage.getItem("userData")!) : {};
        
        // Increment login count
        userData.loginCount = (userData.loginCount || 0) + 1;
        userData.lastLoginTime = new Date().toISOString();
        userData.isReturningUser = true;
        
        // Simple mock last activity if none exists
        if (!userData.lastActivity) {
          userData.lastActivity = {
            type: 'concept',
            id: 'concept-123',
            name: 'Introduction to Physics',
            timestamp: new Date().toISOString(),
            progress: 35
          };
        }
        
        localStorage.setItem("userData", JSON.stringify(userData));
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Admin login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simple validation for admin - in a real app, this would verify with a server
      if (email && password && email.includes('admin')) {
        // Mock successful admin login
        const adminUser: User = {
          id: 'admin-1',
          name: 'Admin User',
          email: email,
          role: UserRole.Admin
        };
        
        // Store user in state and localStorage
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Admin login error:", error);
      setIsLoading(false);
      return false;
    }
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
    
    try {
      // Simple validation - in a real app, this would create a new user on the server
      if (name && email && password) {
        // Mock successful registration
        const newUser: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          role: role as UserRole
        };
        
        // Store user in state and localStorage
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Initialize user data for first-time users
        const userData = {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          role: role,
          isNewUser: true,
          completedOnboarding: false,
          sawWelcomeTour: false,
          firstLogin: new Date().toISOString(),
          lastLoginTime: new Date().toISOString(),
          loginCount: 1
        };
        
        localStorage.setItem("userData", JSON.stringify(userData));
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    // Clear user data
    setUser(null);
    localStorage.removeItem('user');
  };

  // Context value
  const contextValue: AuthContextProps = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    adminLogin,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
