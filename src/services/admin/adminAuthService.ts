
import { AdminUser } from "@/types/admin";

interface AuthResponse {
  success: boolean;
  data?: AdminUser;
  error?: string;
}

const adminAuthService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "admin@sakha.ai" && password === "admin123") {
          resolve({
            success: true,
            data: {
              id: "admin-1",
              name: "Admin User",
              email: "admin@sakha.ai",
              role: "admin",
              permissions: ["users.read", "users.write", "content.read", "content.write", "settings.read", "settings.write"]
            }
          });
        } else {
          resolve({
            success: false,
            error: "Invalid email or password"
          });
        }
      }, 1000);
    });
  },

  logout: async (): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("adminAuthToken");
        resolve();
      }, 500);
    });
  },

  checkAuth: async (): Promise<boolean> => {
    // Simulate checking auth token validity
    return new Promise((resolve) => {
      setTimeout(() => {
        const authToken = localStorage.getItem("adminAuthToken");
        resolve(!!authToken);
      }, 500);
    });
  }
};

export default adminAuthService;
