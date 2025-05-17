
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { toast } = useToast();
  const { isAdminAuthenticated, adminLoading } = useAdminAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!adminLoading && !isAdminAuthenticated) {
      console.log("Admin authentication failed in AdminRouteGuard, redirecting to login");
      toast({
        title: "Authentication required",
        description: "Please log in to access the admin area",
        variant: "destructive",
      });
      navigate('/admin/login', { replace: true });
    }
  }, [isAdminAuthenticated, adminLoading, toast, navigate]);

  if (adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <p className="text-xl">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAdminAuthenticated ? <>{children}</> : null;
};

export default AdminRouteGuard;
