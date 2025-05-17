
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/contexts/auth/AdminAuthContext";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { toast } = useToast();
  const { isAdminAuthenticated, adminLoading } = useAdminAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAdminAuth = () => {
      // Direct localStorage check for better reliability
      const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      const hasAdminUser = !!localStorage.getItem('adminUser') || !!localStorage.getItem('admin_user');
      const hasAdminToken = !!localStorage.getItem('adminToken');
      
      // Consider authenticated if admin_logged_in is true AND we have either user data or token
      const authenticated = isAdminLoggedIn && (hasAdminUser || hasAdminToken);
      
      if (!authenticated) {
        console.log("Admin authentication failed, redirecting to login");
        toast({
          title: "Authentication required",
          description: "Please log in to access the admin area",
          variant: "destructive",
        });
      } else {
        console.log("Admin authentication successful");
      }
      
      setIsChecking(false);
    };
    
    // Check after adminLoading is complete
    if (!adminLoading) {
      checkAdminAuth();
    }
    
  }, [toast, adminLoading]);

  if (adminLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <p className="text-xl">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Only render children if authenticated
  return <>{children}</>;
};

export default AdminRouteGuard;
