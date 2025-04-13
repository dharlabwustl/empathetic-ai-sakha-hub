
import { useState, useEffect } from 'react';
import authService, { AuthUser } from '@/services/auth/authService';

export const useAuthInitializer = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("AuthInitializer - Loading user from localStorage");
        const currentUser = authService.getCurrentUser();
        
        if (currentUser) {
          console.log("AuthInitializer - User found in localStorage:", currentUser);
          // Verify token validity with backend
          const isValid = await authService.verifyToken();
          
          if (isValid) {
            console.log("AuthInitializer - Token is valid, setting user");
            setUser(currentUser);
          } else {
            console.log("AuthInitializer - Token is invalid, clearing auth data");
            // Token is invalid, clear auth data
            authService.clearAuthData();
            setUser(null);
          }
        } else {
          console.log("AuthInitializer - No user found in localStorage");
        }
      } catch (error) {
        console.error("AuthInitializer - Error loading user:", error);
        authService.clearAuthData();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  return { user, setUser, isLoading, setIsLoading };
};
