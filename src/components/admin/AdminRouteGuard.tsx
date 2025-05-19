
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
      
      // Navigate to login page
      navigate('/admin/login', { replace: true });
    }
  }, [isAdminAuthenticated, isLoading, toast, navigate, redirected]);

  // Show loading state only for a brief period to avoid endless spinning
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAdminAuthenticated ? <>{children}</> : null;
};

export default AdminRouteGuard;
