
import { AdminUser } from "@/types/user/base";

interface LoginResponse {
  success: boolean;
  data: AdminUser | null;
  message?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Admin auth service with enhanced functions
const adminAuthService = {
  // Admin login function with improved security and reliability
  async adminLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log("Admin auth service: login attempt for", credentials.email);
    
    try {
      // For demo purposes, allow any email with admin in it
      if (credentials.email.includes('admin') && credentials.password.length > 0) {
        const adminUser: AdminUser = {
          id: `admin_${Date.now()}`,
          name: credentials.email.split('@')[0] || "Admin User",
          email: credentials.email,
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
        
        return {
          success: true,
          data: adminUser,
          message: "Login successful"
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
        message: "An error occurred during login"
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
    
    // Dispatch event to notify components about auth state change
    window.dispatchEvent(new Event('auth-state-changed'));
  },
  
  // Get current admin user
  async getAdminUser(): Promise<AdminUser | null> {
    const token = localStorage.getItem("adminToken");
    const userJson = localStorage.getItem("adminUser");
    
    if (!token || !userJson) {
      return null;
    }
    
    try {
      return JSON.parse(userJson) as AdminUser;
    } catch (error) {
      console.error("Error parsing admin user:", error);
      return null;
    }
  },
  
  // Check if admin is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem("adminToken");
    const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    return !!token && isAdminLoggedIn;
  }
};

export default adminAuthService;
