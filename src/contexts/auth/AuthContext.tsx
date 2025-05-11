
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import authService, { AuthUser, LoginCredentials, RegisterData } from '@/services/auth/authService';
import { ApiResponse } from '@/services/api/apiConfig';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<ApiResponse<AuthUser>>;
  register: (data: RegisterData) => Promise<ApiResponse<AuthUser>>;
  adminLogin: (credentials: LoginCredentials) => Promise<ApiResponse<AuthUser>>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: () => Promise.resolve({ success: false, data: null, error: 'Context not initialized' }),
  register: () => Promise.resolve({ success: false, data: null, error: 'Context not initialized' }),
  adminLogin: () => Promise.resolve({ success: false, data: null, error: 'Context not initialized' }),
  logout: () => Promise.resolve(),
  clearError: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        // Check if user is already logged in
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          if (currentUser) {
            // Verify token is still valid
            const isValid = await authService.verifyToken();
            if (isValid) {
              setUser(currentUser);
            } else {
              // Token is invalid, clear auth data
              await authService.clearAuthData();
              setUser(null);
            }
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authService.login(credentials);
      
      if (result.success && result.data) {
        setUser(result.data);
      } else {
        setError(result.error || 'Login failed');
      }
      
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, data: null, error: errorMessage };
    }
  };

  const register = async (data: RegisterData): Promise<ApiResponse<AuthUser>> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authService.register(data);
      
      if (result.success && result.data) {
        setUser(result.data);
      } else {
        setError(result.error || 'Registration failed');
      }
      
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, data: null, error: errorMessage };
    }
  };

  const adminLogin = async (credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authService.adminLogin(credentials);
      
      if (result.success && result.data) {
        setUser(result.data);
      } else {
        setError(result.error || 'Admin login failed');
      }
      
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, data: null, error: errorMessage };
    }
  };

  // Enhanced logout functionality
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      console.log("AuthContext: Starting logout process");
      await authService.logout();
      
      // Clear contexts
      setUser(null);
      setError(null);
      
      console.log("AuthContext: Logout complete");
    } catch (err) {
      console.error("AuthContext: Error during logout", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      error,
      login,
      register,
      adminLogin,
      logout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
