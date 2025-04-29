
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextProps {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {}
});

export const useAdminAuth = () => useContext(AdminAuthContext);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = () => {
      const storedUser = localStorage.getItem("admin_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Fixed login for admin
    if (email === 'admin@sakha.ai' && password === 'admin123') {
      const adminUser = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin'
      };
      
      setUser(adminUser);
      localStorage.setItem("admin_user", JSON.stringify(adminUser));
      return;
    }
    
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
