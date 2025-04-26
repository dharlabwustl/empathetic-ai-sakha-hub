
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'super_admin';
}

interface AdminAuthContextProps {
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminLogin: (username: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextProps>({
  isAdminAuthenticated: false,
  adminUser: null,
  adminLogin: async () => {},
  adminLogout: () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Check if admin is logged in from localStorage or sessionStorage
    const storedAdminData = localStorage.getItem('adminAuth');
    if (storedAdminData) {
      try {
        const parsedData = JSON.parse(storedAdminData);
        if (parsedData?.isAuthenticated) {
          setIsAdminAuthenticated(true);
          setAdminUser(parsedData.user || {
            id: '1',
            username: 'admin',
            role: 'super_admin'
          });
        }
      } catch (error) {
        console.error('Error parsing admin auth data', error);
      }
    }
  }, []);

  const adminLogin = async (username: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real app, you would validate credentials with your API
    if (username === 'admin' && password === 'password') {
      const adminData = {
        id: '1',
        username: 'admin',
        role: 'super_admin' as const
      };
      
      setIsAdminAuthenticated(true);
      setAdminUser(adminData);
      
      // Store in localStorage
      localStorage.setItem('adminAuth', JSON.stringify({
        isAuthenticated: true,
        user: adminData
      }));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, adminUser, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
