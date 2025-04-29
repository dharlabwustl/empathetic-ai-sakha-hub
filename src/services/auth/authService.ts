
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
const AUTH_TOKEN_KEY = 'prepzr_auth_token';
const AUTH_USER_KEY = 'prepzr_auth_user';

// Authentication service
const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
    console.log("Auth service logging in with:", credentials);
    
    // For demo, validate against mock accounts
    const user = validateCredentials(credentials.email, credentials.password);
    
    if (user) {
      // Set the auth data
      this.setAuthData(user);
      
      // Return success response
      return {
        success: true,
        data: user,
        error: null
      };
    } else {
      // Return error response
      return {
        success: false,
        data: null,
        error: "Invalid email or password"
      };
    }
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
    
    // Special case for the default admin account to make sure it always works
    if (credentials.email === "admin@sakha.ai" && credentials.password === "admin123") {
      const adminUser: AuthUser = {
        id: "admin_default",
        name: "Admin User",
        email: "admin@sakha.ai",
        role: "admin",
        token: `admin_token_${Date.now()}`,
        permissions: ["all"]
      };
      
      // Set the auth data
      this.setAuthData(adminUser);
      
      // Return success response
      return {
        success: true,
        data: adminUser,
        error: null
      };
    }
    
    // For other admin accounts, validate against mock accounts
    const user = validateCredentials(credentials.email, credentials.password);
    
    if (user && user.role === 'admin') {
      // Set the auth data
      this.setAuthData(user);
      
      // Return success response
      return {
        success: true,
        data: user,
        error: null
      };
    } else {
      // Return error response
      return {
        success: false,
        data: null,
        error: "Invalid admin credentials"
      };
    }
  },
  
  // Logout user
  async logout(): Promise<ApiResponse<void>> {
    // Always clear local auth data
    this.clearAuthData();
    
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
  
  // Clear auth data from local storage
  clearAuthData(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    apiClient.setAuthToken(null);
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
    return !!this.getToken();
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
