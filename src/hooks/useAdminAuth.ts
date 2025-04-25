
import { useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      
      // Mock authentication check
      setTimeout(() => {
        const mockUser: AdminUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        };
        
        setUser(mockUser);
        setLoading(false);
      }, 500);
    };
    
    checkAuth();
  }, []);
  
  return {
    user,
    loading,
    isAuthenticated: !!user
  };
}
