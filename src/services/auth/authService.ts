
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
import { validateCredentials } from './accountData';

// Auth service types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: string;
  token: string;
  permissions?: string[];
}

// Local storage keys
const AUTH_TOKEN_KEY = 'sakha_auth_token';
const AUTH_USER_KEY = 'sakha_auth_user';

// Authentication service
const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
    console.log("Auth service logging in with:", credentials);
    
    // For demo purposes, allow any email/password combination
    // In a real app, this would validate against a backend
    const demoUser: AuthUser = {
      id: `user_${Date.now()}`,
      name: credentials.email.split('@')[0] || 'Demo User',
      email: credentials.email,
      role: 'student',
      token: `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    };
    
    // Set the auth data
    this.setAuthData(demoUser);
    
    // Save user data in localStorage for mood tracking
    const userData = {
      name: demoUser.name,
      email: demoUser.email,
      mood: 'MOTIVATED',
      isAuthenticated: true
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    // Return success response
    return {
      success: true,
      data: demoUser,
      error: null
    };
  },
  
  // Register user
  async register(userData: RegisterData): Promise<ApiResponse<AuthUser>> {
    console.log("Auth service registering user:", userData);
    
    // For demo, create a mock successful response
    const mockUser: AuthUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      role: userData.role || 'student',
      token: `token_${Date.now()}`
    };
    
    // Set the auth data
    this.setAuthData(mockUser);
    
    // Save user data in localStorage for mood tracking
    const userDataObj = {
      name: mockUser.name,
      email: mockUser.email,
      mood: 'MOTIVATED',
      isAuthenticated: true
    };
    localStorage.setItem('userData', JSON.stringify(userDataObj));
    localStorage.setItem('isLoggedIn', 'true');
    
    // Return success response
    return {
      success: true,
      data: mockUser,
      error: null
    };
  },
  
  // Admin login
  async adminLogin(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
    console.log("Admin login with:", credentials);
    
    // For demo purposes, allow any email
    // In a real app, this would validate against admin accounts only
    const adminUser: AuthUser = {
      id: `admin_${Date.now()}`,
      name: 'Admin User',
      email: credentials.email,
      role: 'admin',
      token: `admin_token_${Date.now()}`,
      permissions: ['all']
    };
    
    // Set the auth data
    this.setAuthData(adminUser);
    localStorage.setItem('isLoggedIn', 'true');
    
    // Return success response
    return {
      success: true,
      data: adminUser,
      error: null
    };
  },
  
  // Enhanced logout function - completely clears all authentication data
  async logout(): Promise<ApiResponse<void>> {
    console.log("Executing complete logout...");
    
    try {
      // Create a list of all keys to clear
      const keysToRemove = [
        // Auth keys
        'userData',
        'isLoggedIn',
        AUTH_TOKEN_KEY,
        AUTH_USER_KEY,
        'user_profile_image',
        'prepzr_remembered_email',
        'admin_logged_in',
        'admin_user',
        
        // User preferences and settings
        'sawWelcomeTour',
        'hasSeenTour',
        'hasSeenSplash',
        'voiceSettings',
        'new_user_signup',
        'study_time_allocations',
        'dashboard_tour_completed',
        
        // Mood tracking data
        'current_mood',
        'mood_history',
        
        // Any other app-specific data
        'lastAccessedConcept',
        'recentSearches',
        'userPrefs',
        'cachedData'
      ];
      
      // Log which keys are being cleared
      console.log("Clearing the following localStorage keys:", keysToRemove);
      
      // Clear all specific keys
      keysToRemove.forEach(key => {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
          console.log(`Removed: ${key}`);
        }
      });
      
      // Clear any session storage items
      console.log("Clearing all session storage");
      sessionStorage.clear();
      
      // Reset API client
      apiClient.setAuthToken(null);
      
      console.log("Logout complete - All authentication data cleared");
      
      // In a production environment, we would also invalidate the token on the server
      
      // Force a navigation to login page
      console.log("Forcing navigation to login page");
      window.location.href = '/login';
      
      return {
        success: true,
        data: null,
        error: null
      };
    } catch (error) {
      console.error("Error during logout:", error);
      
      // Failsafe: If something goes wrong, try direct approach
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
      
      return {
        success: false,
        data: null,
        error: "Error during logout, but forced clearing of storage anyway"
      };
    }
  },
  
  // Set auth data in local storage and configure API client
  setAuthData(user: AuthUser): void {
    if (user && user.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, user.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      apiClient.setAuthToken(user.token);
    }
  },
  
  // Clear auth data from local storage
  clearAuthData(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    apiClient.setAuthToken(null);
    
    // Force redirect to login screen with replace to ensure complete refresh
    window.location.replace('/login');
  },
  
  // Get current authenticated user
  getCurrentUser(): AuthUser | null {
    const userJson = localStorage.getItem(AUTH_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },
  
  // Get auth token
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return !!token && isLoggedIn; // Both must be true for authenticated state
  },
  
  // Verify if token is still valid
  async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    
    if (!token) {
      return false;
    }
    
    // For demo, always return true to simulate valid token
    return true;
  },
  
  // Check if user has admin access
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },
  
  // Check if user has specific permissions
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user || user.role !== 'admin') return false;
    
    // If user has 'all' permission or the specific requested permission
    return user.permissions?.includes('all') || user.permissions?.includes(permission) || false;
  },
  
  // Initialize auth state from local storage
  initializeAuth(): void {
    const token = this.getToken();
    if (token) {
      apiClient.setAuthToken(token);
    }
  }
};

// Initialize auth state when the service is imported
authService.initializeAuth();

export default authService;
