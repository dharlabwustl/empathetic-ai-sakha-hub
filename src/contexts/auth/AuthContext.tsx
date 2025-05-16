
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/types/user/base';

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
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
          if ((parsedData.email || parsedData.phoneNumber) && parsedData.isAuthenticated === true) {
            // User is already logged in
            setUser({
              id: parsedData.id || '1',
              name: parsedData.name || 'User',
              email: parsedData.email || '',
              phoneNumber: parsedData.phoneNumber || '',
              role: parsedData.role || UserRole.Student
            });
            console.log("User authenticated from localStorage:", parsedData.email || parsedData.phoneNumber);
          } else {
            // Invalid authentication state
            setUser(null);
            // Clear potentially corrupted data
            localStorage.removeItem('userData');
            localStorage.removeItem('isLoggedIn');
            console.log("Invalid auth state detected - clearing localStorage");
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

  // Login function that accepts email or phone number
  const login = async (emailOrPhone: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (emailOrPhone && password && password.length >= 2) {
          // Check if input is email or phone number
          const isEmail = emailOrPhone.includes('@');
          
          // Determine user role from email - if it includes 'admin' then create admin user
          const role = emailOrPhone.includes('admin') ? UserRole.Admin : UserRole.Student;
          
          const newUser: User = {
            id: '1',
            name: isEmail ? emailOrPhone.split('@')[0] : `User_${emailOrPhone.substring(emailOrPhone.length - 4)}`,
            email: isEmail ? emailOrPhone : '',
            phoneNumber: isEmail ? '' : emailOrPhone,
            role: role
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
          
          // Special case for admin users
          if (role === UserRole.Admin) {
            // For admin users, we should use adminLogin from AdminAuthContext instead
            // Just set state here for immediate UI feedback
            setLoading(false);
            resolve(true);
            return;
          }
          
          // Save user data to localStorage
          localStorage.setItem('userData', JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
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
          
          // Clear admin auth if this is a student login
          localStorage.removeItem('admin_logged_in');
          localStorage.removeItem('admin_user');
          
          setUser(newUser);
          setLoading(false);
          console.log("Login successful for:", emailOrPhone, "with role:", role);
          resolve(true);
        } else {
          setLoading(false);
          console.log("Login failed for:", emailOrPhone);
          resolve(false);
        }
      }, 800);
    });
  };

  // Enhanced logout function with proper cleanup
  const logout = () => {
    console.log("AuthContext: Starting logout process...");
    
    // First clear React state to immediately reflect logout in UI
    setUser(null);
    
    // Clear all auth data from localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    
    // Remove remembered login if exists
    localStorage.removeItem('prepzr_remembered_login');
    
    console.log("AuthContext: User logged out completely");
    
    // Force a hard reload to ensure all React state is completely reset
    window.location.href = '/';
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
