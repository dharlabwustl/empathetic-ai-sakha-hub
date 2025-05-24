
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

// Predefined admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin@prepzr.com",
  password: "Admin@2025#Secure",
  name: "Admin User"
};

const adminAuthService = {
  async adminLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log("🔐 adminAuthService: login attempt for", credentials.email);
    
    try {
      // Add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (credentials.email === ADMIN_CREDENTIALS.email && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        
        const adminUser: AdminUser = {
          id: `admin_${Date.now()}`,
          name: ADMIN_CREDENTIALS.name,
          email: ADMIN_CREDENTIALS.email,
          role: "admin",
          permissions: ['all']
        };
        
        // Clear any existing user data
        console.log("🧹 adminAuthService: Clearing existing auth data");
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('new_user_signup');
        localStorage.removeItem('google_signup');
        
        // Store admin data
        const mockToken = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem("adminToken", mockToken);
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        localStorage.setItem("admin_logged_in", "true");
        
        console.log("✅ adminAuthService: Admin data stored successfully");
        console.log("📊 adminAuthService: Stored data check:", {
          token: !!localStorage.getItem("adminToken"),
          user: !!localStorage.getItem("adminUser"),
          loggedIn: localStorage.getItem("admin_logged_in")
        });
        
        // Dispatch auth state change event
        window.dispatchEvent(new Event('auth-state-changed'));
        
        console.log("🎯 adminAuthService: Admin login successful, auth event dispatched");
        
        return {
          success: true,
          data: adminUser,
          message: "Login successful"
        };
      } else {
        console.log("❌ adminAuthService: Invalid credentials");
        return {
          success: false,
          data: null,
          message: "Invalid admin credentials"
        };
      }
    } catch (error) {
      console.error("💥 adminAuthService: Login error:", error);
      return {
        success: false,
        data: null,
        message: "Login failed",
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  },
  
  async adminLogout(): Promise<void> {
    console.log("🚪 adminAuthService: Logging out");
    
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_login_attempt");
    
    window.dispatchEvent(new Event('auth-state-changed'));
    
    console.log("✅ adminAuthService: Logout complete");
  },
  
  async getAdminUser(): Promise<AdminUser | null> {
    try {
      const token = localStorage.getItem("adminToken");
      const userJson = localStorage.getItem("adminUser");
      const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
      
      console.log("🔍 adminAuthService: Getting admin user", {
        hasToken: !!token,
        hasUser: !!userJson,
        isLoggedIn: isAdminLoggedIn
      });
      
      if (!token || !userJson || !isAdminLoggedIn) {
        console.log("❌ adminAuthService: No valid admin session found");
        return null;
      }
      
      const user = JSON.parse(userJson) as AdminUser;
      console.log("✅ adminAuthService: Retrieved admin user:", user.email);
      return user;
    } catch (error) {
      console.error("💥 adminAuthService: Error getting admin user:", error);
      return null;
    }
  },
  
  isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem("adminToken");
      const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
      const userJson = localStorage.getItem("adminUser");
      
      const isAuth = !!(token && isAdminLoggedIn && userJson);
      console.log("🔐 adminAuthService: Authentication check:", { 
        token: !!token, 
        isAdminLoggedIn, 
        userJson: !!userJson, 
        result: isAuth 
      });
      return isAuth;
    } catch (error) {
      console.error("💥 adminAuthService: Error checking authentication:", error);
      return false;
    }
  }
};

export default adminAuthService;
