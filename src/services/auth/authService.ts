
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
import { validateCredentials } from './accountData';
import { UserRole } from '@/types/user/base';

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
  schoolName?: string; // Added field for school/institute name
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: string;
  token: string;
  permissions?: string[];
  schoolName?: string; // Added field for school/institute name
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
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      role: demoUser.role,
      mood: 'MOTIVATED',
      isAuthenticated: true,
      lastLogin: new Date().toISOString()
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
      token: `token_${Date.now()}`,
      schoolName: userData.schoolName // Include school/institute name
    };
    
    // Set the auth data
    this.setAuthData(mockUser);
    
    // Save user data in localStorage for mood tracking with school name included
    const userDataObj = {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      phoneNumber: mockUser.phoneNumber,
      role: mockUser.role,
      schoolName: mockUser.schoolName,
      mood: 'MOTIVATED',
      isAuthenticated: true,
      lastLogin: new Date().toISOString(),
      isFirstTimeUser: true
    };
    
    // Important - set these values to ensure user is logged in after signup
    localStorage.setItem('userData', JSON.stringify(userDataObj));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('new_user_signup', 'true');
    
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
    
    // Set the auth data and clear any existing student login
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('new_user_signup');
    
    // Set admin auth data
    this.setAuthData(adminUser);
    
    // Store admin-specific data
    localStorage.setItem('admin_user', JSON.stringify(adminUser));
    localStorage.setItem('admin_logged_in', 'true');
    
    // Trigger auth state change event
    window.dispatchEvent(new Event('auth-state-changed'));
    
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
    
    // Document cookies handling - clear all cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
    }
    
    // Clear all authentication data from local storage - comprehensive list
    const itemsToRemove = [
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
      'sakha_auth_token',
      'sakha_auth_user',
      'voice-tested',
      'auth_session',
      'auth_token',
      'token',
      'session_token',
      'refresh_token',
      'user_id',
      'user_session',
      'user_data'
    ];
    
    // Clear each item individually and log it for debugging
    itemsToRemove.forEach(item => {
      try {
        if (localStorage.getItem(item)) {
          console.log(`Clearing localStorage item: ${item}`);
          localStorage.removeItem(item);
        }
      } catch (e) {
        console.error(`Error clearing ${item}:`, e);
      }
    });
    
    // Additionally clear any session storage items
    console.log("Clearing all session storage data");
    try {
      sessionStorage.clear();
    } catch (e) {
      console.error("Error clearing sessionStorage:", e);
    }
    
    // Reset API client
    apiClient.setAuthToken(null);
    
    console.log("Logout complete - All authentication data cleared");
    
    // Force redirection to login page to prevent any auto-login issues
    window.location.href = '/login';
    
    // Return success - we'll handle navigation separately in the component
    return {
      success: true,
      data: null,
      error: null
    };
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
    
    // Clear authentication from localStorage
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('admin_logged_in');
    
    // Reset API client
    apiClient.setAuthToken(null);
    
    // Clear any potential persistent login data from cookies
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Force redirection to login page
    window.location.href = '/login';
  },
  
  // Get current authenticated user
  getCurrentUser(): AuthUser | null {
    const userJson = localStorage.getItem(AUTH_USER_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  },
  
  // Get auth token
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    
    return (!!token && (isLoggedIn || adminLoggedIn)); 
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
    return user?.role === 'admin' || localStorage.getItem('admin_logged_in') === 'true';
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
