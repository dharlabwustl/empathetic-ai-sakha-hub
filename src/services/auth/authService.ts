
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
    try {
      console.log("Starting complete logout process...");
      
      // Clear all authentication data from local storage
      const keysToRemove = [
        // Authentication
        'userData', 'isLoggedIn', AUTH_TOKEN_KEY, AUTH_USER_KEY, 
        'user_profile_image', 'prepzr_remembered_email',
        'admin_logged_in', 'admin_user', 'auth_token', 'user_id',
        'refresh_token', 'token_expiry', 'login_timestamp',
        
        // UI state
        'sawWelcomeTour', 'hasSeenTour', 'hasSeenSplash', 
        'voiceSettings', 'new_user_signup', 'dashboard_tour_completed',
        
        // Study data
        'study_time_allocations', 'current_mood', 'mood_history',
        'study_plan', 'user_preferences', 'session_data',
        'concept_progress', 'exam_history', 'flash_cards',
        'last_login', 'temp_auth', 'selected_subjects',
        'saved_notes', 'practice_results',
        
        // Additional custom data
        'login_timestamp', 'user_settings', 'theme_preference',
        'notification_settings', 'accessibility_settings',
        'sidebar_state', 'recent_searches'
      ];
      
      // Get ALL localStorage keys to ensure complete cleanup
      const allKeys = [];
      for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) allKeys.push(key);
      }
      
      // Combine both specific keys and all detected keys
      const allKeysToRemove = [...new Set([...keysToRemove, ...allKeys])];
      
      // Remove all keys
      allKeysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
          console.log(`Removed from localStorage: ${key}`);
        } catch (e) {
          console.error(`Failed to remove key ${key}:`, e);
        }
      });
      
      // Clear all cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        
        // Clear cookie with multiple domain approaches to ensure deletion
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
        
        console.log(`Removed cookie: ${name}`);
      }
      
      // Clear session storage
      sessionStorage.clear();
      console.log("Session storage cleared");
      
      // Reset API client
      apiClient.setAuthToken(null);
      console.log("API client token reset");
      
      // Force clear any session state that might persist
      if (window.sessionStorage) {
        window.sessionStorage.clear();
      }
      
      // Revoke any stored credentials
      if (navigator.credentials && 'preventSilentAccess' in navigator.credentials) {
        await navigator.credentials.preventSilentAccess();
        console.log("Prevented silent access to credentials");
      }
      
      // Clear IndexedDB storage if available (especially important for PWAs)
      try {
        const databases = await window.indexedDB.databases();
        databases.forEach(db => {
          if (db.name) window.indexedDB.deleteDatabase(db.name);
        });
        console.log("IndexedDB storage cleared");
      } catch (error) {
        console.warn("Could not clear IndexedDB storage:", error);
      }
      
      console.log("Logout complete - All authentication data cleared");
      
      // Using window.location.replace instead of href to ensure complete page refresh
      // This prevents any cached state from persisting
      window.location.replace('/login?logout=true');
      
      return {
        success: true,
        data: null,
        error: null
      };
    } catch (error) {
      console.error("Error during logout:", error);
      // Still attempt to redirect even if there was an error
      window.location.replace('/login?logout=error');
      
      return {
        success: false,
        data: null,
        error: "An error occurred during logout"
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
  
  // Clear auth data from local storage and force redirect
  clearAuthData(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    apiClient.setAuthToken(null);
    
    // Clear all cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
    }
    
    // Clear session storage
    sessionStorage.clear();
    
    // Revoke any stored credentials
    if (navigator.credentials && 'preventSilentAccess' in navigator.credentials) {
      navigator.credentials.preventSilentAccess();
    }
    
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
