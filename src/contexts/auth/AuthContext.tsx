
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { AuthUser, LoginCredentials, RegisterData } from '@/services/auth/authService';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  googleSignIn: () => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Check if token exists and is valid
        const isAuthenticated = await authService.verifyToken();
        
        if (isAuthenticated) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        authService.clearAuthData(); // Clear any invalid auth data
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        setUser(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const userData: RegisterData = {
        name,
        email,
        phoneNumber: phone,
        password
      };
      
      const response = await authService.register(userData);
      
      if (response.success && response.data) {
        setUser(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In (mock)
  const googleSignIn = async (): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock Google sign in response
      const mockResponse = await authService.register({
        name: "Google User",
        email: `google_user_${Date.now()}@gmail.com`,
        phoneNumber: "",
        password: "google_auth"
      });
      
      if (mockResponse.success && mockResponse.data) {
        setUser(mockResponse.data);
        localStorage.setItem('should_prompt_study_plan', 'true');
        return true;
      }
      return false;
    } catch (error) {
      console.error("Google sign in error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
      // Ensure all auth-related items are cleared from localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      localStorage.removeItem('user_profile_image');
      localStorage.removeItem('sakha_auth_token');
      localStorage.removeItem('sakha_auth_user');
      localStorage.removeItem('new_user_signup');
      localStorage.removeItem('sawWelcomeTour');
      localStorage.removeItem('sawWelcomeSlider');
      localStorage.removeItem('dashboard_tour_completed');
      localStorage.removeItem('hasSeenSplash');
      sessionStorage.removeItem('hasSeenSplash');
      
      // Navigate to login page after logout
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        googleSignIn,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
