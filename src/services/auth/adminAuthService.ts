
import { AdminUser } from "@/types/user/base";

interface LoginResponse {
  success: boolean;
  data: AdminUser | null;
  message?: string;
  error?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Predefined admin credentials - normally this would be in a secure backend
const ADMIN_CREDENTIALS = {
  email: "admin@prepzr.com",
  password: "Admin@2025#Secure",
  name: "Admin User"
};

// Admin auth service with enhanced functions
const adminAuthService = {
  // Admin login function with improved security and reliability
  async adminLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log("Admin auth service: login attempt for", credentials.email);
    
    try {
      // Check against predefined credentials
      if (credentials.email === ADMIN_CREDENTIALS.email && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        
        const adminUser: AdminUser = {
          id: `admin_${Date.now()}`,
          name: ADMIN_CREDENTIALS.name,
          email: ADMIN_CREDENTIALS.email,
          role: "admin",
          permissions: ['all']
        };
        
        // Clear any existing user data to prevent conflicts
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('new_user_signup');
        
        // Store admin data in localStorage 
        const mockToken = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem("adminToken", mockToken);
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        localStorage.setItem("admin_logged_in", "true");
        
        // Dispatch event to notify components about auth state change
        window.dispatchEvent(new Event('auth-state-changed'));
        
        console.log("Admin login successful, data stored in localStorage");
        
        return {
          success: true,
          data: adminUser,
          message: "Login successful"
        };
      } else {
        console.log("Admin login failed: invalid credentials");
        return {
          success: false,
          data: null,
          message: "Invalid admin credentials. Please check your email and password."
        };
      }
    } catch (error) {
      console.error("Admin login error:", error);
      return {
        success: false,
        data: null,
        message: "An error occurred during login",
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  },
  
  // Admin logout function with enhanced session clearing but without navigation
  async adminLogout(): Promise<void> {
    console.log("Admin auth service: executing logout");
    
    // Clear admin-specific tokens
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_login_attempt");
    
    // Dispatch event to notify components about auth state change
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Short delay to ensure localStorage changes have propagated
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log("Admin logout complete, localStorage cleared");
  },
  
  // Get current admin user with improved error handling
  async getAdminUser(): Promise<AdminUser | null> {
    try {
      const token = localStorage.getItem("adminToken");
      const userJson = localStorage.getItem("adminUser");
      const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
      
      console.log("Admin auth check:", { 
        hasToken: !!token, 
        hasUserJson: !!userJson, 
        isAdminLoggedIn 
      });
      
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
      const token = localStorage.getItem("adminToken");
      const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
      
      if (token && isAdminLoggedIn) {
        const userJson = localStorage.getItem("adminUser");
        const isValid = !!userJson && JSON.parse(userJson) !== null;
        console.log("Admin is authenticated:", isValid);
        return isValid;
      }
      
      console.log("Admin is not authenticated");
      return false;
    } catch (error) {
      console.error("Error checking admin authentication:", error);
      return false;
    }
  }
};

export default adminAuthService;
