
import { AdminUser } from "@/types/admin";

const adminAuthService = {
  login: async (email: string, password: string): Promise<AdminUser> => {
    // Mock implementation - in a real app, this would call an API
    if (email === 'admin@example.com' && password === 'admin123') {
      const user: AdminUser = {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        permissions: ['users:read', 'users:write', 'content:read', 'content:write', 'settings:read', 'settings:write'],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error('Invalid credentials'));
    }
  },

  logout: async (): Promise<void> => {
    // Mock implementation
    return Promise.resolve();
  },

  getCurrentUser: (): AdminUser | null => {
    // Mock implementation
    const userJson = localStorage.getItem('adminUser');
    return userJson ? JSON.parse(userJson) : null;
  }
};

export default adminAuthService;
