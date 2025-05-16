
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useToast } from '@/hooks/use-toast';
import VoiceGreeting from '@/components/dashboard/student/VoiceGreeting';

const PostLoginWelcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(2);

  // Parse the returnTo parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/dashboard/student';

  // Check localStorage for skipLogin flag
  const skipLogin = localStorage.getItem('skipLogin') === 'true';

  // Redirect after a delay
  useEffect(() => {
    // If skipLogin flag is set, redirect immediately
    if (skipLogin) {
      // Clear the flag to avoid infinite redirects
      localStorage.removeItem('skipLogin');
      // Use window.location.href for more reliable navigation
      window.location.href = returnTo;
      return;
    }

    // Check if the user is authenticated and has completed welcome
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true' || 
                            localStorage.getItem('authenticate_user') === 'true' ||
                            localStorage.getItem('admin_logged_in') === 'true';
    
    const hasCompletedWelcome = localStorage.getItem('hasCompletedWelcome') === 'true';

    if (!isAuthenticated) {
      // If not authenticated, redirect to login
      navigate('/login', { replace: true });
      return;
    }

    // Start the countdown for redirection
    setRedirecting(true);
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          // Set the flag to indicate welcome completed
          localStorage.setItem('hasCompletedWelcome', 'true');
          
          // Use window.location.href for more reliable navigation
          window.location.href = returnTo;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show welcome toast
    toast({
      title: 'Welcome Back!',
      description: 'Redirecting to your dashboard...',
      duration: 3000,
    });

    return () => clearInterval(countdownTimer);
  }, [navigate, returnTo, toast, skipLogin]);

  // Get the user name from localStorage
  const getUserName = () => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData.name || 'Student';
      }
      
      const adminData = localStorage.getItem('admin_user');
      if (adminData) {
        const parsedData = JSON.parse(adminData);
        return parsedData.name || 'Admin';
      }
      
      return 'Student';
    } catch (error) {
      console.error("Error parsing user data:", error);
      return 'Student';
    }
  };

  const userName = getUserName();
  const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"
      >
        <PrepzrLogo width={150} height="auto" className="mx-auto mb-6" />
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
        >
          Welcome back, {userName}!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-600 dark:text-gray-300 mb-8"
        >
          We're preparing your dashboard...
        </motion.p>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-6"
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
          ></motion.div>
        </motion.div>
        
        {redirecting && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Redirecting in {countdown} seconds...
          </motion.p>
        )}
      </motion.div>

      {/* Voice greeting for first-time users */}
      <VoiceGreeting 
        isFirstTimeUser={isFirstTimeUser} 
        userName={userName}
        language="en"
      />
    </div>
  );
};

export default PostLoginWelcome;
