
import { AdminUser } from "@/types/admin";

const TOKEN_KEY = 'admin_auth_token';
const USER_KEY = 'admin_user';

class AdminAuthService {
  // Store auth data in localStorage
  setAuthData(token: string, user: AdminUser): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Get current admin user from localStorage
  getCurrentUser(): AdminUser | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing admin user from localStorage:', error);
      return null;
    }
  }

  // Get auth token from localStorage
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // Clear auth data from localStorage
  clearAuthData(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  // Verify if token is still valid with backend
  async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;
    
    // In a real app, would make a request to backend to verify token
    // For now, just return true
    return true;
  }

  // Login function - would connect to backend API
  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; token?: string; error?: string }> {
    try {
      // In a real app, we would make an API call
      // Mock implementation for demonstration
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser: AdminUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          permissions: ['manage_students', 'manage_content', 'manage_settings']
        };
        
        const mockToken = 'mock-admin-token';
        
        this.setAuthData(mockToken, mockUser);
        
        return {
          success: true,
          user: mockUser,
          token: mockToken
        };
      }
      
      return { 
        success: false, 
        error: 'Invalid credentials' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred' 
      };
    }
  }

  // Logout function
  async logout(): Promise<void> {
    // In a real app, we might need to call an API endpoint
    this.clearAuthData();
  }
}

const adminAuthService = new AdminAuthService();
export default adminAuthService;
