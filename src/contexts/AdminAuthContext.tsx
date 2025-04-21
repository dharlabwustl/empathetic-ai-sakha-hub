
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AdminUser, AdminAuthContextProps } from "@/types/admin";
import adminAuthService from "@/services/admin/adminAuthService";

const AdminAuthContext = createContext<AdminAuthContextProps>({
  adminUser: null,
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  logout: async () => {}
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await adminAuthService.checkAuth();
        
        if (isAuthenticated) {
          // In a real app, we would fetch the user profile here
          setAdminUser({
            id: "admin-1",
            name: "Admin User",
            email: "admin@sakha.ai",
            role: "admin"
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthentication();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await adminAuthService.login(email, password);
      
      if (response.success && response.data) {
        setAdminUser(response.data);
        setIsAuthenticated(true);
        
        // In a real app, we would store the token securely
        localStorage.setItem("adminAuthToken", "sample-token");
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${response.data.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: response.error || "Please check your credentials",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await adminAuthService.logout();
      setAdminUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("adminAuthToken");
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AdminAuthContext.Provider value={{ adminUser, isAuthenticated, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
