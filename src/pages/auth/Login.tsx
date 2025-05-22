
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
      
      // Make sure other login flags are cleared to avoid conflicts
      localStorage.removeItem('new_user_signup');
      localStorage.removeItem('google_signup');
      
      // Use direct relative path instead of domain-prefixed path
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 100);
      return;
    }
    
    if ((newUserSignup || isGoogleSignup) && isLoggedIn) {
      // Set flag for study plan creation dialog after tour
      localStorage.setItem('needs_study_plan_creation', 'true');
      
      if (isGoogleSignup) {
        localStorage.removeItem('google_signup');
        console.log("Google signup detected, redirecting to welcome flow");
      }
      
      if (newUserSignup) {
        localStorage.removeItem('new_user_signup');
        console.log("New user signup detected, redirecting to welcome flow");
      }
      
      // Redirect directly to welcome flow, skipping login
      console.log("New user or Google signup detected, redirecting to welcome flow");
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
    }, 1000);
  }, [navigate, isAuthenticated, location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-950/20">
      <VoiceGreeting 
        isFirstTimeUser={false}
        userName="Student"
        language="en"
      />
      <div className="text-center p-8 rounded-lg bg-white/90 dark:bg-blue-950/40 shadow-lg w-full max-w-md flex flex-col items-center border border-blue-200 dark:border-blue-800/30">
        {isProcessing ? (
          <>
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600 dark:text-blue-400" />
            <p className="text-xl font-medium text-blue-800 dark:text-blue-300">Preparing your dashboard...</p>
            <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-2">Please wait while we load your personalized experience</p>
          </>
        ) : (
          <>
            <p className="text-xl font-medium text-blue-800 dark:text-blue-300">Redirecting to login page...</p>
            <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-2">You'll be redirected in a moment</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
