
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingScreen from '../common/LoadingScreen';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for admin session in localStorage
    const checkAdminAuth = () => {
      setLoading(true);
      
      const adminSession = localStorage.getItem('adminSession');
      console.log("Admin session found:", adminSession);
      
      if (adminSession) {
        try {
          const session = JSON.parse(adminSession);
          console.log("Parsed admin session:", session);
          setIsAdmin(!!session.isAdmin);
        } catch (error) {
          console.error('Error parsing admin session:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    };
    
    checkAdminAuth();
  }, [navigate]);
  
  if (loading) {
    return <LoadingScreen message="Verifying administrator access..." />;
  }
  
  // Redirect to login if not admin
  if (!isAdmin) {
    console.log("Not an admin, redirecting to admin login");
    return <Navigate to="/admin/login" replace />;
  }
  
  // Render children if admin access is confirmed
  console.log("Admin access confirmed, rendering admin content");
  return <>{children}</>;
};

export default AdminRouteGuard;
