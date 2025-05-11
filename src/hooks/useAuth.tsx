
import { useState, useEffect } from 'react';
import { UserRole } from '@/types/user/base';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd check for a token in localStorage
    // and make an API call to validate it
    const checkAuth = () => {
      setLoading(true);
      
      // Check if user is logged in from localStorage
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userData = localStorage.getItem('userData');
      
      if (isLoggedIn && userData) {
        try {
          const parsedData = JSON.parse(userData);
          const mockUser: User = {
            id: parsedData.id || '1',
            name: parsedData.name || 'Test User',
            email: parsedData.email || 'test@example.com',
            role: parsedData.role || UserRole.Student
          };
          
          setUser(mockUser);
        } catch (error) {
          console.error("Failed to parse user data in useAuth", error);
          // If there's an error, clear the localStorage to avoid future errors
          localStorage.removeItem('userData');
          localStorage.removeItem('isLoggedIn');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login functionality
    setLoading(true);
    
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const newUser: User = {
            id: '1',
            name: email.split('@')[0] || 'Test User',
            email: email,
            role: UserRole.Student
          };
          
          setUser(newUser);
          
          // Set user data in localStorage
          const userData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            isAuthenticated: true
          };
          
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('isLoggedIn', 'true');
          
          setLoading(false);
          resolve(newUser);
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  const logout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('sakha_auth_token');
    localStorage.removeItem('sakha_auth_user');
    localStorage.removeItem('user_profile_image');
    localStorage.removeItem('prepzr_remembered_email');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    
    // Clear any session storage items that might contain auth data
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('authToken');
    
    // Reset user state
    setUser(null);
    
    // Force reload to ensure all app state is cleared
    window.location.href = '/login';
  };
  
  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}
