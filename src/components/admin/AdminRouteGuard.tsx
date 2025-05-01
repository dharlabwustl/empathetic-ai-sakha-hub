
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingScreen from '../common/LoadingScreen';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for admin session in localStorage
    const checkAdminAuth = () => {
      const adminSession = localStorage.getItem('adminSession');
      
      if (adminSession) {
        try {
          const session = JSON.parse(adminSession);
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
  }, []);
  
  if (loading) {
    return <LoadingScreen message="Verifying administrator access..." />;
  }
  
  // Redirect to login if not admin
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Render children if admin access is confirmed
  return <>{children}</>;
};

export default AdminRouteGuard;
