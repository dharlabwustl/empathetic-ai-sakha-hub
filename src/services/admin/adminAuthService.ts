
import { AdminUser } from '@/types/admin';

const adminAuthService = {
  login: async (email: string, password: string): Promise<{ user: AdminUser | null; success: boolean }> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'admin@sakha.ai' && password === 'admin123') {
          const user: AdminUser = {
            id: 'admin-1',
            name: 'Admin User',
            email: 'admin@sakha.ai',
            role: 'admin',
            permissions: ['manage_users', 'manage_content', 'manage_settings']
          };
          resolve({ user, success: true });
        } else {
          resolve({ user: null, success: false });
        }
      }, 800);
    });
  },
  
  logout: async (): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('adminUser');
        resolve();
      }, 300);
    });
  },
  
  getCurrentUser: (): AdminUser | null => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }
    return null;
  }
};

export default adminAuthService;
