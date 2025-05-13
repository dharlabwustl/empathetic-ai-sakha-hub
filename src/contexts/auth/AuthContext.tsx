
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => Promise.reject('AuthContext not initialized'),
  logout: () => {},
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing authentication
    const checkAuth = () => {
      setLoading(true);
      
      // Check localStorage for authentication state
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const storedUserData = localStorage.getItem('userData');
      
      if (isLoggedIn && storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          setUser({
            id: userData.id || '1',
            name: userData.name || 'User',
            email: userData.email || 'user@example.com',
            role: userData.role || UserRole.Student
          });
        } catch (error) {
          // If parsing fails, clear invalid data
          localStorage.removeItem('userData');
          localStorage.removeItem('isLoggedIn');
          console.error('Error parsing stored user data:', error);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        // For demo, any email/password will work
        if (email && password) {
          const newUser = {
            id: '1',
            name: email.split('@')[0] || 'User',
            email,
            role: UserRole.Student
          };
          
          // Save authenticated state to localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(newUser));
          localStorage.setItem('user_profile_image', 'https://ui-avatars.com/api/?name=' + encodeURIComponent(newUser.name));
          
          setUser(newUser);
          setLoading(false);
          resolve(newUser);
        } else {
          setLoading(false);
          reject(new Error('Email and password are required'));
        }
      }, 800);
    });
  };
  
  // Enhanced logout function to ensure all auth data is cleared
  const logout = () => {
    // Clear all auth-related data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_profile_image');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    
    // Clear any session items that might contain user data
    sessionStorage.removeItem('lastRoute');
    sessionStorage.removeItem('userSettings');
    
    // Clear cookies (if any are used)
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=');
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
    
    // Update state
    setUser(null);
    
    // Navigate to login page
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
