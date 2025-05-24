
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
    console.log("🔐 adminAuthService: Starting login attempt for", credentials.email);
    
    try {
      // Add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log("🔍 adminAuthService: Checking credentials...");
      console.log("Expected email:", ADMIN_CREDENTIALS.email);
      console.log("Provided email:", credentials.email);
      console.log("Email match:", credentials.email === ADMIN_CREDENTIALS.email);
      console.log("Password match:", credentials.password === ADMIN_CREDENTIALS.password);
      
      if (credentials.email === ADMIN_CREDENTIALS.email && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        
        console.log("✅ adminAuthService: Credentials are valid");
        
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
        console.log("💾 adminAuthService: Storing admin data with token:", mockToken);
        
        localStorage.setItem("adminToken", mockToken);
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        localStorage.setItem("admin_logged_in", "true");
        
        console.log("📊 adminAuthService: Verification - stored data check:", {
          token: !!localStorage.getItem("adminToken"),
          user: !!localStorage.getItem("adminUser"),
          loggedIn: localStorage.getItem("admin_logged_in")
        });
        
        // Dispatch auth state change event
        console.log("📡 adminAuthService: Dispatching auth state change event");
        window.dispatchEvent(new Event('auth-state-changed'));
        
        console.log("🎯 adminAuthService: Admin login successful, returning success response");
        
        return {
          success: true,
          data: adminUser,
          message: "Login successful"
        };
      } else {
        console.log("❌ adminAuthService: Invalid credentials provided");
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
    console.log("🚪 adminAuthService: Starting logout process");
    
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_login_attempt");
    
    console.log("📡 adminAuthService: Dispatching auth state change event for logout");
    window.dispatchEvent(new Event('auth-state-changed'));
    
    console.log("✅ adminAuthService: Logout complete");
  },
  
  async getAdminUser(): Promise<AdminUser | null> {
    try {
      const token = localStorage.getItem("adminToken");
      const userJson = localStorage.getItem("adminUser");
      const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
      
      console.log("🔍 adminAuthService: Getting admin user - checks:", {
        hasToken: !!token,
        hasUser: !!userJson,
        isLoggedIn: isAdminLoggedIn,
        tokenValue: token ? token.substring(0, 20) + "..." : "null"
      });
      
      if (!token || !userJson || !isAdminLoggedIn) {
        console.log("❌ adminAuthService: Missing required admin session data");
        return null;
      }
      
      const user = JSON.parse(userJson) as AdminUser;
      console.log("✅ adminAuthService: Successfully retrieved admin user:", user.email);
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
      console.log("🔐 adminAuthService: Authentication check result:", { 
        token: !!token, 
        isAdminLoggedIn, 
        userJson: !!userJson, 
        finalResult: isAuth 
      });
      return isAuth;
    } catch (error) {
      console.error("💥 adminAuthService: Error checking authentication:", error);
      return false;
    }
  }
};

export default adminAuthService;
