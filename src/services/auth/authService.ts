
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

// List of all auth-related items to clear on logout
const AUTH_RELATED_ITEMS = [
  // Authentication data
  'userData',
  'isLoggedIn',
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  'user_profile_image',
  'prepzr_remembered_email',
  'admin_logged_in',
  'admin_user',
  'sawWelcomeTour',
  'hasSeenTour',
  'hasSeenSplash',
  'voiceSettings',
  'new_user_signup',
  'study_time_allocations',
  'current_mood',
  'mood_history',
  'dashboard_tour_completed',
  'study_plan',
  'user_preferences',
  'session_data',
  'concept_progress',
  'exam_history',
  'flash_cards',
  'last_login',
  'temp_auth',
  'selected_subjects',
  'saved_notes',
  'practice_results',
  'adminToken',
  'auth_session',
  'auth_token',
  'token',
  'session_token',
  'refresh_token',
  'user_id',
  'user_session',
  'user_data'
];

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
    localStorage.setItem('new_user_signup', 'true'); // Mark as new user signup
    
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
  
  // Enhanced comprehensive logout function - completely clears all authentication data
  async logout(): Promise<ApiResponse<void>> {
    console.log("Starting enhanced logout process to clear all auth data...");
    
    return new Promise((resolve) => {
      // First, capture the current path before we do anything
      const currentPath = window.location.pathname;
      
      // Clear cookies
      this.clearAllCookies();
      
      // Clear all localStorage items
      this.clearAllLocalStorageItems();
      
      // Clear sessionStorage items
      this.clearAllSessionStorageItems();
      
      // Reset API client
      apiClient.setAuthToken(null);
      
      console.log("Logout complete - All authentication data cleared");
      
      // Force navigation to login (with a timeout to ensure everything is cleared)
      setTimeout(() => {
        // Use window.location.replace to prevent browser back button from returning to protected routes
        window.location.replace('/login');
        
        resolve({
          success: true,
          data: null,
          error: null
        });
      }, 100);
    });
  },
  
  // Helper method to clear all cookies
  clearAllCookies(): void {
    const cookies = document.cookie.split(";");
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      
      // Clear for all possible paths and domains
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    }
    
    console.log("All cookies cleared");
  },
  
  // Helper method to clear all localStorage items related to auth
  clearAllLocalStorageItems(): void {
    try {
      // Clear specific auth-related items
      AUTH_RELATED_ITEMS.forEach(item => {
        if (localStorage.getItem(item)) {
          console.log(`Clearing localStorage item: ${item}`);
          localStorage.removeItem(item);
        }
      });
      
      console.log("All auth-related localStorage items cleared");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
  
  // Helper method to clear all sessionStorage items
  clearAllSessionStorageItems(): void {
    try {
      sessionStorage.clear();
      console.log("All sessionStorage items cleared");
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
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
  
  // Clear auth data from local storage and force redirect
  clearAuthData(): void {
    console.log("Clearing auth data and redirecting to login...");
    
    // Call the comprehensive logout method
    this.logout();
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
