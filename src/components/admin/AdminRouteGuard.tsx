
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import adminAuthService from "@/services/auth/adminAuthService";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      // Use the service to check authentication
      const isAdminAuthenticated = adminAuthService.isAuthenticated();
      
      if (!isAdminAuthenticated) {
        console.log("Admin authentication failed, redirecting to login");
        toast({
          title: "Authentication required",
          description: "Please log in to access the admin area",
          variant: "destructive",
        });
        setIsAuthenticated(false);
      } else {
        console.log("Admin authentication successful");
        setIsAuthenticated(true);
      }
    };
    
    checkAdminAuth();
  }, [toast]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <p className="text-xl">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return <Navigate to="/admin/login" replace />;
  }

  // Only render children if authenticated
  return <>{children}</>;
};

export default AdminRouteGuard;
