
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    
    if (!adminToken) {
      toast({
        title: "Access Denied",
        description: "Please login to access the admin dashboard",
        variant: "destructive"
      });
      navigate('/admin/login');
    }
  }, [navigate, toast]);
  
  // If there's an adminToken in localStorage, render children
  return localStorage.getItem('adminToken') ? <>{children}</> : null;
};

export default AdminRouteGuard;
