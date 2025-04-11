
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (adminData: AdminUser) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  adminUser: null,
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {}
});

export const useAdminAuth = () => useContext(AdminAuthContext);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is already logged in
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        if (parsedAdmin.isAdmin) {
          console.log("Found stored admin user:", parsedAdmin.name);
          setAdminUser(parsedAdmin);
        }
      } catch (error) {
        console.error('Error parsing admin user data:', error);
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (adminData: AdminUser) => {
    console.log("AdminAuthContext: Setting admin user:", adminData.name);
    
    // Create admin object with isAdmin flag
    const adminWithFlag = {
      ...adminData,
      isAdmin: true
    };
    
    // Update state
    setAdminUser(adminWithFlag);
    
    // Store in localStorage
    localStorage.setItem('adminUser', JSON.stringify(adminWithFlag));
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${adminData.name}!`
    });
  };

  const logout = () => {
    console.log("AdminAuthContext: Logging out admin");
    setAdminUser(null);
    localStorage.removeItem('adminUser');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
