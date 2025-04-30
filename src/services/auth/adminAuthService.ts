
import { AdminUser } from "@/types/user";

const getAdminToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

const setAdminToken = (token: string): void => {
  localStorage.setItem('adminToken', token);
};

const removeAdminToken = (): void => {
  localStorage.removeItem('adminToken');
};

const adminLogin = async (credentials: { email: string; password: string }) => {
  // Mock implementation for demo purposes
  if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
    const mockToken = 'mock-admin-token-' + Date.now();
    setAdminToken(mockToken);
    
    return {
      success: true,
      data: {
        id: '1',
        name: 'Admin User',
        email: credentials.email,
        role: 'admin',
      } as AdminUser,
      message: 'Login successful'
    };
  }
  
  return {
    success: false,
    data: null,
    message: 'Invalid credentials'
  };
};

const adminLogout = async (): Promise<void> => {
  removeAdminToken();
  return Promise.resolve();
};

const getAdminUser = async (): Promise<AdminUser | null> => {
  const token = getAdminToken();
  
  if (!token) {
    return null;
  }
  
  // In a real app, we would validate the token with the backend
  // For demo, just return a mock user
  return {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  };
};

const adminAuthService = {
  adminLogin,
  adminLogout,
  getAdminUser,
  getAdminToken,
  setAdminToken,
  removeAdminToken
};

export default adminAuthService;
