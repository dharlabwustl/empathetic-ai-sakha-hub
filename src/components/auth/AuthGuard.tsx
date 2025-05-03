
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import LoadingScreen from '@/components/common/LoadingScreen';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  adminOnly?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/login',
  adminOnly = false
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Check for stored token data in local storage
        const token = localStorage.getItem('sakha_auth_token');
        const userData = localStorage.getItem('userData');
        
        console.log("AuthGuard verification:", { 
          isAuthenticated, 
          hasToken: !!token, 
          hasUserData: !!userData,
          path: location.pathname
        });
      } catch (error) {
        console.error("Auth verification error:", error);
      } finally {
        // After checking auth state, stop showing the loading screen
        setIsVerifying(false);
      }
    };
    
    verifyAuth();
  }, [isAuthenticated, location.pathname]);

  // Show loading screen while checking auth status
  if (loading || isVerifying) {
    return <LoadingScreen message="Verifying authentication..." />;
  }

  // If auth is required and user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    // Save the current location so we can redirect back after login
    return <Navigate to={`${redirectTo}?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If admin-only access and user is not an admin, redirect
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard/student" replace />;
  }

  // Check if user is authenticated but hasn't completed onboarding
  if (isAuthenticated && requireAuth) {
    // Get user data to check onboarding status
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        
        // Check if this is a new signup - prioritize showing the welcome flow
        const isNewSignup = localStorage.getItem('new_user_signup') === 'true';
        
        if (isNewSignup && !location.pathname.includes('welcome-flow')) {
          console.log("Redirecting new signup to welcome flow");
          return <Navigate to="/welcome-flow?new=true" replace />;
        }
        
        // If not a new signup, check onboarding status
        const completedOnboarding = parsedData.completedOnboarding === true;
        const isNewUser = parsedData.isNewUser === true;
        const sawWelcomeTour = parsedData.sawWelcomeTour === true;
        
        // Only redirect if we're not already on onboarding related routes
        const isOnWelcomePage = location.pathname.includes('welcome') || 
                              location.pathname.includes('post-signup') || 
                              location.pathname.includes('welcome-flow');
        
        if (!isNewSignup && (isNewUser || !completedOnboarding || !sawWelcomeTour) && 
            !isOnWelcomePage && 
            !location.pathname.includes('welcome-back')) {
          console.log("Redirecting to welcome back flow");
          return <Navigate to="/welcome-back" replace />;
        }
      } catch (error) {
        console.error("Error parsing user data in AuthGuard:", error);
      }
    }
  }

  // If authentication state matches requirements, render children
  return <>{children}</>;
};

export default AuthGuard;
