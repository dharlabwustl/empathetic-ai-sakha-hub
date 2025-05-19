
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { toast } = useToast();
  const { isAdminAuthenticated, isLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);
  
  useEffect(() => {
    // Only attempt to redirect once to avoid loops
    if (!isLoading && !isAdminAuthenticated && !redirected) {
      console.log("Admin authentication failed in AdminRouteGuard, redirecting to login");
      toast({
        title: "Authentication required",
        description: "Please log in to access the admin area",
        variant: "destructive",
      });
      
      // Mark that we've already tried to redirect
      setRedirected(true);
      
      // Set flag to indicate we're attempting an admin login
      localStorage.setItem('admin_login_attempt', 'true');
      
      // Navigate to login page with a setTimeout to prevent potential race conditions
      setTimeout(() => {
        navigate('/admin/login', { replace: true });
      }, 100);
    }
  }, [isAdminAuthenticated, isLoading, toast, navigate, redirected]);

  // Show a simplified loading state to prevent endless spinning
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium">Verifying admin credentials...</p>
          <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAdminAuthenticated ? <>{children}</> : null;
};

export default AdminRouteGuard;
