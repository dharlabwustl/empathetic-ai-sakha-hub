
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AdminUser } from "@/types/admin";

interface AdminAuthContextProps {
  isAuthenticated: boolean;
  user: AdminUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const adminData = localStorage.getItem('adminUser');
      if (adminData) {
        try {
          const parsedData = JSON.parse(adminData);
          setUser(parsedData);
        } catch (error) {
          console.error("Failed to parse admin user data", error);
          localStorage.removeItem('adminUser');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real application, this would make an API call
      // For demo, we're checking hardcoded values
      if (username === "admin" && password === "admin123") {
        const adminUser: AdminUser = {
          id: "admin-1",
          username: "admin",
          email: "admin@sakha.ai",
          role: "admin",
          permissions: ["view_all", "edit_all", "manage_users"]
        };
        
        setUser(adminUser);
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        
        toast({
          title: "Login Successful",
          description: "Welcome to Sakha AI Admin Dashboard"
        });
        
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully"
    });
  };

  return (
    <AdminAuthContext.Provider value={{ 
      isAuthenticated: !!user, 
      user,
      loading,
      login,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
