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
      
      // Check if user data exists in localStorage
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          if (parsedData.id && parsedData.email) {
            // User is already logged in
            setUser({
              id: parsedData.id,
              name: parsedData.name || 'User',
              email: parsedData.email,
              role: parsedData.role || UserRole.Student
            });
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
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
            name: email.split('@')[0] || 'Student',
            email: email,
            role: UserRole.Student
          };
          
          // Save user data to localStorage
          localStorage.setItem('userData', JSON.stringify({
            ...newUser,
            lastLogin: new Date().toISOString(),
            loginCount: 1,
          }));
          
          setUser(newUser);
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
    // Mock logout - don't remove userData completely to keep preferences
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
    setUser(null);
  };
  
  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}
