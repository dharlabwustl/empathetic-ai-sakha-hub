
import { useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, we would check for a token in localStorage
    // or make an API call to validate the session
    const mockUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'student'
    };

    // Simulate API call
    setTimeout(() => {
      setUser(mockUser);
      setIsAuthenticated(true);
      setLoading(false);
    }, 500);
  }, []);

  const login = async () => {
    setLoading(true);
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'student'
    });
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    // Simulate logout API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };
}
