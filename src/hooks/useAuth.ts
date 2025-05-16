
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
          // Parse user data
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
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

  const login = async (email: string, password: string) => {
    // Mock login functionality
    setLoading(true);
    
    // Clear any existing admin session
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    
    return new Promise<User>((resolve, reject) => {
      // For demo login, automatically accept demo credentials
      if (email === 'demo@prepzr.com' && password === 'demo123') {
        const demoUser: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@prepzr.com',
          role: UserRole.Student
        };
        
        // Store in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(demoUser));
        
        // Update state
        setUser(demoUser);
        setLoading(false);
        
        // Dispatch auth state changed event
        window.dispatchEvent(new Event('auth-state-changed'));
        
        resolve(demoUser);
        return;
      }
      
      // For all other cases, add a small delay
      setTimeout(() => {
        // Accept any non-empty credentials
        if (email && password) {
          // Create mock user
          const newUser: User = {
            id: '1',
            name: 'Test User',
            email: email,
            role: UserRole.Student
          };
          
          // Store in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(newUser));
          localStorage.setItem('completedOnboarding', 'true'); // Mark onboarding as completed
          
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
      }, 400);
    });
  };
  
  const logout = () => {
    // Mock logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    setUser(null);
    
    // Dispatch auth state changed event
    window.dispatchEvent(new Event('auth-state-changed'));
  };
  
  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}
