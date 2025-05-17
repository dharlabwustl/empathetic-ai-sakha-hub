
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (newUserSignup && isLoggedIn) {
      // Clear the signup flag
      localStorage.removeItem('new_user_signup');
      
      // Use setTimeout to ensure the navigation happens reliably
      setTimeout(() => {
        window.location.replace('/welcome-flow');
      }, 100);
      return;
    }
    
    // Handle any leftover admin login attempts
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    if (isAdminLoggedIn) {
      setTimeout(() => {
        window.location.replace('/admin/dashboard');
      }, 100);
      return;
    }
    
    // If already authenticated, redirect to returnTo
    if (isAuthenticated || isLoggedIn) {
      setTimeout(() => {
        window.location.replace(returnTo);
      }, 100);
      return;
    }
    
    // If not authenticated, redirect to welcome-back after a short delay
    setTimeout(() => {
      window.location.replace(`/welcome-back?returnTo=${encodeURIComponent(returnTo)}`);
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
