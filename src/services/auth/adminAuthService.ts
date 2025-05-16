
import { AdminUser } from "@/types/user/base";
import authService from './authService';

interface LoginResponse {
  success: boolean;
  data: AdminUser | null;
  message?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Admin auth service with enhanced error handling
const adminAuthService = {
  // Admin login function with improved validation
  async adminLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      console.log("Admin auth service: login attempt for", credentials.email);
      
      if (!credentials.email || !credentials.password) {
        return {
          success: false,
          data: null,
          message: "Email and password are required"
        };
      }
      
      // For demo purposes, allow any email with admin in it
      if (credentials.email.includes('admin')) {
        const adminUser: AdminUser = {
          id: `admin_${Date.now()}`,
          name: "Admin User",
          email: credentials.email,
          role: "admin"
        };
        
        // Store token in localStorage
        const mockToken = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem("adminToken", mockToken);
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("admin_logged_in", "true");
        
        return {
          success: true,
          data: adminUser,
          message: "Admin login successful"
        };
      } else {
        return {
          success: false,
          data: null,
          message: "Invalid admin credentials. Email must contain 'admin'."
        };
      }
    } catch (error) {
      console.error("Admin login error:", error);
      return {
        success: false,
        data: null,
        message: "An unexpected error occurred during login"
      };
    }
  },
  
  // Admin logout function with enhanced session clearing
  async adminLogout(): Promise<{ success: boolean, message?: string }> {
    try {
      console.log("Admin auth service: executing enhanced logout");
      
      // Clear admin-specific tokens
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("admin_logged_in");
      
      // Clear session cookies
      document.cookie = "admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Set general logout flag
      localStorage.setItem("isLoggedIn", "false");
      
      // Return success
      return {
        success: true,
        message: "Admin logout successful"
      };
    } catch (error) {
      console.error("Admin logout error:", error);
      return {
        success: false,
        message: "Failed to complete admin logout process"
      };
    }
  },
  
  // Get current admin user with improved error handling
  async getAdminUser(): Promise<AdminUser | null> {
    try {
      const token = localStorage.getItem("adminToken");
      const userJson = localStorage.getItem("adminUser");
      const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
      
      if (!token || !userJson || !isAdminLoggedIn) {
        return null;
      }
      
      return JSON.parse(userJson) as AdminUser;
    } catch (error) {
      console.error("Error parsing admin user:", error);
      return null;
    }
  },
  
  // Check if admin is authenticated with improved validation
  isAuthenticated(): boolean {
    try {
      const hasToken = !!localStorage.getItem("adminToken");
      const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
      return hasToken && isAdminLoggedIn;
    } catch (error) {
      console.error("Error checking admin authentication:", error);
      return false;
    }
  }
};

export default adminAuthService;
