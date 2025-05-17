
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAdminAuth = () => {
      // Multiple checks for better reliability
      const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      const hasAdminUser = !!localStorage.getItem('adminUser') || !!localStorage.getItem('admin_user');
      const hasAdminToken = !!localStorage.getItem('adminToken');
      
      // Consider authenticated if admin_logged_in is true AND we have either user data or token
      const authenticated = isAdminLoggedIn && (hasAdminUser || hasAdminToken);
      
      if (!authenticated) {
        toast({
          title: "Authentication required",
          description: "Please log in to access the admin area",
          variant: "destructive",
        });
      }
      
      setIsAuthenticated(authenticated);
      setIsChecking(false);
    };
    
    checkAdminAuth();
    
    // Listen for auth state changes
    const handleAuthChange = () => checkAdminAuth();
    window.addEventListener('auth-state-changed', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, [toast]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <p className="text-xl">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Use Navigate for React Router navigation
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
