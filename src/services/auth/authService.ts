
import apiClient from '../api/apiClient';
import { API_ENDPOINTS, ApiResponse } from '../api/apiConfig';
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
  // Login user with proper error handling
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
    console.log("Auth service logging in with:", credentials);
    
    // First, clear any existing admin login
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
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
      role: UserRole.Student,
      mood: 'MOTIVATED',
      isAuthenticated: true,
      lastLogin: new Date().toISOString()
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    // Trigger auth state change
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Return success response
    return {
      success: true,
      data: demoUser,
      error: null
    };
  },
  
  // Register user with auto-login
  async register(userData: RegisterData): Promise<ApiResponse<AuthUser>> {
    console.log("Auth service registering user:", userData);
    
    // Clear any existing admin login
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
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
    
    // Save user data in localStorage with school name included
    const userDataObj = {
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      phoneNumber: mockUser.phoneNumber,
      role: UserRole.Student,
      schoolName: mockUser.schoolName,
      mood: 'MOTIVATED',
      isAuthenticated: true,
      lastLogin: new Date().toISOString(),
      isFirstTimeUser: true
    };
    
    // Important - set these values to ensure user is redirected to dashboard after signup
    localStorage.setItem('userData', JSON.stringify(userDataObj));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('new_user_signup', 'true');
    localStorage.setItem('skipLogin', 'true'); // Add this flag to skip the login step
    localStorage.setItem('authenticate_user', 'true'); // Add this flag to indicate user is authenticated
    
    // Trigger auth state change
    window.dispatchEvent(new Event('auth-state-changed'));
    
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
    
    // For demo purposes, allow any email with admin in it
    // In a real app, this would validate against admin accounts only
    if (!credentials.email.includes('admin') && credentials.email !== 'admin@prepzr.com') {
      return {
        success: false,
        data: null,
        error: 'Invalid admin credentials'
      };
    }
    
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
    localStorage.setItem('adminToken', adminUser.token);
    localStorage.setItem('adminUser', JSON.stringify(adminUser));
    
    // Trigger auth state change event
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Return success response
    return {
      success: true,
      data: adminUser,
      error: null
    };
  },
  
  // Enhanced logout function
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
    
    // Clear all authentication data from local storage
    const itemsToRemove = [
      'userData',
      'isLoggedIn',
      AUTH_TOKEN_KEY,
      AUTH_USER_KEY,
      'admin_logged_in',
      'admin_user',
      'adminToken',
      'adminUser',
      'prepzr_remembered_login',
      'new_user_signup',
      'current_mood',
      'skipLogin',
      'authenticate_user'
    ];
    
    // Clear each item individually
    itemsToRemove.forEach(item => {
      try {
        localStorage.removeItem(item);
      } catch (e) {
        console.error(`Error clearing ${item}:`, e);
      }
    });
    
    // Additionally clear any session storage items
    try {
      sessionStorage.clear();
    } catch (e) {
      console.error("Error clearing sessionStorage:", e);
    }
    
    // Reset API client
    apiClient.setAuthToken(null);
    
    // Trigger auth state change event
    window.dispatchEvent(new Event('auth-state-changed'));
    
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
    localStorage.removeItem('skipLogin');
    localStorage.removeItem('authenticate_user');
    
    // Reset API client
    apiClient.setAuthToken(null);
    
    // Clear any potential persistent login data from cookies
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Trigger auth state change event
    window.dispatchEvent(new Event('auth-state-changed'));
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
    const authenticateUser = localStorage.getItem('authenticate_user') === 'true';
    
    return (!!token && (isLoggedIn || adminLoggedIn || authenticateUser)); 
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
  }
};

export default authService;
