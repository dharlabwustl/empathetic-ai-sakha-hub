
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

// Admin credentials - in a real app this would be in a secure database
const ADMIN_CREDENTIALS = {
  email: "admin@prepzr.com",
  password: "Admin@2025#Secure",
  name: "Admin User"
};

// Enhanced admin authentication service
const adminAuthService = {
  // Admin login function with improved validation
  async adminLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log("Admin auth service: Processing login for", credentials.email);
    
    try {
      // Validate email and password format first
      if (!credentials.email || !credentials.password) {
        return {
          success: false,
          data: null,
          message: "Email and password are required"
        };
      }
      
      // Check against admin credentials
      if (credentials.email === ADMIN_CREDENTIALS.email && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        
        // Create admin user object
        const adminUser: AdminUser = {
          id: `admin_${Date.now()}`,
          name: ADMIN_CREDENTIALS.name,
          email: ADMIN_CREDENTIALS.email,
          role: "admin",
          permissions: ['all']
        };
        
        // Clear any existing user data
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('new_user_signup');
        
        // Store admin data securely
        const secureToken = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem("adminToken", secureToken);
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        localStorage.setItem("admin_logged_in", "true");
        
        // Notify listeners about auth state change
        window.dispatchEvent(new Event('auth-state-changed'));
        
        console.log("Admin login successful");
        
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
  
  // Improved admin logout function
  async adminLogout(): Promise<void> {
    console.log("Admin auth service: executing logout");
    
    // Clear all admin-specific data
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_login_attempt");
    
    // Notify listeners about auth state change
    window.dispatchEvent(new Event('auth-state-changed'));
    
    console.log("Admin logout complete");
  },
  
  // Enhanced admin user retrieval
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
      console.error("Error retrieving admin user:", error);
      return null;
    }
  },
  
  // Improved authentication status check
  isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem("adminToken");
      const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
      
      if (!token || !isAdminLoggedIn) {
        return false;
      }
      
      const userJson = localStorage.getItem("adminUser");
      return !!userJson && JSON.parse(userJson) !== null;
    } catch (error) {
      console.error("Error checking admin authentication:", error);
      return false;
    }
  }
};

export default adminAuthService;
