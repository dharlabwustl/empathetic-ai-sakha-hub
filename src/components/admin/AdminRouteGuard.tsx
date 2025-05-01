
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useToast } from "@/hooks/use-toast";

interface AdminRouteGuardProps {
  children?: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { isAdminAuthenticated, isAdminLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("AdminRouteGuard - Authentication status:", { 
      isAdminAuthenticated, 
      isAdminLoading 
    });
    
    if (!isAdminLoading && !isAdminAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to access the admin dashboard",
        variant: "destructive"
      });
      navigate("/admin/login", { replace: true });
    }
  }, [isAdminAuthenticated, isAdminLoading, navigate, toast]);
  
  if (isAdminLoading) {
    return <LoadingScreen message="Checking admin credentials..." />;
  }
  
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default AdminRouteGuard;
