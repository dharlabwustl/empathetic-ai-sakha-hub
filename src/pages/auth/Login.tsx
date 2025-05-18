
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  
  useEffect(() => {
    // Get the return URL from query params or use default
    const searchParams = new URLSearchParams(location.search);
    const returnTo = searchParams.get('returnTo') || '/dashboard/student';

    // Check if user coming from signup flow
    const newUserSignup = localStorage.getItem('new_user_signup') === 'true';
    const isGoogleSignup = localStorage.getItem('google_signup') === 'true';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Handle any leftover admin login attempts
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    if (isAdminLoggedIn) {
      console.log("Admin already logged in, redirecting to admin dashboard");
      // Use setTimeout to avoid navigation issues
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 100);
      return;
    }
    
    if ((newUserSignup || isGoogleSignup) && isLoggedIn) {
      // For Google signup users, directly navigate to welcome flow
      // This ensures the user doesn't see a login page in between
      if (isGoogleSignup) {
        console.log("Google signup detected, redirecting directly to welcome flow");
        localStorage.setItem('needs_study_plan_creation', 'true');
        setTimeout(() => {
          navigate('/welcome-flow', { replace: true });
        }, 100);
        return;
      }
      
      // For other new users
      console.log("New user signup detected, redirecting to welcome flow");
      setTimeout(() => {
        navigate('/welcome-flow', { replace: true });
      }, 100);
      return;
    }
    
    // If already authenticated as student, redirect to returnTo
    if (isAuthenticated || isLoggedIn) {
      console.log("User already authenticated, redirecting to:", returnTo);
      setTimeout(() => {
        navigate(returnTo, { replace: true });
      }, 100);
      return;
    }
    
    // If not authenticated, redirect to welcome-back after a short delay
    console.log("User not authenticated, redirecting to welcome-back");
    setTimeout(() => {
      navigate(`/welcome-back?returnTo=${encodeURIComponent(returnTo)}`, { replace: true });
    }, 300);
    
    // Set processing to false after a delay to show loading
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  }, [navigate, isAuthenticated, location.search]);

  return (
    <div>
      <VoiceGreeting 
        isFirstTimeUser={false}
        userName="Student"
        language="en"
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {isProcessing ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-xl">Preparing your dashboard...</p>
            </>
          ) : (
            <p className="text-xl">Redirecting to login page...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
