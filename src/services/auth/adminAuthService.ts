
import { AdminUser } from '@/types/user/base';

interface LoginResponse {
  success: boolean;
  data?: AdminUser;
  message?: string;
}

const adminAuthService = {
  adminLogin: async ({ email, password }: { email: string, password: string }): Promise<LoginResponse> => {
    try {
      // For demonstration purposes, we're mocking a successful login
      if (email && password) {
        const adminUser: AdminUser = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'admin'
        };
        
        localStorage.setItem('adminToken', 'mock-admin-token');
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        
        return {
          success: true,
          data: adminUser
        };
      } else {
        return {
          success: false,
          message: 'Email and password are required'
        };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred'
      };
    }
  },
  
  adminLogout: async (): Promise<boolean> => {
    try {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      return true;
    } catch (error) {
      console.error('Admin logout error:', error);
      return false;
    }
  },
  
  getAdminUser: async (): Promise<AdminUser | null> => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const adminUserData = localStorage.getItem('adminUser');
      
      if (adminToken && adminUserData) {
        return JSON.parse(adminUserData) as AdminUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Get admin user error:', error);
      return null;
    }
  }
};

export default adminAuthService;
