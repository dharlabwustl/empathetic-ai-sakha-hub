import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import LoadingScreen from '@/components/common/LoadingScreen';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true,
  adminOnly = false,
  redirectTo 
}) => {
  const { isAuthenticated, user, loading, checkAuth } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsChecking(false);
    };
    
    verifyAuth();
  }, [checkAuth]);
  
  // Show loading screen while checking authentication
  if (loading || isChecking) {
    return <LoadingScreen message="Checking authentication..." />;
  }
  
  // For routes that require authentication
  if (requireAuth) {
    if (!isAuthenticated) {
      // User is not authenticated, redirect to login
      return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
    
    // Check for admin-only routes
    if (adminOnly && user?.role !== 'admin') {
      // User is not an admin, redirect to student dashboard
      return <Navigate to="/dashboard/student" replace />;
    }

    // Check if it's a new user or just completed signup
    const isNewSignup = localStorage.getItem('new_user_signup') === 'true';
    const justCompletedOnboarding = localStorage.getItem('just_completed_onboarding') === 'true';
    
    // If user just signed up or completed onboarding, redirect to welcome-back flow
    if ((isNewSignup || justCompletedOnboarding) && !location.pathname.includes('/welcome-back')) {
      // Clear the onboarding flag since we're handling it now
      localStorage.removeItem('just_completed_onboarding');
      return <Navigate to="/welcome-back" replace />;
    }
    
    // User is authenticated and has appropriate role, render children
    return <>{children}</>;
  } 
  
  // For routes that are for unauthenticated users (like login/signup)
  else {
    if (isAuthenticated) {
      // If user just signed up, keep new_user_signup flag
      const isNewSignup = localStorage.getItem('new_user_signup') === 'true';
      
      // User is already authenticated, redirect to appropriate dashboard
      const targetPath = user?.role === 'admin' 
        ? '/admin'
        : (isNewSignup ? '/welcome-back' : (redirectTo || '/welcome-back'));
      
      return <Navigate to={targetPath} replace />;
    }
    
    // User is not authenticated, render login/signup page
    return <>{children}</>;
  }
};

export default AuthGuard;
