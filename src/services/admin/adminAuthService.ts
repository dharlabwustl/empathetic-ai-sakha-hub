
import { AdminUser } from "@/types/admin";
import { validateCredentials } from "../auth/accountData";

const adminAuthService = {
  login: async (email: string, password: string): Promise<AdminUser> => {
    console.log("Admin login attempt:", email);
    
    // Use the common validateCredentials function
    const user = validateCredentials(email, password);
    
    if (user && user.role === 'admin') {
      const adminUser: AdminUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: 'admin',
        permissions: user.permissions || ['all'],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      // Store user in localStorage for session persistence
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      
      console.log("Admin login successful:", adminUser);
      return Promise.resolve(adminUser);
    }
    
    console.log("Admin login failed for:", email);
    return Promise.reject(new Error('Invalid credentials'));
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('adminUser');
    return Promise.resolve();
  },

  getCurrentUser: (): AdminUser | null => {
    const userJson = localStorage.getItem('adminUser');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  checkAuth: async (): Promise<AdminUser> => {
    const userJson = localStorage.getItem('adminUser');
    if (userJson) {
      return Promise.resolve(JSON.parse(userJson));
    }
    return Promise.reject(new Error('Not authenticated'));
  }
};

export default adminAuthService;
